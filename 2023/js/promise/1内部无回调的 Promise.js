/*
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
Promise创建后占用内存: 2.34 MB
GC后占用内存 1.77 MB

创建10亿个未被释放的 Promise 对象后，内存基本毫无变化。 
由于 Promise 内部函数里并没有任何回调等待和异步调用，所以猜测是不是 JavaScript 引擎已经做优化，自动将 Promise 释放了。
*/
let used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`程序启动时占用内存: ${Math.round(used * 100) / 100} MB`)

global.gc()
used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`启动后GC占用内存: ${Math.round(used * 100) / 100} MB`)

for (let i = 0; i < 1000000000; ++i) {
  new Promise((rs) => {
    if (Math.random() === NaN) {
      // 构造一个不可能的条件
      rs() // 永远执行不到此处，仅为了引用一下rs()
    }
  }).then(() => {
    // 不可能执行到此处
    console.log('never resolved')
  })
}

used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`Promise创建后占用内存: ${Math.round(used * 100) / 100} MB`)

global.gc()
used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`GC后占用内存 ${Math.round(used * 100) / 100} MB`)
