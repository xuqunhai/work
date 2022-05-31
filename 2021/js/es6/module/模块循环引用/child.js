// // 文件 child.js
// import { parent } from './parent.js';
// console.log('child.js', parent); // 报错
// Uncaught ReferenceError: Cannot access 'parent' before initialization

// child.js
import { parent } from './parent.js';
setTimeout(() => {
  console.log(parent); // 输出 'parent'
}, 0);
