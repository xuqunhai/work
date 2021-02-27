import { promisify } from 'util';
import { resolve as r } from 'path';
import { readFile, readFileSync as rfs, writeFileSync as wfs } from 'fs';
// import * as qs from 'querystring';

promisify(readFile)(r(__dirname, '../package.json')).then(data => {
    data = JSON.parse(data);
    console.log(data.name);
    wfs(r(__dirname, './name'), String(data.name), 'utf8');
});

// npm i -S babel-plugin-transform-runtime babel-runtime --registry=https://registry.npm.taobao.org
// .babelrc配置plugins
async function init(path) {
    try {
        let data = await rfs(path);
        data = JSON.parse(data);
        console.log(data.name);
    } catch (e) {
        console.log(e);
    }
}

init(r(__dirname, '../package.json'));
