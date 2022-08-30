// 如果他是一个 setter 时，那么此时我们在实例上进行赋值操作时，原型上的同名 setter 会被调用，
// 因为我们通过 child.name 调用，所以 setter 里的 this 会指向对应的 child ，
// 自然 setter 中的逻辑就相当于为 child 实例添加了一个普通属性 _name 值为 19QIngfeng 。

// 创建parent对象 拥有get/set以及_name
const parent2 = {
  _name: null,
  get name() {
    return this._name
  },
  set name(value) {
    this._name = value
  }
}

// 创建一个空对象child 相当于 child.__proto__ = parent 实现原型继承
const child2 = Object.create(parent2)
// 为child实例赋值name属性
child2.name = '19Qingfeng'
console.log(child2, 'child2') // {"_name":"19Qingfeng"} child
// 我们明明是在实例 child 上进行了赋值，可是为什么 child 上拥有了一个名为 _name 的 19Qinfeng ？
// 执行这个却显示true？？？ child.name===child._name true -> 19Qingfeng
// 很明显，child 实例对象上压根不应该存在所谓的 name 普通属性，他应该仅仅存在对应的 _name 属性。这这许是 Chrome 下的小问题。
// parent.name===parent._name true -> null
/*
如果 child 对象中包含名为 name 的普通数据访问属性，那么这条赋值语句机会修改已有的属性值。
如果原型链中查找不到这个 name 属性，那么很简单此时 name 属性会被直接添加到 child 实例对象上。

但是，如果 child 的原型链中查询到了 name 属性，那么此时情况就会稍微有些复杂。
如果 child 的原型链上存在一个 name 
如果是只读，那么赋值无效，读取的还是原型链上name；
如果他是一个 setter 时，那么此时我们在实例上进行赋值操作时，原型上的同名 setter 会被调用，
因为我们通过 child.name 调用，所以 setter 里的 this 会指向对应的 child ，
自然 setter 中的逻辑就相当于为 child 实例添加了一个普通属性 _name 值为 19QIngfeng 。


var parent2 = {
  _name: null,
  get name() {
    return this._name
  },
  set name(value) {
    this._name = value
  }
}
// 阻止修改对象中现有属性的值和特性，并阻止添加新属性
Object.freeze(parent2)
var child2 = Object.create(parent2)
child2.name = '19Qingfeng'
console.log(child2.name) // null

var parent2 = {};
Object.defineProperty( parent2, "name", {
  value: "<属性值>",
  writable: false,
  enumerable: true,
  configurable: true
});
var child2 = Object.create(parent2)
child2.name = '19Qingfeng'
console.log(child2.name) // <属性值>
*/