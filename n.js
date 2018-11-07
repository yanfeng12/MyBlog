const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const path = require('path');
var fs = require('fs')

//设置静态文件路径
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'))); 
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

let indexRouter = express.Router();

//指定配置项，这里指定文件保存于当前目录下的upload子目录
app.use(multer({dest:'./public/upload'}).any());
app.use('/res',indexRouter);

//注册
indexRouter.use('/resModule',(req,res)=>{
	// console.log(req.files[0],req.body);
	var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newName,(err)=>{
		if (err) {
			console.log(err);
		} else{
			
		}
	})
});



app.listen(4000, function(){
    console.log('running  port 4000');
});
