const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 100,
    height: 480,
    deviceScaleFactor: 1,
  });
  await page.goto('https://baidu.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();