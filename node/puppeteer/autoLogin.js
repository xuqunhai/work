const puppeteer = require('puppeteer');
const axios = require('axios');
const config = require('./config');
const loginurl = config.loginurl;
const user = config.user;
const headless = false;
const rize = require('rize');

var token;
console.log(config);

const browser = puppeteer.launch(
  {
    headless, executablePath: config.chromePath, args: ['--start-maximized', '--disable-infobars']
  }
);


async function login() {

  // 预先定义，在下面接受内层返回的brower对象
  // 待内部变量传出后，再给其赋值
  var _token;

  await browser.then(
      async browser => {
      const loginPage = await browser.newPage();
      var vfcode; 
      // 闭包，内部可访问外部的变量，之后将其传出
      var __token; 
      await loginPage.setViewport({width:0, height:0})

      await loginPage.on('requestfinished', request => {
        if (request.url().endsWith('Get_VerifyCode')){
          request.response().json().then(
            (result) => {  
              vfcode = JSON.parse(result).data.verifyCode;
            })}});
    
      await loginPage.goto(loginurl);
      await loginPage.type('input[name="username"]', user[0]);
      await loginPage.type('input[name="password"]', user[1]);
      await loginPage.type('input[name="verificationCode"]', vfcode);
      await loginPage.click('span.mcenter.submitinner');
      await loginPage.on('requestfinished', request =>  {
           
          if(request.url().endsWith('Post_Authenticate')){
            request.response().json().then((result) => { 
              __token = 'BasicAuth ' + JSON.parse(result).data.tokenID;
            });
          }
          
      // 在这里卡了很久，因为异步，内部赋值总是要晚于外面的代码，不得不加上等待，等待一会儿再返回token
      }).waitFor(500);
    // browser在其内部定义，须返回给上层
    // console.log('____, ' ,_token);
    return __token;
    }   
  ).then( (t) => {_token = t;});
  
  return _token
}



login().then(
  result => {
    token = result;
    registerProj();
  }
);