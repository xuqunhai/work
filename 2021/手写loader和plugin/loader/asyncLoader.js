const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  // 让webpack知道这个loader是异步运行，返回的是和同步使用时一致的this.callback
  const asyncfunc = this.async();
  setTimeout(() => {
    source += '异步走上人生颠覆888';
    asyncfunc(null, source);
  }, 200);
};
