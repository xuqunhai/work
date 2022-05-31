/*
 * @Author: your name
 * @Date: 2021-03-13 15:11:04
 * @LastEditTime: 2021-03-13 15:12:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/koaRouter基本用法.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
// 定义路由规则
router.get('/', async (ctx, next) => {});
// 注册路由
app.use(router.routes());
