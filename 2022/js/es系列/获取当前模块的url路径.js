/* <script src="./main.js" type="module"></script>; */
// main.js
console.log(import.meta); // {url: "http://localhost:8080/main.js"} PS：使用了 http-server 启动
// 因为 import.meta 必须要在模块内部使用，如果不加 type="module"，控制台会报错：Cannot use 'import.meta' outside a module。
// 安装 @open-wc/webpack-import-meta-loader，修改 webpack 的配置，可以正常运行。
