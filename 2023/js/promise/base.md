let p = new Promise(excutor) // excutor会当作同步代码立刻执行

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