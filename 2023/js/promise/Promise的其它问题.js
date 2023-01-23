// 理论上说，不能叫做“性能问题”，而只是有可能出现的延迟问题。
var start = +new Date()
function foo() {
  setTimeout(function () {
    console.log('setTimeout')
    if (+new Date() - start < 1000) {
      foo()
    }
  })
}
foo()

/*
运行上面的代码，会打印出多少次'setTimeout'呢，
应该是250次左右，我刚刚运行了一次，是241次。
这说明，上述代码中两次setTimeout运行的时间间隔约是4ms（另外，setInterval也是一样的），
实事上，这正是浏览器两次Event Loop之间的时间间隔，
另外，在Node中，这个时间间隔跟浏览器不一样，经过我的测试，是1ms。

单单一个4ms的延迟可能在一般的web应用中并不会有什么问题，
但是考虑极端情况，我们有20个Promise链式调用，加上代码运行的时间，
那么这个链式调用的第一行代码跟最后一行代码的运行很可能会超过100ms，
如果这之间没有对UI有任何更新的话，虽然本质上没有什么性能问题，但可能会造成一定的卡顿或者闪烁

但是在Node应用中，确实是有可能出现这样的case的，所以一个能够应用于生产环境的实现有必要把这个延迟消除掉。
在Node中，我们可以调用process.nextTick或者setImmediate
Back in 2011 Microsoft proposed a solution to the setTimeout delay problem by implementing a new function called setImmediate. 
*/
var soon = (function () {
  var c = []
  function b() {
    while (c.length) {
      var d = c[0]
      d.f.apply(d.m, d.a)
      c.shift()
    }
  }
  var a = (function () {
    if (typeof MutationObserver !== 'undefined') {
      var d = document.createElement('div')
      return function (e) {
        var f = new MutationObserver(function () {
          f.disconnect()
          e()
        })
        f.observe(d, { attributes: true })
        d.setAttribute('a', 0)
      }
    }
    if (typeof setImmediate !== 'undefined') {
      return setImmediate
    }
    return function (e) {
      setTimeout(e, 0)
    }
  })()
  return function (d) {
    c.push({ f: d, a: [].slice.apply(arguments).splice(1), m: this })
    if (c.length == 1) {
      a(b)
    }
  }
})()
