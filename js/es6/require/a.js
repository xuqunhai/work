// a.js
let a = 1;
let b = {};
setTimeout(() => {
  a = 2;
  b.b = 2;
}, 100);
module.exports = { a, b };
