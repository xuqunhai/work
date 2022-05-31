/*
 * @Author: your name
 * @Date: 2021-03-13 16:17:52
 * @LastEditTime: 2021-03-13 16:19:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/多中间件.js
 */
router.get(
    '/users/:id',
    (ctx, next) => {
        return User.findOne(ctx.params.id).then(function (user) {
            ctx.user = user;
            next();
        });
    },
    (ctx, next) => {
        console.log(ctx.user);
    }
);
/*
作用：
为一个路由添加特殊中间件
把一个路由要做的事情拆分成多个步骤实现，如异步操作
*/
