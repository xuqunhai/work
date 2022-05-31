// 在 globalThis 之前，我们这样去获取全局对象：
// 在 Web 中，可以通过 window、self 取到全局对象，
// 但是在 Web Workers 中，只有 self 可以。
// 在 Node.js 中，它们都无法获取，必须使用 global。
var getGlobal = function () {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};
// ES2020 中引入 globalThis 作为顶层对象，在任何环境下，都可以简单的通过 globalThis 拿到顶层对象。
