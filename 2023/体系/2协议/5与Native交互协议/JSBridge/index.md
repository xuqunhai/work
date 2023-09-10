Native App 更优性能、更好用户体验、平台厂商支持
HTML5快速开发网页
Web页面内嵌Native应用
Hybrid App

混合App
可用系统资源小，如手机2G
  可实现离线应用
不需考虑低版本IE兼容问题
  不同设备机型兼容
前端页面调用客户端能力：摄像头、定位、本地文件访问等

H5调Native
  通过URI请求
    原理：
    Native应用在移动端系统注册一个Scheme协议的URI
    WebView通过iframe请求调用
    Native捕获请求并提交系统
    系统响应Scheme协议
    Native自调用Native页面
  通过 addJavascriptInterface 注入方法到页面中调用
    安卓该方法有安全漏洞，即通过js能访问当前设备SD卡任何内容
      4.2以上版本可通过添加@JavascriptInterface解决
      4.2以下版本可通过setWebChromeClient实现功能
        js调用alert会自动触发native的onJsAlert回调，所以可以重写onJsAlert获取js传递的数据
        native调js可让java通过调用loadUrl触发js方法，将内容返回到webview中

Native调H5
  JS在页面全局声明方法
  Native通过loadUrl调用H5方法，如webView.loadUrl("javascript: alert('hi')")

协议
jsbridge://className:callback/methodName?paramsString
示例
webview使用prompt传入协议串：jsbridge://Util:success/toString?{"msg":"hi"}
native解析并调用对应类和方法，如执行Util.toString()
native执行回调 loadUrl('javascript: success()')