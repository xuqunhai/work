var express = require('express');
var app = express();
// 加载 body-parser
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  // 传送指定路径的文件，会自动根据文件 extension 设定 Content-Type
  // 也可以用前面的 art-template 模板引擎
  res.sendFile(__dirname + '/' + 'postTest.html');
});

app.post('/post_test', urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  var response = {
    studentNumber: req.body.stuNum,
    studentName: req.body.stuNam,
  };
  console.log(response);
  // JSON.stringify() 方法是将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
  res.end(JSON.stringify(response));
});

app.listen(8080, function () {
  console.log('服务器启动了');
});