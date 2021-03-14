/*
 * @Author: your name
 * @Date: 2021-03-13 15:01:50
 * @LastEditTime: 2021-03-13 15:09:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/路由组件.js
 */
class Router {
    // 定义路由组件
    constructor() {
        this._routes = []; // 缓存路由规则
    }
    get(url, handler) {
        // 设置method为get的路由规则
        this._routes.push({
            url,
            method: 'GET',
            handler,
        });
    }
    routes() {
        // 返回路由处理中间件
        return async (ctx, next) => {
            const { method, url } = ctx;
            // 找到匹配的规则则执行回调
            const matchedRouter = this._routes.find(r => r.method === method && r.url === url);
            if (matchedRouter && matchedRouter.handler) {
                await matchedRouter.handler(context, next);
            } else {
                await next();
            }
        };
    }
}
module.exports = Router;
