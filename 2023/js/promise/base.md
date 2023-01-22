Promise是什么？
异步编程的最新解决方案，旧的方法是回调；
Promsie是构造函数，可以封装一个异步操作并可以获取其结果；

为什么要用promise？
1、指定回调函数方式更加灵活，
旧的必须启动时指定：http(options, successFn, failFn)
promsie可以在启动后返回的promsie对象上绑定
const p = new Promsie(()=>{启动});
xxx;
p.then(绑定回调)

2、旧的回调地狱（嵌套调用-不便于阅读，不便于错误处理-外部回调函数异步处理结果是内部函数回调处理的条件）
promise链式调用；
终极方案 async/await

let p = new Promise(excutor) // excutor会当作同步代码立刻执行

同步：数组遍历方法 / Promise的excutor函数
异步：定时器 / ajax / Promise的成功/失败回调

promsie对象包含两个属性：[[PromiseStatus]] / [[PromiseResult]]

let b = Promise.resolve(x) // b是一个有状态的promise对象，结果的 PromiseStatus 由 x 决定，x是非promise则状态为成功，否则跟随x状态
let c = Promise.reject(y)  // c是一个有状态的promise对象，结果的 PromiseStatus 都是失败
Promise.resolve就是下面语法糖
new Promise((resolve, reject)= > resolve())

Promise.all(promises); // 都成功才返回成功promise对象，否则返回失败promise对象
- 所有输入的 promise 的 resolve 回调都结束，或者只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误
Promise.allSettled(promises); // 所有都完成时返回
- 在你有多个不依赖于彼此成功完成的异步任务时，或者你总是想知道每个 promise 的结果时，使用 Promise.allSettled() 。
Promise.race(promises); // 返回第一个完成的promsie对象
Promise.any(promises); // 返回第一个成功的promise对象
- 获取一些图片并显示第一张有效的图片（即最先 resolved 的那个 promise）。
- 只能得到一个兑现值（假设至少有一个 promise 兑现）。
- 返回的是第一个兑现的值。
- 如果可迭代对象内所有的 promises 都被拒绝了，那么该方法所返回的 promise 就会异步的切换至被拒状态，并用一个 AggregateError（继承自 Error）实例来作为它的拒因。

then方法返回的是一个新的promise，promise状态改变后所有then方法对应回调都会被执行；
then函数返回值promise状态由then方法调用时函数参数决定，如
let t = a.then(b, c);
如果a返回成功，则b会被执行，那么b执行后状态决定了t状态，即b成功则t成功，b失败或抛出错误则t失败；
t.then(a => console.log(a)).then(b => console.log(b));
打印出b为undefined，因为前一个then只有打印没有返回值，也就是undefined，所以传到下一个then的 PromiseResult 就是undefined；
异常穿透：t.then(a => throw 'a').then(b => console.log(b)).catch(e => console.warn(e));
最后catch能捕获到前面任意一个then的错误，而不必每个then写第二参数去捕获；

promise引起的js报错解决方法是加catch函数

改变promise状态除了resolve和reject外，抛出错误throw也能把状态从pending改成rejected；

中断promise.then有且只有一种方法，就是then返回一个pending状态的promise，即
p.then(a => console.log(a); return new Promise(() => {}))
 .then(b => console.log(b))
 .then(c => console.log(c))
 .catch(e => console.warn(e));



总结要点
    // then返回值是一个新的promise对象
    // 回调函数执行结果，
    // 如果是promise，则它的状态决定then的状态(想获取promise对象状态，可通过then拿到)
    // 如果不是promise，则then返回值状态为成功
  // 不仅回调，还要处理返回值，则外面包一层函数，里面一并处理

  catch本质就是触发reject进入失败回调；
  then允许不传任何参数，所以当不传时，为了能穿透，
  then() 等价于
  then(val=>val,reason=>{throw 'err'})

async函数规则和then方法一样的，
即
    // then返回值是一个新的promise对象
    // 回调函数执行结果，
    // 如果是promise，则它的状态决定then的状态(想获取promise对象状态，可通过then拿到)
    // 如果不是promise，则then返回值状态为成功


await 表达式
右侧表达式如果是promise对象，则await返回的是promise成功的值；
如果不是promise对象，直接await作为返回值；

await必须写在async函数中，但是async函数里可以没有await；
如果await右侧promise失败了，会抛出异常 Uncaught (in promise) Error，需要trycatch捕获；

async function haha(){
  try{
    const data1=await getData('url1');
    const data2=await getData('url2');
    const data3=await getData('url3');
    console.log(data1+data2+data3);
  }catch(e){

  }
}

常见内置错误
ReferenceError：引用的变量不存在
TypeError：类型错误，如获取undefined属性，把undefined当函数调用; 值的类型非预期类型时发生的错误。
RangeError：自己调用自己，死循环
- 尝试使用 Array 构造函数创建一个具有不合法的长度的字符串, new Array(-1)
- Number.prototype.toPrecision() / 一个用来指定有效数个数的整数。
  numObj = 0.000123
  console.log(numObj.toPrecision())    // 输出 '0.000123'
  console.log(numObj.toPrecision(5))   // 输出 '0.00012300'
  如果 precison 参数不在 1 和 100（包括）之间，将会抛出一个 RangeError 。
- Number.prototype.toFixed(digits)
  如果 digits 参数太小或太大 会引起 RangeError。
  如果该方法在一个非Number类型的对象上调用,会引起 TypeError
SyntaxError：语法错误
URIError: 以一种错误的方式使用全局 URI 处理函数而产生的错误。
- decodeURIComponent('%')
EvalError: 关于 eval() 全局函数的错误,此异常不再会被 JavaScript 抛出，但是 EvalError 对象仍然存在，以保持兼容性。
- throw new EvalError("Hello", "someFile.js", 10);
AggregateError: Promise.any所有 promise 都被拒绝时，它的拒因会是一个 AggregateError 实例
InternalError: 出现在 JavaScript 引擎内部的错误。通常描述某种数量过多的情况
- "too many switch cases"（过多 case 子句）；
- "too many parentheses in regular expression"（正则表达式中括号过多）；
- "array initializer too large"（数组初始化器过大）；
- "too much recursion"（递归过深）。
  - function loop(x) {
      if (x >= 1000000000000) return;

      // 做一些事情
      loop(x + 1);
    }
    loop(0);
    // InternalError: too much recursion


错误处理
try-catch // catch的参数e为错误对象，有message和stack属性
throw error


中断promise的then链式调用只有返回一个pending状态的新promise；
then方法和excutor一样，是同步执行的，只是then方法的参数才是异步执行；


js引擎：堆放对象，栈放函数；
宏队列：script、ajax、setTimeout、DOM事件回调
微队列：Promsie、mutationObserver

面试题
Promise.resolve().then(s=>console.log(1)).then(s=>console.log(2));
Promise.resolve().then(s=>console.log(3));
// 1 3 2
微任务队列【s=>console.log(1)】
微任务队列【s=>console.log(1)，s=>console.log(3)】
同步代码执行完，取微任务队列第一个执行 s=>console.log(1)
执行后then返回undefined，即resolve，此时同步执行后一个then，再把 s=>console.log(2) 放入队列，
微任务队列【s=>console.log(3)，s=>console.log(2)】
所以1后输出3最后输出2