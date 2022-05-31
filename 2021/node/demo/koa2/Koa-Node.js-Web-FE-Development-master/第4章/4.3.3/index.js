/*
 * @Author: your name
 * @Date: 2019-05-28 20:19:52
 * @LastEditTime: 2021-03-13 22:07:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/Koa-Node.js-Web-FE-Development-master/第4章/4.3.3/index.js
 */
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname)));
app.use(bodyParser());

router.get('/', async (ctx, next) => {
    ctx.body =
        '<link rel="stylesheet" href="index.css"/>' +
        '<div class="sign-up">' +
        '<h3>注册</h3>' +
        '<form method="post">' +
        '<input type="text" name="name" placeholder="账号" required>' +
        '<input type="email" name="email" placeholder="邮箱" required>' +
        '<input type="password" name="password" placeholder="密码" required>' +
        '<input type="password" name="confirm_password" placeholder="确认密码" required>' +
        '<input type="submit" value="注 册">' +
        '</form>' +
        '</div>';
});

router.post('/', async (ctx, next) => {
    let { name, email, password, confirm_password } = ctx.request.body;

    let arr = [
        '<link rel="stylesheet" href="index.css"/>',
        '<div class="result">',
        '<h3>注册成功</h3>',
        '<p>账号：' + name + '</p>',
        '<p>邮箱：' + email + '</p>',
        '<p>密码：' + password + '</p>',
        '<p>确认密码：' + confirm_password + '</p>',
        '</div>',
    ];
    ctx.body = arr.join('');
});

app.use(router.routes()).listen(8083, () => {
    console.log('Server is running at http://localhost:8083');
});
