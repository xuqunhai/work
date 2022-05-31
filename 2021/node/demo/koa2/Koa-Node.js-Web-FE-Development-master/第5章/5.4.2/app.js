/*
 * @Author: your name
 * @Date: 2019-05-28 20:19:52
 * @LastEditTime: 2021-03-14 14:03:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work/node/demo/koa2/Koa-Node.js-Web-FE-Development-master/第5章/5.4.2/app.js
 */
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const multer = require('koa-multer');
const app = new Koa();
const router = new Router();
const upload = multer({
    dest: 'uploads/', // 指定上传文件的存储目录
});
const types = upload.single('avatar');
router.get('/upload', async (ctx, next) => {
    ctx.response.body = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <form method='post' action='/profile' enctype='multipart/form-data'>
            选择图片：<input name="avatar" id='upfile' type='file'/>
            <input type='submit' value='提交'/>
        </form>
        </body>
    </html>`;
});
router.post('/profile', types, async function cb(ctx, next) {
    /*
    types中间件处理过程
    // Multer会添加两个对象到request对象中：
    // body对象 表单文本域信息
    // file或files对象 包含表单上传的文件信息
    // 上传成功后，控制权由types中间件传递给cb中间件，此时请求对象已经存在上传文件信息
    */
    const { originalname, path: out_path, mimetype } = ctx.req.file;
    // 读取路径信息并拼接后缀名
    let newName = out_path + path.parse(originalname).ext;
    // 对已上传文件重命名进行简单异常判断
    let err = fs.renameSync(out_path, newName);
    let result;
    if (err) {
        result = JSON.stringify(err);
    } else {
        result = '<h1>upload success</h1>';
    }
    ctx.response.body = result;
});

app.use(router.routes());
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
