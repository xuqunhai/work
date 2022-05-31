// node --expose-gc gc.js
global.gc()
console.log('before', process.memoryUsage().heapUsed)

/*
let map = new Map()
let key = new Array(5 * 1024 * 1024)
map.set(key, 1)

global.gc()
console.log('after', process.memoryUsage().heapUsed)

map.delete(key) // 不加这句，直接把key置为null是不会清理内存的
key = null
global.gc()
console.log('clear exact', process.memoryUsage().heapUsed)
*/

// 上面必须delete掉key是因为map对key的强引用
// 如果没有写delete，那就使用weakmap，它是弱引用
let wm = new WeakMap()
let key = new Array(5 * 1024 * 1024)
wm.set(key, 1)

global.gc()
console.log('after', process.memoryUsage().heapUsed)

key = null

global.gc()
console.log('clear exact', process.memoryUsage().heapUsed)