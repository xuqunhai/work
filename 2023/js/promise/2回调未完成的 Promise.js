/*
运行结果
程序启动时占用内存: 1.99 MB
启动后GC占用内存: 1.78 MB
1000000
Promise创建后占用内存: 522.05 MB
GC后占用内存 521.98 MB

内部有回调的 Promise，是会占用内存的。 并且当内部回调未完成时，这些内存会被持续挂起，即便 GC 也不会自动释放。 

那么如果回调完成，但是依旧既不 resolve 又不 reject，这些内存又会如何呢？ 继续测试…… 3.回调已完成的 Promise.js

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
      if (rand === 999) {
        // 构造一个不可能的条件
        rs() // 永远执行不到此处，仅为了引用一下rs()
      }
    }, 86400000) // 等待24小时后再执行，肯定完成不了了
    ++N
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
}, 10000) // 10秒钟后就测量内存，上面24小时的回调必定无法完成
