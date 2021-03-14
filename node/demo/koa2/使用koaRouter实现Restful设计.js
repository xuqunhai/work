/*
 * @Author: your name
 * @Date: 2021-03-13 15:20:39
 * @LastEditTime: 2021-03-13 15:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/使用koaRouter实现Restful设计.js
 */
// all方法一般用来设置请求头，如过期时间，CORS
router.all('/*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'https://www.xxx.com');
    await next();
});

router
    .post('/users', (ctx, next) => {
        //新增用户});
    })
    .get('/users/:id', (ctx, next) => {
        //查询用户
    })
    .put('/users/:id', (ctx, next) => {
        //修改用户
    })
    .del('/users/:id', (ctx, next) => {
        //删除用户
    });
