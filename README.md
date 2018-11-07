# MyBlog
# 一.博客系统
1.展示页
		-展示所有的文章、文章作者、发布时间
		-注册和登陆
		-搜索
		-登陆后发布文章
		-点击文章后进入详情页
		-点击作者进入作者空间
2.文章详情页
		-刚才点击的文章
		-文章内容、标题、发布时间、作者
3.作者详情页
		-作者的空间
		-作者的信息

# 二.数据库
1.usertb 用户表
name img
2.newstb 文章表
time username title 
3.commentstb 评论
time username title

# 三.Bootstrap
1.[Bootstrap中文网](http://www.bootcss.com/)
2.[JavaScript 插件](https://v3.bootcss.com/javascript/)

# 四.NPM相关
npm install -save moduleName 命令
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入dependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。

npm install -save-dev moduleName 命令
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入devDependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。

总结
devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev 的形式安装。
像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save 的形式安装。

# 五.准备工作
1.安装webpack
```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```
2.安装express
```
npm install express --save
```
3.安装文件上传中间件multer
```
npm install multer –save
```
4.安装mongoose
```
npm install mongoose --save
```
# 六.express相关
1.使用 Express 框架来输出 "Hello World"
```
//express_demo.js 文件
var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```
2.路由
```
var express = require('express');
var app = express();
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```
3.静态文件
可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
```
app.use(express.static('public'));
```
4.Router 模块
使用 express.Router 来组织控制器与中间件
app.js
```
app.use(require('./controllers/book'));
```
controllers/book.js
```
var router = require('express').Rouer(); // 新建一个 router

var A = require('../middlewares/A');
var B = require('../middlewares/B');
var C = require('../middlewares/C');

// 在 router 上装备控制器与中间件
router.get('/books', A, B, C, function (req, res) {
    var retA = req.A; // 中间件 A 的输出结果
    var retB = req.B; // 中间件 B 的输出结果
    var retC = req.C; // 中间件 C 的输出结果
    // ... 其余程序逻辑
});

// ...

// 返回 router 供 app 使用
module.exports = router;
```
5.Express 4.x中间件multer
(1) 使用form提交文件
html文件
```
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h2>文件上传</h2>  
    <form action="http://127.0.0.1:1338/indexFormFile.html" method="post"  enctype="multipart/form-data">  
        <input type="file" name="myfile" /><br/>  
        <input type="submit" value="submit"/><br/>  
    </form>  
</body>

</html>
```
服务端代码
```
var express = require('express');
var app = express();
var multer = require('multer');//获得中间件
var upload = multer({dest:'uploads/'});//指定配置项，这里指定文件保存于当前目录下的upload子目录
app.use(upload.single('myfile'));//运用中间件，并且指明文件名,此名需要同html input name的文件名一致，否则会报错
app.get('/indexFormFile.html', function (req, res) {
    res.sendFile(__dirname + '/indexFormFile.html');
});//把html文件显示在客户端指定路由路径下
app.post('/indexFormFile.html', function (req, res) {
    res.send(req.file);//服务端响应把客户端获得的文件信息显示在客户端
});
app.listen(3000);//监听localhost:3000端口

```
(2)多文件上传
客户端html
```
    <form action="http://127.0.0.1:1338/indexFormFile.html" method="post"  enctype="multipart/form-data">  
        <input type="file" name="myfile" /><br/>  
        <input type="file" name="myfile" /><br/> 
        <input type="file" name="myfile" /><br/> 
        <input type="submit" value="submit"/><br/>  
    </form> 
```
服务端
```
app.use(upload.array('myfile', 3));//single改成了array，表示接收一个文件数组，后面的数字3表示能接收的最大文件数目
```
```
res.send(req.files);//req.file改成req.files表示接收多个文件
```
(3)把文件存在硬盘的任意地方
```
var express = require('express');
var app = express();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },//指定硬盘空间的路径，这里可以是任意一个绝对路径，这里为了方便所以写了个相对路径
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.txt');//指定文件名和扩展名
    }
});//设置用硬盘的存储方法
var upload = multer({ storage: storage });//表示用硬盘的存储方法

app.use(upload.array('myfile', 3));

app.get('/indexFormFile.html', function (req, res) {
    res.sendFile(__dirname + '/indexFormFile.html');
});

app.post('/indexFormFile.html', function (req, res) {
    res.send(req.files);
    console.log(req.files);
});

app.listen(3000);
```
6.报错：because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
[利用 Express 托管静态文件](http://www.expressjs.com.cn/starter/static-files.html)
通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了
```
app.use(express.static(path.join(__dirname, 'public'))); 
```
现在，你就可以访问 public 目录中的所有文件了：
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

index.html中，不需要添加public
```
<link rel="stylesheet" type="text/css" href="css/index.css"/>
```

