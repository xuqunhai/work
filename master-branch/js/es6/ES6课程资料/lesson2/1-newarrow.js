"use strict";

// function sum (a, b) {
//     return a + b;
// };
// var sum = function (a, b) {
//     return a + b;
// };
// 箭头函数
// return 
// 
// let sum = (a, b) => ({a: a, b: b});
// console.log( sum(10, 20) )
// function sum (x) {
//     return function (y) {
//         return function (z) {
//             return x + y + z;
//         }
//     }
// };
// sum(1)(2)(3)
// var sum1 = sum(1);
// var sum2 = sum1(2);
// console.log( sum2(3) );
// let sum = x => y => z => x + y + z;
// let sum = x => y => z =>  x + y + z;
// console.log( sum(1)(2)(3) );
// var sum1 = function (a, a) {
//     console.log(a);
// }
// let sum = (x, x) => {
// }
// let sum = () => {
//     this.a = 10;
// }
// new sum();
// let sum = () => {
// };
// sum();
// let obj = {
//     fn: () => {
//     }
// }
// obj.fn();
// let arr = [() => {}];
// arr[0]();
// return () => {};
// function outer () {
//     // arguments
//     // 9 10 11
//     let sum = (a, b) => {
//         console.log(arguments, a, b);
//     };
//     sum(1, 2);
// }
// outer(9, 10, 11);
// function Curry () {
//     // var arg = arguments;
//     return () => {
//         console.log(arguments)
//     }
// };
// Curry('a', 'b')(1, 2);
//this
var a = 'outerObj'; // let sum = () => {
//     // window 
//     console.log(this.a);
// };
// sum();
// let obj = {
//     a: 'innerObj',
//     fn () {
//         // this obj
//         let sum = () => {
//             // obj
//             console.log(this.a);
//         }
//         return sum;
//     }
// };
// let outerSum = obj.fn();
// outerSum();

var sum = function sum(x) {
  return x * x;
};

var obj = {
  ms: 'abc',
  fn: function fn() {
    var _this = this;

    // obj
    // var self = this;
    setTimeout(function () {
      //this obj
      console.log(_this.ms);
    }, 500);
  }
};
obj.fn(); // React this
// let arr = [10, 20, 30, 40, 50, 60];
// console.log( arr.map(ele => ele * ele) );
// console.log( arr.filter(ele => ele > 20) );
