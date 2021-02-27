// es5
function Point5(x, y) {
  this.x = x;
  this.y = y;
}
Point5.prototype.getPosition = function () {
  return '(x: '+this.x+', y: '+this.y+')'
}
var p1 = new Point5(2, 3)
console.log(p1)
console.log(p1.getPosition())
console.log(p1.__proto__ === Point5.prototype) // true

var p = Object.create(Point5.prototype)
console.log(p.__proto__ === Point5.prototype) // true

// es6
class Point6 {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  getPosition () {
    return `(x: ${this.x}, y: ${this.y})`
  }
}
const p2 = new Point6(1, 2);
console.log(p2)
console.log(p2.getPosition())

// p1 和 p2 为什么是对象？
/*
new操作符做了什么？
创建一个空对象，并将该对象原型指向构造函数原型：
var p1 = Object.create(Point.prototype) // p1.__proto__ === Point.prototype
将this指向该对象后，执行构造函数(挂载属性)：
Point.apply(p1, rest)
返回该对象：
return p1
*/
// es5和es6区别？
/*
Poiont5能直接调用，Point6直接调用会报错；
*/

// 存取属性
// es6
class Li {
  constructor (age) {
    this._age = age
  }
  set age(newVal) {
    this._age = newVal
  }
  get age() {
    return this._age
  }
}
const li = new Li(18)
console.log(li.age)
li.age = 19
console.log(li.age)

// es5
var si = {
  _age: 21,
  set age(newV) {
    this._age = newV
  },
  get age() {
    return this._age
  }
}
console.log(si.age)
si.age = 30
console.log(si.age)

// class类静态方法static关键字
class Sta {
  constructor () {}
  static getName () {
    console.log(Sta.name)
  }
}
const s1 = new Sta()
console.log(Sta.getName())
// console.log(s1.getName()) // TypeError: s1.getName is not a function

// 静态属性在新标准中也可用static关键字声明
// class A {
//   static x = 0
// }
// 新标准之前只能用 A.x = 0 来变相实现

// 私有方法：目前标准没有实现，只能变相实现：
// x.js
// const _a = function () {}
// class X {
//   a() {
//     _a.call(this)
//   }
// }
// export default X
// 模块外部无法使用_a，因为没有导出

// 第二种方法使用Symbol
// const syb = Symbol('syb')
// export default class Sb {
//   static [syb] () {}
// }

// 私有属性
// class n {
//   #newProp = 12 // 最新标准才支持
// }

// new.target能判断是否是通过new操作符调用构造函数，是的话返回构造函数，不是的话返回undefined
function Tar() {
  console.log(new.target)
}
var t1 = new Tar() // function Tar() {}
var t2 = Tar() // undefined

// new.target应用场景：父类不能直接实例化，需要子类继承后由子类实例化
// class Parent {
//   constructor () {
//     if (new.target === Parent) {
//       console.log('不能直接实例化父类')
//     } else {
//       console.log(`可以实例化，因为当前是通过这个构造函数实例化的: ${new.target}`)
//     }
//   }
// }

// class Child extends Parent {
//   constructor () {
//     super() // 相当于Parent.constructor.call(Child)
//   }
// }

// const ch1 = new Child()
// const pa1 = new Parent() // 不能直接实例化父类
// console.log(ch1 instanceof Child) // true
// console.log(ch1 instanceof Parent) // true
// console.log(Object.getPrototypeOf(Child) === Parent) // true

// super的两种使用？作为对象的指向问题？
/*
// 作为函数
只能在子类的constructor里调用，而且调用后才能使用this；
super相当于调用了父类的constructor；
// 作为对象的指向问题？
在普通方法中，指向父类原型方法；
在静态方法中，指向父类；
*/

class Parent {
  constructor () {
    this.name = 'parent'
  }
  getType() {
    console.log('父类原型方法')
  }
}
Parent.getType = function () {
  console.log('父类方法')
}
class Child extends Parent {
  constructor () {
    super()
    this.name = 'child'
  }
  getT() {
    console.log('getT')
    super.getType()
  }
  static getT2() {
    console.log('static getT2')
    super.getType()
  }
}
const c1 = new Child()
console.log(c1.getT()) // getT 父类原型方法
console.log(Child.getT2()) // static getT2 父类方法

// es5是无法继承原生构造函数的，但是es6可以
class CustomArr extends Array {
  constructor (...args) {
    super(...args)
  }
}
const arr = new CustomArr(3)
arr.fill('_')
console.log(arr) // [ '_', '_', '_' ]

// 为什么必须先调用super方法才能使用this原因？
/*
es6和es5实现继承的机制存在差异
es5构造函数
先创建子构造函数的实例this，然后再将父构造函数的属性方法添加到this上；
es6类
先从父类取到实例对象this，再调用super函数之后，将子类属性和方法加到this上
*/