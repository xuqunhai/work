/*
 * @Author: your name
 * @Date: 2021-03-12 22:48:38
 * @LastEditTime: 2021-03-12 22:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/app.js
 */
const koa = require('koa');
const app = new koa();
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>111</h1>';
    console.log(2);
});
app.use(async (ctx, next) => {
    console.log(3);
    next();
    console.log(4);
});
app.use((ctx, next) => {
    console.log(5);
    // 没有调用next，下面中间件不会执行
});
app.use((ctx, next) => {
    console.log(7);
});
app.listen(3000, () => {
    console.log(666);
});
// 1 3 5 4 2 洋葱模型
