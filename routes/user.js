//用户路由器
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
let router=express.Router();
//1注册用户的路由
router.post('/reg',(req,res)=>{
   //1.1获取数据
   let obj=req.body;
   //console.log(obj);
   //1.2验证数据是否存在
   let i=400;
   for(let key in obj){
     i++;
     if(!obj[key]){
       res.send({code:i,msg:key+'required'});
       return;
     }
   }
   //1.3执行SQL语句
   pool.query('INSERT INTO dior_user SET ?',[obj],(err,result)=>{
       if(err) throw err;
       console.log(result);
       //如果数据插入成功 响应对象
     if(result.affectedRows>0){
         res.send({code:200,msg:'register suc'});
       }
      });
 });
 //2.用户登录  /post  /login
 router.post('/login',(req,res)=>{
  //2.1获取数据
  let obj=req.body;
  //console.log(obj);
  //2.2验证是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
    return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
    return;
  }
  //2.3执行SQL语句
  pool.query('SELECT * FROM dior_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err) throw err;
    //console.log(result);
    //返回的结果是数组，如果查询到了对应的用户，数组中会出现这条数据；否则返回空数组，查询不到数据，登陆失败
  if(result.length>0){
    res.send({code:200,msg:'login suc'});
  }else{
    res.send({code:301,msg:'login err'});
  }
  });
});
//3.用户检索  /get   /detail
router.get('/detail',(req,res)=>{
  //3.1获取数据
  let obj =req.query;
 // console.log(obj);
 //3.2判断是否为空
 if(!obj.uid){
   res.send({code:401,msg:'uid is null'});
   return;
 }
 //3.3 执行SQL语句
 pool.query('SELECT uid,uname,birthday,upwd,email,phone,gender,user_name FROM dior_user WHERE uid=?',[obj.uid],(err,result)=>{
   if(err) throw err;
   //console.log(result);
   if(result.length>0){
     res.send({
       code:200,
       msg:'ok',
       data:result[0]
     });
   }else{
     res.send({code:301,msg:'can not found'});
   }
 });
});
//4.删除用户
router.get('/delete',(req,res)=>{
  //4.1获取数据
  let obj=req.query;
  //console.log(obj);
  //4.2验证是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid is null'});
  return;
  }
  //4.3执行SQL语句
  pool.query('DELETE FROM dior_user WHERE uid=?',[obj.uid],(err,result)=>{
     if(err)throw err;
  //console.log(result);
  if(result.affectedRows>0){
   res.send({code:200,msg:'delete suc'});
 }else{
   res.send({code:301,msg:'delete err'});
 }
  });
});
//5.修改用户信息  /get  /update
router.get('/update',(req,res)=>{
  //5.1获取数据
  let obj=req.query;
  //console.log(obj);
  //5.2判断是否为空
  let i=400;
  for(let key in obj){
    i++;
    if(!obj[key]){
      res.send({code:i,msg:key+'required'});
      return;
    }
  }
  //5.3执行SQL语句
  pool.query('UPDATE dior_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    if(result.affectedRows>0){
      res.send({code:200,msg:'update suc'});
    }else{
      res.send({code:301,msg:'update err'});
    }
  });
}); 
//6.用户列表  /get /list
router.get('/list',(req,res)=>{
  //6.1 获取数据
  let obj=req.query;
  //console.log(obj);
  //6.2验证是否为空 ，并给默认值
  if(!obj.pno) obj.pno=1;
  if(!obj.count) obj.count=2;
  //6.3将count转为整型
  obj.pno=parseInt(obj.pno);
  obj.count=parseInt(obj.count);
  //6.4计算start
  let start=(obj.pno-1)*obj.count;
  //6.5执行SQL语句
  pool.query('SELECT * FROM dior_user LIMIT ?,?',[start,obj.count],(err,result)=>{
    if(err)throw err;
    res.send({code:200,data:result});
    //console.log(result);
  });
});
//7.检测邮箱  /get  /checkemail
router.get('/checkemail',(req,res)=>{
  //7.1获取数据
  let obj=req.query;
  //console.log(obj);
  //7.2判断是否为空
  if(!obj.email){
    res.send({code:401,msg:'email is null'});
  }
  //7.3执行SQL语句
  pool.query('SELECT * FROM dior_user WHERE email=?',[obj.email],(err,result)=>{
    if(err) throw err;
  //console.log(result);
  if(result.length>0){
    res.send({code:201,msg:'email is exist'})
  }else{
    res.send({code:200,msg:'email no-exists'});
  }
  });
});
//8.检测手机  /get /checkphone
router.get('/checkphone',(req,res)=>{
   let obj =req.query;
if(!obj.phone){
   res.send({msg:'phone is null'});
 }
 pool.query('SELECT * FROM dior_user WHERE phone= ?',[obj.phone],(err,result)=>{
  if(err)throw err;
  //console.log(result);
  if(result.length>0){
    res.send({code:201,msg:'phone is exist'})
  }else{
    res.send({code:200,msg:'phone no-exists'});
  }
});
});
//9检测用户名
router.get('/checkuname',(req,res)=>{
 let obj =req.query;
if(!obj.uname){
   res.send({code:401,msg:'uname is null'});
 }
 pool.query('SELECT * FROM dior_user WHERE uname= ?',[obj.uname],(err,result)=>{
  if(err)throw err;
  if(result.length>0){
    res.send({code:201,msg:'uname is exist'})
  }else{
    res.send({code:200,msg:'uname no-exists'});
  }
});
});
//10.退出登录  /get  /user/logout
router.get('/logout',(req,res)=>{
  let obj=req.query;
 // console.log(obj);
 if(!obj.uname){
  res.send({code:401,msg:'uname required'});
  return;
}
if(!obj.upwd){
  res.send({code:402,msg:'upwd required'});
  return;
}
pool.query('SELECT * FROM dior_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
  if(err) throw err;
  if(result.length>0){
  res.send({code:200,msg:'logout suc'});
}else{
  res.send({code:301,msg:'logout err'});
}
});
});
//11.获取当前用户信息  /get  /sessiondata
router.get('/sessiondata',(req,res)=>{
  let obj=req.query;
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
  }
  pool.query('SELECT * FROM dior_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({code:200,data:result[0]});
    }else{
      res.send({code:201,msg:"err"});
    }
   
   
  });
})
//导出路由器对象
module.exports=router;
