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

Promise.all(promises); // 都成功才返回成功promise对象，否则返回失败promise对象
Promise.race(promise); // 返回第一个完成的promsie对象

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
TypeError：类型错误，如获取undefined属性，把undefined当函数调用
RangeError：自己调用自己，死循环
SyntaxError：语法错误

错误处理
try-catch // catch的参数e为错误对象，有message和stack属性
throw error
