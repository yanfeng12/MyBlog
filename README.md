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