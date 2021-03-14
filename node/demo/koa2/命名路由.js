/*
 * @Author: your name
 * @Date: 2021-03-13 15:41:10
 * @LastEditTime: 2021-03-13 16:16:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/命名路由.js
 */
//设置此路由名称为user
router.get('user', '/users/:id', function (ctx, next) {});
// 生成路由/users/3
router.url('user', { id: 3 });
// 重定向到路由名称为rafer的页面
router.use(function (ctx, next) {
    // router.url()可根据路由名称和参数生成具体URL，而不用字符串拼接生成
    ctx.redirect(ctx.router.url('rafer'));
});
