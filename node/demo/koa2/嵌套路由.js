/*
 * @Author: your name
 * @Date: 2021-03-13 16:22:51
 * @LastEditTime: 2021-03-13 16:28:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/嵌套路由.js
 */
// 获取科技板块列表：/bankuai/:bid/list
// 获取科技板块某文章：/bankuai/:bid/list/:did
const bankuai = new Router();
const list = new Router();
list.get('/', function (ctx, next) {});
list.get('/:did', function (ctx, next) {});

bankuai.use('/bankuai/:bid/list', list.routes(), list.allowedMethods());
app.use(bankuai.routes());
