const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  // 存储节点以便能重新连接到 Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // 从 Chromium 断开和 puppeteer 的连接
  browser.disconnect();
  /*
  当 Puppeteer 从 Chromium 实例断开连接时被触发。原因可能如下：
    Chromium 关闭或崩溃
    调用browser.disconnect 方法
  */

  // 使用节点来重新建立连接
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // 关闭 Chromium
  await browser2.close();
});