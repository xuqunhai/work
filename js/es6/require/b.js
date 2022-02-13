// b.js
const a = require('./a');
console.log(a.a);
console.log(a.b);
setTimeout(() => {
  console.log(a.a);
  console.log(a.b);
}, 500);
