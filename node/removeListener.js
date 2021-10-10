// 引入 events 模块
var events = require('events');
// 创建 emitter 对象
var emitter = new events.EventEmitter();
// 定义回调函数
var callback1 = function () {
  console.log('我是1');
  emitter.removeListener('connection', callback2); // emitter.off(eventName, listener) 是 emitter.removeListener() 的别名。
};
var callback2 = function () {
  console.log('我是2');
};
// 为 connection 事件注册监听器
emitter.on('connection', callback1);
emitter.on('connection', callback2);
// 第一次调用监听器，callback1 移除了监听器 callback2，但它依然会被调用。触发时内部的监听器数组为 [callback1, callback2]
emitter.emit('connection'); // 一旦事件被触发，所有绑定到该事件的监听器都会按顺序依次调用。也就是说在事件触发之后、且最后一个监听器执行完成之前，removeListener() 或 removeAllListeners() 不会从 emit() 中移除它们。
// 第二次调用监听器，此时 callback2 已经被移除了。内部的监听器数组为 [callback1]
emitter.emit('connection');

/*
我是1
我是2
我是1
*/
// 使用 emitter.removeAllListeners([eventName]) 移除全部监听器或指定的 eventName 事件的监听器。

/*
使用 emitter.setMaxListeners(n) 设置同一事件的监听器最大绑定数。
默认情况下，如果为特定事件添加了超过 10 个监听器，则 EventEmitter 会打印一个警告，这有助于我们发现内存泄露。
显然实际编码中并不是所有的事件都要限制 10 个监听器。
emitter.setMaxListeners() 方法可以为指定的 EventEmitter 实例修改限制。
当值设为 Infinity（或 0）表示不限制监听器的数量。
*/


// 查看事件绑定的监听器个数
/*
// 引入 events 模块
var events = require('events');
// 创建 emitter 对象
var emitter = new events.EventEmitter();
// 定义回调函数
var callback1 = function () {
  console.log('我是1');
};
var callback2 = function () {
  console.log('我是2');
};
// 为 connection 事件注册监听器
emitter.on('connection', callback1);
emitter.on('connection', callback2);
// 查看 connection 事件绑定的监听器个数
var num = emitter.listenerCount('connection');
console.log(num);
*/


// 通常我们要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。
/*

如果没有为 'error' 事件注册监听器，则当 'error' 事件触发时，会抛出错误、打印堆栈跟踪、并退出 Node.js 进程。比如：

// 引入 events 模块
var events = require('events');
// 创建 emitter 对象
var emitter = new events.EventEmitter();
// 设置监听器
emitter.on('error', (err) => {
  console.error('错误信息');
});
emitter.emit('error');

*/