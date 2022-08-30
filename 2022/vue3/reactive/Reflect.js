/*
Proxy API是处理对象handler里面的，而Reflect类似于 Math 和 JSON类 提供为反射提供一系列的静态方法

通常我们有三种方法读取一个对象的属性：
使用 . 操作符：leo.name ；
使用 [] ： leo['name'] ；
使用 Reflect API： Reflect.get(leo, 'name') 。 // 使用Reflect上的方法时，如果第一个参数不是对象，那么此时会立即抛出TypeError
这三种方式输出结果相同。

Object.defineProperty在对一个不可写且不可配置的属性进行getter或setter时会抛出TypeError，通常我们需要使用try catch去捕获这个错误
但使用Reflect.defineProperty则不会，而是会返回false来代表此次操作失败

const obj = { name: '鲨鱼辣椒' }
Object.defineProperty(obj, 'age', {
    value: 25,
    writable: false,
    configurable: false
})
console.log(obj.age) // 25
Object.defineProperty(obj, 'age', {
    get() { return }
})
console.log(obj.age) // TypeError

const obj = { name: '鲨鱼辣椒' }
Object.defineProperty(obj, 'age', {
    value: 25,
    writable: false,
    configurable: false
})
console.log(obj.age) // 25
console.log(Reflect.defineProperty(obj, 'age', {
    get() { return }
})) // false
console.log(obj.age) // 25

方法
console.log(Reflect.get(obj, 'name')) // 鲨鱼辣椒
console.log(Reflect.set(obj, 'age', 26)) // false，true代表本次操作成功，false代表失败
console.log(Reflect.has(obj,'age')) // true 相当于in操作符。
console.log('age' in obj) // true
console.log(Reflect.deleteProperty(obj, 'name')) // true 删除成功是指对于那些可写且可配置的属性
console.log(Reflect.ownKeys(obj)) // ['name', 'gender', Symbol(age)] // 自有属性、符号值、不可枚举属性作为数组返回
使用Reflect.ownkeys来列举对象中的属性，这个方法会遵循以下顺序
按照数字上升排序 / 按照创建顺序列举字符串属性名 / 按照创建顺序列举符号属性名
const obj = {
    1: '我的键是整数1',
    one: '我的键是字符串1',
    [Symbol.for('s1')]: '我的键是符号值1',
}
obj.two = '我的键是字符串2'
obj[Symbol.for('s2')] = '我的键是符号值2'
obj[2] = '我的键是整数2'
console.log(Reflect.ownKeys(obj)) // ['1', '2', 'one', 'two', Symbol(s1), Symbol(s2)]
*/

let product0 = { price: 10, quantity: 2 };
let proxiedProduct = new Proxy(product0, {
    get(target, key){
      console.log('正在读取的数据0：',key);
    return target[key];
  }
})
console.log(proxiedProduct.price); 
// 正在读取的数据： price
// 10

// 然后结合 Reflect 使用，只需修改 get 函数：
  //   get(target, key, receiver){
  //     console.log('正在读取的数据：',key);
  //   return Reflect.get(target, key, receiver);
  // }
let product2 = { price: 10, quantity: 2 };
let proxiedProduct2 = new Proxy(product2, {
  get(target, key, receiver){
    console.log('正在读取的数据2：',key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver){
    console.log('正在修改的数据2：', key, ',值为：', value);
    return Reflect.set(target, key, value, receiver);
  }
})
proxiedProduct2.price = 20;
console.log(proxiedProduct2.price); 
// 正在修改的数据： price ,值为： 20
// 正在读取的数据： price
// 20

//  已经实现一个简单 reactive() 函数，用来将普通对象转换为响应式对象。但是还缺少自动执行 track() 函数和 trigger() 函数

const targetMap = new WeakMap();
let total = 0;
const effect = () => { total = product.price * product.quantity };
// targetMap.get(target) depsMap.get(key) dep.forEach
const track = (target, key) => { 
  let depsMap = targetMap.get(target);
  if(!depsMap){
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if(!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(effect);
}
const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if(!depsMap) return;
    let dep = depsMap.get(key);
  if(dep) {
    dep.forEach( effect => effect() );
  }
};
const reactive = (target) => {
  const handler = {
    get(target, key, receiver){
      console.log('正在读取的数据：',key);
      const result = Reflect.get(target, key, receiver);
      track(target, key);  // 自动调用 track 方法收集依赖
      return result;
    },
    set(target, key, value, receiver){
      console.log('正在修改的数据：', key, ',值为：', value);
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if(oldValue != result){
         trigger(target, key);  // 自动调用 trigger 方法执行依赖
      }
      return result;
    }
  }
  
  return new Proxy(target, handler);
}
let product = reactive({price: 10, quantity: 2}); 
effect();
console.log(total); 
product.price = 20;
console.log(total); 
// 正在读取的数据： price
// 正在读取的数据： quantity
// 20
// 正在修改的数据： price ,值为： 20
// 正在读取的数据： price
// 正在读取的数据： quantity
// 40


// 上一节代码中，还存在一个问题： track 函数中的依赖（ effect 函数）是外部定义的，
// 当依赖发生变化， track 函数收集依赖时都要手动修改其依赖的方法名。
// 那么如何解决这个问题呢？

// 1. 引入 activeEffect 变量, 见activeEffect.js
// 2. 引入 ref 方法
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1

const ref = raw => {
  const r = {
    get value(){
      track(r, 'value');
      return raw;
    },
    
    set value(newVal){
    	raw = newVal;
      trigger(r, 'value');
    }
  }
  return r;
}