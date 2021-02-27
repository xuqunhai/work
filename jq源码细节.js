(function(window, undefined) {
  // var jQuery = ...;
  // ...
  window.jQuery = window.$ = jQuery; // 使jQuery成为公开全局变量
})(window);

// 为啥要用匿名函数自调
/**
 * 函数作用域，防止破坏和污染全局变量，高内聚低耦合
 * 其他写法
 * (function() {}());
 * !function() {}();
 */

// 为啥要传入window对象
/**
 * 使window对象变为局部变量，
 * 1.这样可以更快访问window对象，而无需将作用域回退到顶层作用域；
 * 2.将window对象作为参数传入，可在压缩代码时进行优化
 * (function(a,b) {...})(window);
 * 参数window被压缩为a，参数undefined被压缩为b
 */

// 为什么要设置参数undefined
/**
 * 缩短查找undefined时的作用域链，代码压缩时进行优化；
 * 防止undefined被重写为其他值(各浏览器旧版本都能改写undefined)
 */

// 匿名函数自调，最好不要省略前后的分号
/**
// 匿名函数在之前或之后省略分号都可能引起无法错误
var n=1
(function() {})()
// Uncaught TypeError: 1 is not a function

(function() {})()
(function() {})()
// Uncaught TypeError: (intermediate value)(...) is not a function
*/

// 调用jQuery构造函数时，返回jQuery.fn.init的实例
var jQuery = function(selector, context) {
  return new jQuery.fn.init(selector, context, rootjQuery);
}
// 为啥要在jq构造函数内部用new创建另一个构造函数实例
/**
 * 这样，在创建jq对象时，可省略new，因为内部构造函数会帮忙创建对象；
 */

 // 为什么jQuery.fn.init实例能调用jQuery原型方法和属性
 /**
  * 因为后面执行了
  * jQuery.fn = jQuery.prototype;
  * jQuery.fn.init.prototype = jQuery.fn;
  * 相当于两者共享jQuery原型方法和属性
  */

// 覆盖jQuery.fn和jQuery.fn.init原型，并重写jQuery.prototype
jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  init: function(selector, context, rootjQuery) {},
};
// 为啥要重写jQuery.prototype
/**
 * 减少jq对象从原型继承太多属性和方法，进而减少内存占有
 */

// 合并对象属性
jQuery.extend = jQuery.fn.extend = function() {}

// 选择器表达式执行过程分析
/**
 * 从左向右可不断缩小查找范围，但每次处理块间关系符时都需要处理未知数量的子元素或后代元素；
 * 从右往左是先查找后过滤，处理块间关系符时只需要处理单个父元素或有限数量的祖先元素；
 * 所以，大多数情况，采用从右向左效果更高；
 * 
 */