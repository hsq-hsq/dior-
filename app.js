const express=require('express');
const bodyParser=require('body-parser');
//引入路由器
const userRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js');
const cartRouter=require('./routes/cart.js');
let app=express();
app.listen(8888);
//托管静态资源
app.use( express.static('public') );
//使用body-parser中间件
app.use( bodyParser.urlencoded({
	extended:false
}) );
//把路由器挂载到服务器，给URL添加前缀
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
