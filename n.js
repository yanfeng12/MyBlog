const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const path = require('path');
var fs = require('fs')

//引入数据库
var mysql = require('mysql');

//设置静态文件路径
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
})

let indexRouter = express.Router();

//指定配置项，这里指定文件保存于当前目录下的upload子目录
app.use(multer({
	dest: './public/upload'
}).any());
app.use('/res', indexRouter);

//注册
indexRouter.use('/resModule',(req,res)=>{
	//console.log(req.files[0],req.body);
	var newName =req.files[0].path + path.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newName,(err)=>{
		if(err){
			console.log(err);
		}
		else{
			var Pool = mysql.createPool({
				'host': 'localhost',
				'user': 'root',
				'password': 'X1s4j7f2y5zs',
				'database': 'blog'
			});
			Pool.getConnection((err,c)=>{
				if(err){
					res.send({ok:0,msg:'数据连接失败'});
					console.log(err);
					c.();
				}
				else{
					var nowTime = new Date().toLocaleDateString() + ' ' +new Date().toLocaleTimeString();
					var {username,password,img,sex,qq} = req.body;
					c.query('SELECT name FROM `user` WHERE name="'+username+'";',(err,data)=>{
						if(err){
							res.send({ok:0,msg:'数据连接失败'});
							console.log(err);
							c.release();
						}
						else{
							if(data.length>0){
								res.send({ok:0,msg:'用户名已存在'});
								c.release();
							}
							else{

								c.query('INSERT INTO `user` (`name`,`password`,`img`,`sex`,`qq`,`time`) VALUES("'+username+'","'+password+'","'+newName+'","'+sex+'","'+qq+'","'+nowTime+'");',(err,data)=>{
									if(err){
										console.log(err);
										res.send({ok:0,msg:'数据写入失败'});
									}
									else{
										res.send({ok:1,msg:'注册成功'});
									}
									c.release();
								});	
							}
						}
					})
				}
				
			});
		}
	})

});

//登录
indexRouter.use('/login',(req,res)=>{

	//console.log(req.query)

	
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'X1s4j7f2y5zs',
		'database': 'blog'
	});
	Pool.getConnection((err,c)=>{
		if(err){
			res.send({ok:0,msg:'数据连接失败'});
			c.release();
		}
		else{
			c.query('SELECT name,password,img,qq FROM `user` WHERE name="'+req.query.username+'" AND password="'+req.query.password+'";',(err,data)=>{
				if(err){
					res.send({ok:0,msg:'数据连接失败'});
					console.log(err);
					c.release();
				}
				else{
					//res.send({ok:0,msg:'登录成功'});
					if(data.length>0){
						//
						res.cookie('user',req.query.user+'-'+data[0].userImg+'-'+data[0].userName,{path:'/show'})

						//c.query('SELECT userImg')
						res.send({ok:1,msg:'登录成功',data:data});
					}
					else{
						res.send({ok:0,msg:'账号或密码错误'});
						
					};
					c.release();
				}
			})
		}
	})

});


app.listen(4000, function() {
	console.log('running  port 4000');
});
