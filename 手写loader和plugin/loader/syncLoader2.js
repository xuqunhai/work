// syncLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  // loader-utils，版本是^2.0.0
  const options = loaderUtils.getOptions(this);
  console.log(options);
  source += options.message;
  // 可以传递更详细的信息
  this.callback(null, source);
};
