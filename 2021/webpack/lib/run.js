let webpack = require('./youWebpack');
let options = require('./webpack.config');

let compiler = webpack(options); // webpack 初始化 webpack.config.js 的 module.exports

// 执行run方法
compiler.run((err, stats) => {
  console.log(err);
  console.log(stats);
});
