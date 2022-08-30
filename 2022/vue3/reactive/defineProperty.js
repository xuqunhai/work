const parent = {
  name: '19Qingfeng'
}
// 创建一个空对象child 相当于 child.__proto__ = parent 实现原型继承
const child = Object.create(parent)
console.log(child.__proto__===parent); // true

const obj = {
  _name:null,
  get name(){
    console.log('get obj name 666')
    return this._name;
  },
  set name(value) {
    console.log('set objname xxx')
    this._name = value
  }
}
obj.name = 'rx'
console.log(obj.name)

const o = {
  _name:null
}
/*
Object.defineProperty，该方法接收三个参数
obj：添加新属性的对象
property：要添加的属性
descriptor：新属性的描述
Object.defineProperty(obj, 'age', {
    value: 3,
    writable: true,
    configurable: true,
    enumerable: true,
})
value表示该属性的值为3，writable表示该属性可以被修改，configurable表示该属性可以被配置，enumerable则表示该属性可以被枚举

Object.defineProperty在对一个不可写且不可配置的属性进行getter或setter时会抛出TypeError，通常我们需要使用try catch去捕获这个错误
但使用Reflect.defineProperty则不会，而是会返回false来代表此次操作失败

使用上述方式为对象添加的属性age是立即可见的，
使用getter和setter这种方式时，新添加的属性并不会立即可见，而是在访问/修改时可见
const obj = { name: '鲨鱼辣椒' }
console.log(obj) // {name: '鲨鱼辣椒'}
Object.defineProperty(obj, 'age', {
    get() {
        return 3
    },
    set(v) {},
})
console.log(obj) // {name: '鲨鱼辣椒'},这里只会显示name，不会直接显示age
在访问age属性时，会触发get函数；在修改age属性时，会触发set函数
如果某个对象中又嵌套了其它对象或是数组，那可能就要递归遍历当前对象实现监听

*/
Object.defineProperty(o,'name', {
  get() {
    console.log('get o name')
    return this._name
  },
  set(v) {
    console.log('set o name')
    this._name=v
  }
})
o.name = 'rx2'
console.log(o.name)



// 那有没有一种简便的方式来胜任这项工作呢？有，那就是——Proxy