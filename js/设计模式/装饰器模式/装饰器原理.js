@testDec1
class Demo1 {}
function testDec1(target) {
  target.isDec = true;
}
console.log(Demo1.isDec); // true

// 传参
function testDec(isDec) {
  return function (target) {
    target.isDec = isDec;
  };
}
@testDec(true)
class Demo {}

// 原理
@testDec
class Demo {}
// 等同于
class Demo {}
Demo = testDec(Demo) || Demo;

// 装饰类-mixin示例
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}
const Foo = {
  foo() {}
};
@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo(); // 'foo'
