// 在所有的 promise 都结束的时候做一些操作，而并不在乎它们是成功还是失败。
const promise1 = Promise.resolve(100);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'info'));
const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 200, 'name'));

Promise.allSettled([promise1, promise2, promise3]).then((results) => console.log(result));
// 返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise ，并带有一个对象数组，每个对象表示对应的 promise 结果。
/*
如果status 的值是 fulfilled，那么该对象还有一个 value 属性，其属性值是对应的 promise 成功的结果；
如果 status 的值是 rejected，那么该对象有一个 reason 属性，其属性值是对应的 promise 失败的原因。
    [
        { status: 'fulfilled', value: 100 },
        { status: 'rejected', reason: 'info' },
        { status: 'fulfilled', value: 'name' }
    ]
*/
