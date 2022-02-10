// SingleEntryPlugin.js

class SingleEntryPlugin {
  constructor(context, entry, name) {
    this.context = context;
    this.entry = entry;
    this.name = name;
  }

  apply(compiler) {
    // compilation 钩子监听
    compiler.hooks.compilation.tap('SingleEntryPlugin', (compilation, { normalModuleFactory }) => {
      compilation.dependencyFactories.set(SingleEntryDependency, normalModuleFactory);
    });

    // make 钩子监听。
    compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
      const { entry, name, context } = this;

      const dep = SingleEntryPlugin.createDependency(entry, name);
      // make 钩子一旦被触发，它的回调方法里就会执行 compilation.addEntry，这标志着模块编译前的所有准备工作都做完了。
      // addEntry -> this._addModuleChain -> this.createModule
      compilation.addEntry(context, dep, name, callback);
    });
  }
}

module.exports = SingleEntryPlugin;
