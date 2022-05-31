"use strict";

// var name = 10;
// 全局作用域
// 局部作用域
// 闭包
var arr = [];

var _loop = function _loop(i) {
  arr[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}

;
arr[0]();
arr[4]();
arr[7](); //
// console.log(a);
// let a = 10;
// console.log(window.a);
// 加强对作用域的控制
// let  {} => 块级作用域
// 临时死区
// let a = 10;
// {
//     console.log(a)
//     let a = 10;
// };
// let b = 10;
// {
//     // console.log(b);
//     let b = 20;
//     {
//         console.log(b);
//     }
// }
// let _a = 10;
// {   
//     console.log(_a)
//     let a = 20;
//     console.log(a);
// }
// if (true) {
//     let a = 10;
//     console.log(a);
// }
// console.log(a);
// let i = 0;
// while (i < 5) {
//     i++;
//     let b = 10 + i;
//     console.log(b);
// };
// console.log(b);
