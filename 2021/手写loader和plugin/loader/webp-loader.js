// import schema from './options.json';
const loaderUtils = require('loader-utils');
const CWebp = require('cwebp').CWebp;

async function convertToWebp(img, quality = 75) {
  let encoder = new CWebp(img);
  encoder.quality = quality;
  let buffer = await encoder.toBuffer();
  return buffer;
}

module.exports = async function loader(content) {
  // 异步模式
  let callback = this.async();
  // 获取 options
  const options = loaderUtils.getOptions(this) || {};
  // // 验证 options
  // validateOptions(schema, options, {
  //   name: 'webp Loader',
  //   baseDataPath: 'options'
  // });
  try {
    // 普通图片转 .webp
    let buffer = await convertToWebp(content, options.quality);
    callback(null, buffer);
  } catch (err) {
    callback(err);
  }
};
// loader 接收文件流
// export const raw = true;
