/*
当对象实现了Symbol.iterator时，就认为它是可迭代的
如array. map, set, string,, int32Array, unit32Array
Symbol.iterator函数返回供迭代的值

for...of语句就是调用对象上的Symbol.iterator函数
*/

const array = [3, 4, 5]
for (let i in array) {
  console.log('for in', i) // 0 1 2 —— 迭代的是对象的键
}
for (let i of array) {
  console.log('for of', i) // 3 4 5 —— 迭代的是对象的值
}

/*
// 这段代码在浏览器才能执行，因为仅在ES6及以上才生效
// ts-node iterator和generator.ts 会报错
// 因为ts代码生成目标为es5或es3时，迭代器只允许在atray类型上使用，在非数组值上使用for of语句是不可以的
const fruits = ['apple', 'pear', 'mango']
fruits['peach'] = 'Princess Peach!'
for (let i in fruits) {
  console.log('for in fruits', i) // 0 1 2 peach —— for in可以操作任何对象
}
for (let i of fruits) {
  console.log('for of fruits', i) // apple pear mango —— 只关注迭代对象的值
}
*/

/*
function * 是用来创建generator憨的语法
调用generator函数返回generaotr对象，遵循迭代器接口，即包含next、return和throw方法
本质允许一个函数可以暂停执行

调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，
而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）。
下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
*/

// 返回一个无限整数的列表
function* infiniteList() {
  let i = 0
  while (i < 1) {
    yield i++
  }
}
var gen = infiniteList() // 不会执行，只会返回一个generator对象,只会在调用next时开始执行
console.log(gen.next()) // { value: 0, done: false }
// 执行第一次next后，可以先去做别的事，再回来继续执行next
console.log(gen.next()) // { value: undefined, done: true }
console.log(gen.next()) // { value: undefined, done: true }

function* generator() {
  console.log('Execution started')
  yield 0;
  console.log('Execution resumed')
  yield 1;
  console.log('Excution end')
}

const generatorObj = generator() // generator函数执行与否由外部generator对象决定
console.log(generatorObj.next()) // 执行到yield语句时会暂停并返回yield的值
// Execution started
// { value: 0, done: false }
console.log(generatorObj.next()) // next被调用时继续执行
// Execution resumed
// { value: 1, done: false }
console.log(generatorObj.next())
// Excution end
// { value: undefined, done: true }
console.log(generatorObj.next())
// { value: undefined, done: true }

/*
// 外部系统可以传递一个值到generator函数体中
// 这段代码浏览器能执行

function* createIterator() {
  let first = yield 1;
  let second = yield first + 2;    // 4 + 2
  yield second + 3;                // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next());      // "{ value: 1, done: false }"
// 第一次调用next(), 执行 yield 1 到停止，返回 { value: 1, done: false }。注意，这时赋值语句 let fisrt = ... 没有执行;

// next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
console.log(iterator.next(4));     // "{ value: 6, done: false }"
// 第二次调用 next(4)， 先将参数 4 传入上一次 yield 处，可理解为：let first = 4;
console.log(iterator.next(5));     // "{ value: 8, done: false }"
console.log(iterator.next());      // "{ value: undefined, done: true }"
*/

/*
// 外部系统可以传递一个异常到generator函数体中
// 这段代码浏览器能执行
function* generator4(){
  try{
    yield 1;
  }catch(e){
    console.log(e.message)
  }
}
const iterator4=generator4()
console.log(iterator4.next()) // {value: 1, done: false}
console.log(iterator4.throw(new Error('incorrect'))) // incorrect {value: undefined, done: true} undefined
*/