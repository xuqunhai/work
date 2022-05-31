/*
 * Stats 其实看代码就能明白，Stats只是将compilation身上挂载的 入口模块、模块内容、chunks、文件目录等拿了出来。 这里可以回头看看run 方法
 */
class Stats {
  constructor(compilation) {
    this.entries = compilation.entries;
    this.modules = compilation.modules;
    this.chunks = compilation.chunks;
    this.files = compilation.files;
  }

  toJson() {
    return this;
  }
}

module.exports = Stats;
