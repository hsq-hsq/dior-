const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
let router=express.Router();

//挂载路由  post comm/add
router.post('/add',(req,res)=>{
  //获取数据
  let obj=req.body;
  //console.log(obj);
  //验证数据是否为空
  //遍历对象，访问每个属性，如果属性值为空，提示属性名那一项必须的
  let i=400;
  for(let key in obj){
	i++;
    //console.log(key,obj[key]);
	if(!obj[key]){
	  res.send({code:i,msg:key+' required'});
	  return;
	}
  }
  //执行SQL语句
  pool.query('INSERT INTO dior_commodity SET ?',[obj],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	//如果数据插入成功，响应对象
	if(result.affectedRows>0){
	  res.send({code:200,msg:'register suc'});
	}else{
	  res.send({code:301,msg:'register err'});
	}
  });
});

//删除商品
//挂载路由  get commodity/add
router.get('/delete',(req,res)=>{
  let obj = req.query;
  //判断如果填写为空
  if(!obj.lid){
    res.send({
	  code:401,msg:'lid required'
	});
	return;
  }

//建立连接池
pool.query('DELETE * FROM dior_commodity WHERE lid=?',[obj.lid],(err,result)=>{
  if(err) throw err;
  if(result.affectedRows>0){
    res.send({code:200,msg:delete suc});
  }else{
    res.send({code:301,msg:delete err});
  }
 });
});
//商品列表
router.get("/list",(req,res)=>{
  let obj = req.query;
  console.log(obj) 
  //如果页码为空，默认是1；如果大小为空，默认为2
    if (!obj.pno)obj.pno=1;
    if (!obj.pageSize)obj.pageSize=2;
	 //将大小转为整型
    let pageSize = parseInt(obj.pageSize);                       
	let pno = parseInt(obj.pno);  
    //计算开始查询的值
    let start = (pno - 1) * pageSize;
	//执行SQL语句
	let sql = `SELECT count(*) as Count FROM dior_commodity;SELECT lid,title,price,sold_count,is_onsale,md as pic FROM dior_commodity dior_commodity INNER JOIN (select makeup_id,md from dior_makeup_pic group by makeup_id) dior_makeup_pic ON dior_commodity.lid = dior_makeup_pic.makeup_id LIMIT ?,?;`;
    pool.query(sql, [start, pageSize], (err, result) => {
        if(err) throw err;
        console.log(result);
		let recordCount = result[0][0]["Count"]; //获取记录总数，第1个SQL语句的执行结果
		let pageCount = Math.floor(recordCount / pageSize) + 1; //计算总页数    
		//如果数据获取成功（记录数量是0也是一种成功），响应对象
		let retJson={
			code: 200,
			msg: "list ok",
			recordCount:recordCount,
			pageSize:pageSize,
			pageCount:pageCount,
			pno:pno, 
			pic:result[2],
			data:result[1],//第2个SQL语句的执行结果
		};
		res.send(retJson);	
    });
});

//2.商品详情 GET /detail
router.get("/detail", (req, res) => {  
  //1.1获取数据
  let product = req.query;
  //1.2验证各项数据是否为空
  if (!product.lid) {
    res.send({ code: 401, msg: "lid required" });
    return;
  }

  //1.3执行4个SQL语句，把查询的数据响应给浏览器
 let sql = `SELECT * FROM dior_commodity WHERE lid=?;
               SELECT pid,makeup_id,sm,md,lg FROM dior_makeup_pic WHERE makeup_id=?;//图片
               SELECT fid,fname FROM dior_commodity_type INNER JOIN dior_commodity ON dior_commodity_type.fid = dior_commodity.family_id WHERE dior_commodity.lid = ?;//详情
               SELECT lid,spec FROM dior_commodity WHERE family_id IN (SELECT family_id FROM dior_commodity WHERE lid = ?); `;
  pool.query(
    sql,
    [product.lid, product.lid, product.lid, product.lid],
    (err, results) => {
      //出错返回
      if (err) {
        res.send({ code: 301, msg: `list failed, errMessage: ${err}` }); //throw err;
        return;
      }
      //如果数据查询成功，按要求组装成JSON对象
      let objJson = results[0][0]; //第1个SQL语句的返回结果的第1条记录（也只有1条记录）
      if (objJson) {
        objJson["picList"] = results[1]; //第2个SQL语句的返回结果
        let family = results[2][0]; //第3个SQL语句的返回结果的第一条记录（也只有1条记录）
        objJson["family"] = family;
        if (objJson["family"]) objJson["family"]["laptopList"] = results[3]; //第4个SQL语句的返回结果
      }
      res.send({ code: 200, msg: "ok", details: objJson });
    }
  );
});


//导出路由器对象
module.exports=router;