/*
 * NodeEnvironmentPlugin.js
 */
const fs = require('fs'); // webpack为提升文件读写性能， 源码里是对 node 的 fs 模块进行了二次封装的。我们这勉强够用，就不封装了。 /捂脸

class NodeEnvironmentPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(complier) {
    complier.inputFileSystem = fs;
    complier.outputFileSystem = fs;
  }
}

module.exports = NodeEnvironmentPlugin;
