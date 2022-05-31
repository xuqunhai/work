/*
 * NormalModuleFactory
 */

const NormalModule = require('./NormalModule');

class NormalModuleFactory {
  create(data) {
    return new NormalModule(data);
  }
  // 源码里头还实现了其它方法，所以这里不要嫌弃为什么又要单独require一个 NormalModule
}

module.exports = NormalModuleFactory;
