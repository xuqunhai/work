/*
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
1000000
Promise创建后占用内存: 522.57 MB
GC后占用内存 1.8 MB

内部只要有回调的 Promise，就是会占用内存的。 但回调执行完成后，这部分内存的引用计数应该就被清零，所以 GC 后这部分内存会被自动释放。

结论
未执行完成的 Promise（包括内部等待的回调未完成）会占用内存。
执行完成的 Promise（包括内部等待的回调也执行完成），不占用内存，可被GC释放。
执行完成的 Promise，即便未触发 resolve 或 reject，也可以被 GC 自动释放掉。
综上，无需担心既不 resolve 也不 reject 的 Promise 对象会引发内存泄漏。

*/
let used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`程序启动时占用内存: ${Math.round(used * 100) / 100} MB`)

global.gc()
used = process.memoryUsage().heapUsed / 1024 / 1024
console.log(`启动后GC占用内存: ${Math.round(used * 100) / 100} MB`)

let rand = Math.random()
let N = 0
for (let i = 0; i < 1000000; ++i) {
  new Promise((rs) => {
    setTimeout(() => {
      ++N
      if (rand === 999) {
        // 构造一个不可能的条件
        rs() // 永远执行不到此处，仅为了引用一下rs()
      }
    }, 10) // 10毫秒后即执行，确保这里的回调肯定执行完成
  }).then(() => {
    console.log('never resolved')
  })
}

setTimeout(() => {
  console.log(N)
  used = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(`Promise创建后占用内存: ${Math.round(used * 100) / 100} MB`)

  global.gc()
  used = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(`GC后占用内存 ${Math.round(used * 100) / 100} MB`)
}, 10000) // 上面的回调等待10毫秒，这里等待10秒，确保到这里回调肯定执行完成
