浏览器通过网络模块创建下载进程，发起HTTP请求

# HTTP
应答请求模式的超文本传输协议

# HTTP报文
- 头部
  - 请求类型 请求URI 协议版本 ｜ 状态码 状态描述 协议版本
  - 请求头部域（Accept、Cookie、Cache-Control、Host）
- 空行（回车和换行符组成，用于区分头部和正文）
- 正文

# HTTP1.1
- 长连接
  - 请求头 keep-alive 头域控制
  - HTTP1.0要建立长连接，需发生请求头 Connection: keep-alive，服务器如果同意，则回复一样头部表示可复用，减少重新握手建立连接的开销
- 协议切换
  - 请求头包含 Connection: Upgrade 和 Upgrade: websocket 告诉服务器需要切换协议，服务器同意就返回一样头部，同时返回101状态码表示请求还需完成协议切换
- 缓存控制
  - HTTP1.0只能通过Expires头控制浏览器缓存，但是是绝对时间
  - HTTP1.1增加Cache-Control头，支持max-age的相对过期时间
- 部分内容传输优化
  - 允许请求一个文件的起始位置和一个偏移长度进行文件内容的部分传输
- 请求正文允许传输二进制数据，如表单使用formData提交上传文件就是二进制数据

# 浏览器发送HTTP请求时缓存读取判断流程
1. 浏览器先查询Cache-Control判断内容是否过期，没过期则直接读取缓存，否则进入下一步
2. 浏览器判断上次文件返回头部是否包含Etag，有则带上If-None-Match头，服务器判断Etag未修改则返回304，修改则返回200；没有Etag则进入下一步
3. 浏览器判断上次文件返回头部是否包含Last-Modified，有则带上If-Modified-Since，服务器判断Last-Modified失效则返回200，有效则返回304
4. 如果Etag和Last-Modified都不存在，则直接请求服务器

# HTTP头部
## 公共头部
- Connection
  - close/keep-alive


## 请求头部
- Accept
  - 告诉服务器能接收的类型
  - */*表示任意类型，text/html
- Accept-Charset
  - 字符集，uft-8
- Accept-Encoding
  - 编码方法
  - gzip,deflate 支持压缩，且压缩方法是
- Accept-Language
  - 语言
  - zh-CN 中文
- Authorization
  - 携带身份验证信息认证
- Host
  - 客户端域名
- If-None-Match
  - 上次响应返回的文件指纹
- If-Modified-Since
  - 上次响应返回的时间
- Range
  - 告知服务器想要对象的哪段
- Referer
  - 发送请求的网址
- User-Agent
  - 浏览器种类和版本

## 响应头部
- Accept-Ranges
  - 服务器表明是否接收部分内容请求
  - bytes表示接受，none表示不接受
- Age
  - 服务器表明响应实体从产生到现在经过多长时间
- Allow
  - 服务器支持哪些方法（GET、POST），不支持则返回405
- Cache-Control
  - 服务器缓存控制指令
  - max-age过期时间、no-cache不直接取缓存要询问服务器、no-store不允许缓存
- Content-Encoding
  - 服务器使用的压缩方法
- Content-Language
  - 响应的语言
- Content-Length
  - 响应长度
- Content-Range
  - 响应包含的部分对象是哪个部分
- Content-Type
  - 响应的类型
- Etag
  - 响应文件指纹
- Expires
  - 响应的过期时间
- Last-Modified
  - 响应文件的最后修改时间
- Location
  - 告知浏览器资源新地址，让浏览器重定向读取
- Server
  - 告知服务器的软件和版本
- Transfer-Encoding
  - 响应的编码，如是否分块（chunked）

# HTTP2对比HTTP优点
- 二进制数据传输数据，基本单位是帧（固定格式和长度的数据包）
  - 帧的固定部分：类型、长度、标记、流标识、有效载荷
- 对头部采用HPACK压缩，避免携带大量冗余头信息
- TCP多路复用，多个请求共用一个TCP连接，不像1.1的Pipline响应串行传输
- 支持传输流的优先级控制，保证优先级高的文件流线传输
- 支持服务器推送，如让HTML文档下载前让里面的JS和CSS先下载
但对浏览器版本有要求，如edge13，chrome45