import { promisify } from 'util';
const fs = require('fs');
// const util = require('util');
// const readFileAsync = util.promisify(fs.readFile);
const readFileAsync = promisify(fs.readFile);

async function init(path) {
    try {
        let data = await readFileAsync(path);
        data = JSON.parse(data);
        console.log(data.name);
    } catch (e) {
        console.log(e);
    }
}

init('./package.json');
