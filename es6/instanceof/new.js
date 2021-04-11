// instanceof实现的原理就是，判断构造函数的原型对象(如Car.prototype和Object.prototype)是否在实例对象（auto）的原型链上（proto）;
// 如果在对象的原型链上，就返回true，如果不在就返回false;


var A = function(){};
A.prototype = {};
var a = new A();
A.prototype = {};
var b = new A();
console.log(a instanceof A);  //false
console.log(b instanceof A);  //true

// new操作符创建对象可以分为四个步骤：
// 1、创建一个空对象，这个对象的类型是object
// 2、将所创建的对象的proto属性值设为prototype属性值（关系：instance.constructor.prototype=instance.proto）
// 3、执行构造函数中的代码，构造函数中的this指向该对象
// 4、返回该对象


var A = function(){};
var o={};
A.prototype = o;
var a = new A();
A.prototype = o;
var b = new A();
console.log(a instanceof A);  //true
console.log(b instanceof A);  //true


Function.__proto__ === Function.prototype;  //true
Object.prototype.__proto__;    //null
Object.__proto__ === Function.prototype;  //true