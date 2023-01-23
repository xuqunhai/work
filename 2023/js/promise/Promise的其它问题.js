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

/*
想要在发生某种错误后就停止执行Promise链后面所有的代码。
一般的想法是抛出一个特殊的Error对象，然后在Promise链后面的所有catch回调里，检查传来的错误是否为该类型的错误，如果是，就一直往后抛，
这种方案的问题在于，你需要在每一个catch里多写一个if来判断这个特殊的Error，繁琐不说，还增加了耦合度以及重构的困难。

发生无法继续的错误后，直接返回一个始终不resolve也不reject的Promise，
即这个Promise永远处于pending状态，那么后面的Promise链当然也就一直不会执行了，因为会一直等着。

*/

Promise.stop = function () {
  return new Promise(function () {})
}

doSth()
  .then((value) => {
    if (sthBigErrorOccured()) {
      return Promise.stop()
    }
    // normal logic
  })
  .catch((reason) => {
    // will never get called
    // normal logic
    // this function will never got GCed
  })
  .then()
  .catch((reason) => {
    // will never get called
    // normal logic
    // this function will never got GCed
  })
  .then()
  .catch((reason) => {
    // will never get called
    // normal logic
    // this function will never got GCed
  })(
  /*
好处在于你几乎不需要更改任何现有代码，而且兼容性也非常好
但它引入的一个新问题就是链式调用后面的所有回调函数都无法被垃圾回收器回收，会造成潜在的内存泄露。
在一个靠谱的实现里，Promise应该在执行完所有回调后删除对所有回调函数的引用以让它们能被回收
但如果我们不使用匿名函数，而是使用函数定义或者函数变量的话，在需要多次执行的Promise链中，这些函数也都只有一份在内存中，不被回收也是可以接受的。

返回一个永远处于pending状态的Promise之后的Promise链上的所有Promise都将处于pending状态，
这意味着后面所有的回调函数的内存将一直得不到释放。
在简单的页面里使用这种方案也许还行得通，但在WebApp或者Node里，这种方案明显是不可接受的。

- 永不 resolve / reject 的 Promise 会导致内存泄漏吗？   https://zhuanlan.zhihu.com/p/385764204?ivk_sa=1024320u
既不resolve又不reject的Promise对象。 例如：被取消的HTTP请求等。 
JavaScript 的内存管理是基于引用计数的，出现上述情况的 Promise 对象时，并没有显式的方法告知 Promise “你将用不到了”，
如此理论上如果出现大量这样的 Promise 对象，将导致内存泄漏。 然而事实是否这样呢？

https://github.com/xieranmaya/blog/issues/5

那有没有办法即达到停止后面的链，同时又避免内存泄露呢。
在Promise链上所有的catch里都加上一句if，来判断传来的错误是否为一个无法处理的错误，
如果是则一直往后面抛，这样就达到了即没有运行后面的逻辑，又避免了内存泄露的问题。

对then的重写并不会造成什么问题，闭包里的对象在外界是访问不到，外界也永远也无法构造出一个跟闭包里Symbol一样的对象
Promise.stop()返回一个外界无法得到的值，用以表达“跳过后面所有的Promise”，然后在我们重写的then方法里使用。
*/
  (function () {
    var STOP_VALUE = Symbol() //构造一个Symbol以表达特殊的语义
    var STOPPER_PROMISE = Promise.resolve(STOP_VALUE)

    Promise.prototype._then = Promise.prototype.then

    Promise.stop = function () {
      return STOPPER_PROMISE //不是每次返回一个新的Promise，可以节省内存
    }

    Promise.prototype.then = function (onResolved, onRejected) {
      return this._then(function (value) {
        return value === STOP_VALUE ? STOP_VALUE : onResolved(value)
      }, onRejected)
    }
  })()
)

Promise.resolve(8)
  .then((v) => {
    console.log(v)
    return 9
  })
  .then((v) => {
    console.log(v)
    return Promise.stop() //较为明确的语义
  })
  .catch(function () {
    // will never called but will be GCed
    console.log('catch')
  })
  .then(function () {
    // will never called but will be GCed
    console.log('then')
  })

/*
  在所有的Promise链的最后都加上一个catch，这样出错后就能被捕获到，
  这种方法确实是可行的，但是首先在每个地方都加上几乎相同的代码，违背了DRY原则，其次也相当的繁琐。
  另外，最后一个catch依然返回一个Promise，除非你能保证这个catch里的函数不再出错，否则问题依然存在。

  能不能在不加catch或者done的情况下，也能够让开发者发现Promise链最后的错误呢？
  答案依然是肯定的。

  可以在一个Promise被reject的时候检查这个Promise的onRejectedCallback数组，如果它为空，则说明它的错误将没有函数处理
  */
function reject(reason) {
  setTimeout(function () {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      if (self.onRejectedCallback.length === 0) {
        console.error(reason)
      }
      for (var i = 0; i < self.rejectedFn.length; i++) {
        self.rejectedFn[i](reason)
      }
    }
  })
}

/*
出错时，是用throw new Error()还是用return Promise.reject(new Error())呢？
而使用Promise.reject(new Error())，则需要构造一个新的Promise对象（里面包含2个数组，4个函数：resolve/reject，onResolved/onRejected），也会花费一定的时间和内存。
出错用throw，正常时用return，可以比较明显的区分出错与正常，

在Promise里发现显式的错误后，用throw抛出错误会比较好，而不是显式的构造一个被reject的Promise对象。
*/
