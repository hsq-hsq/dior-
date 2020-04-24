const mysql=require('mysql');
//创建连接池对象
let pool=mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'dior',
	connectionLimits:15,//连接池可创建的最大连接数
	multipleStatements:true  //允许query执行多条SQL语句
});
//导出连接池对象
module.exports=pool;