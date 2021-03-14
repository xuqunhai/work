const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const app = new Koa();
const router = require('./router');
app.use(staticFiles(path.resolve(__dirname, "./public"), {
    maxage: 30 * 24 * 60 * 60 * 1000
}));    
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));
app.use(bodyParser());
router(app);
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
