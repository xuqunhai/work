const puppeteer=require('puppeteer')
const username = '15915375570'
const password = 'xuqunhai519'

async function run() {
    const brower = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 700
        },
        ignoreDefaultArgs: ['--enable-automation'],
        slowMo: 200,
        args: ['--window-size=1200,700']
    });
    const page = await brower.newPage();

    await page.goto('https://wufazhuce.com/', {
        waitUntil: 'networkidle2'
    })

    const oneText = await page.$eval('#carousel-one > div > div.item.active > div.fp-one-cita-wrapper > div.fp-one-cita > a', ele => ele.innerText)
    console.log('oneText: ', oneText)

    await page.goto('https://weibo.com/', {
        waitUntil: 'networkidle2'
    })
    await page.waitForNavigation()

    await page.reload()

    const loginUserInput = await page.waitForSelector('#loginname')
    await loginUserInput.click()
    await loginUserInput.type(username)

    const loginPasswordInput = await page.waitForSelector('#pl_login_form > div > div:nth-child(3) > div.info_list.password > div > input')
    await loginPasswordInput.click()
    await loginPasswordInput.type(password)

    const loginBtn = await page.waitForSelector('#pl_login_form > div > div:nth-child(3) > div.info_list.login_btn > a')
    await loginBtn.click()
    await page.waitForNavigation()

    const textInput = await page.waitForSelector('#v6_pl_content_publishertop > div > div.input > textarea')
    await textInput.click()
    await textInput.type(oneText)

    const sendBtn = await page.waitForSelector('#v6_pl_content_publishertop > div > div.func_area.clearfix > div.func > a')
    await sendBtn.click()

    // #v6_pl_content_publishertop > div > div.input > textarea
    // #v6_pl_content_publishertop > div > div.func_area.clearfix > div.func > a
    // https://weibo.com/
    // #carousel-one > div > div.item.active > div.fp-one-cita-wrapper > div.fp-one-cita > a
}

run()