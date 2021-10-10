// 加载 http 模块
var http = require('http');

// 1. 创建 Server
var server = http.createServer();

// 2. 监听 request 请求事件，设置请求处理函数
server.on('request', function (req, res) {
  console.log('收到请求了，请求路径是：' + req.url);
  console.log(
    '请求我的客户端的地址是：',
    req.socket.remoteAddress,
    req.socket.remotePort
  );
  // 获取 ip 地址 remoteAddress
  // request.socket.remotePort 获取源端口
  var url = req.url;
  // writeHead此方法只能在消息上调用一次，并且必须在调用 response.end() 之前调用它。
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  if (url === '/') {
    res.end('<h1>Index page</h1>');
  } else if (url === '/login') {
    res.end('<h1>Login page</h1>');
  } else {
    res.end('404 Not Found.');
  }
  // response.end() 此方法向服务器发出信号，表示已发送所有响应头和主体，该服务器应该视为此消息完成。必须在每个响应上调用方法 response.end()。
});

// 3. 绑定端口号，启动服务
server.listen(8080, function () {
  console.log('服务器启动成功，可以访问了。。。');
});