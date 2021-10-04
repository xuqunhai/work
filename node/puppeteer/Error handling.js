const {TimeoutError} = require('puppeteer/Errors');

// ...

try {
  await page.waitForSelector('.foo');
} catch (e) {
  if (e instanceof TimeoutError) {
    // 如果超时，做一些处理。
  }
}