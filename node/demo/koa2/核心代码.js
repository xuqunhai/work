/*
 * @Author: raferxu
 * @Date: 2021-03-13 08:43:21
 * @LastEditTime: 2021-03-13 08:55:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/核心代码.js
 */
const koa = require('koa');
const views = require('koa-views');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const Router = require('koa-router');
const app = new koa();
const router = new Router();
// 加载模版引擎
app.use(
    views(__dirname + '/views', {
        map: {
            html: 'ejs',
        },
    })
);
// 加载静态资源
app.use(static(path.join(__dirname, '/static')));
// 渲染模版
router.get('/', async (ctx, next) => {
    await ctx.render('index');
});
// 获取post请求参数
// 测试命令：$ curl -d "p1=val1&p2=val2" http://localhost:3000/
router.post('/', (ctx, next) => {
    let postData = ctx.request.body;
    ctx.body = postData;
});
app.use(bodyparser()).use(router.routes()).use(router.allowedMethods());
app.listen(3000);
