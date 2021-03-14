/*
 * @Author: your name
 * @Date: 2021-03-13 17:53:04
 * @LastEditTime: 2021-03-13 19:37:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/jwt权限控制.js
 */
const { sign } = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({ secret });
// 通过test用户名登录
// curl http://127.0.0.1:3000/api/login\?username\=test
// 请求头中带上Token
// curl -H "Authorization: Bearer tokenString" http://127.0.0.1:3000/api/userInfo"
router
    .post('/api/login', async (ctx, next) => {
        const user = ctx.request.body;
        if (user && user.username) {
            let { username } = user;
            const token = sign({ username }, secret, { expiresIn: '1h' });
            ctx.body = {
                message: 'Get Token Success',
                code: 1,
                token,
            };
        } else {
            ctx.body = {
                message: 'Param Error',
                code: -1,
            };
        }
    })
    .get('/api/userInfo', jwt, async ctx => {
        ctx.body = { username: ctx.state.user.username };
    })
    .get('/api/adminInfo', jwt, admin, async ctx => {
        // 利用koa-router对多中间件的支持使用了admin中间件
        ctx.body = { username: ctx.state.user.username };
    });
// 对用户身份进行判断，管理员的话就继续执行下面逻辑
const admin = () => {
    return async (ctx, next) => {
        if (ctx.state.user.username === 'admin') {
            next();
        } else {
            ctx.body = {
                code: -1,
                message: 'Authentication Error',
            };
        }
    };
};
// 对URL地址对某一层级进行权限控制，减少接口的重复设置
const user = new Router();
const detail = new Router();
detail.get('/info', async ctx => {
    ctx.body = { username: ctx.state.user.username };
});
// 由于所有detail上的接口都需要权限，所以将权限控制放在/api/user福层级
user.get('/api/login', async ctx => {}).use(
    '/api/user',
    jwt,
    detail.routes(),
    detail.allowedMethods()
);
app.use(router.routes()).use(router.allowedMethods());
