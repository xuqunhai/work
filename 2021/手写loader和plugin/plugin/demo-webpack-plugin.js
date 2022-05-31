class DemoWebpackPlugin {
  constructor() {
    console.log('plugin init');
  }
  // webpack打包时候，会调用plugin的aplly方法来执行plugin的逻辑，
  // 这个方法接受一个compiler作为参数，这个compiler是webpack实例
  // plugin的核心在于，
  // apply方法执行时，可以操作webpack本次打包的各个时间节点（hooks，也就是生命周期勾子），在不同的时间节点做一些操作
  apply(compiler) {
    // 一个新的编译(compilation)创建之后（同步）
    // compilation代表每一次执行打包，独立的编译
    compiler.hooks.compile.tap('DemoWebpackPlugin', (compilation) => {
      console.log(compilation);
    });
    // 生成资源到 output 目录之前（异步）
    // plugin的作用就是，打包时候自动生成一个md文档，文档内容是很简单的一句话
    compiler.hooks.emit.tapPromise('DemoWebpackPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(() => {
        console.log(compilation.assets);
        compilation.assets['index.md'] = {
          // 文件内容
          source: function () {
            return 'this is a demo for plugin';
          },
          // 文件尺寸
          size: function () {
            return 25;
          }
        };
      });
    });
  }
}

module.exports = DemoWebpackPlugin;
