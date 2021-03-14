/*
 * @Author: your name
 * @Date: 2021-03-13 16:31:12
 * @LastEditTime: 2021-03-13 17:21:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/添加路由前缀和转化URL参数.js
 */
// koa-router
let router = new Router({
    prefix: '/users',
});
router.get('/:a/:b', function (ctx, next) {
    console.log(ctx.params); // {a: 'xxx', b: 'x'}
});
