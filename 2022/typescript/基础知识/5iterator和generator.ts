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
调用generator函数返回generaotr对象，包含next、return和throw方法
*/

// 返回一个无限整数的列表
function* infiniteList() {
  let i = 0
  while (i < 1) {
    yield i++
  }
}
var gen = infiniteList()
console.log(gen.next()) // { value: 0, done: false }
console.log(gen.next()) // { value: undefined, done: true }
console.log(gen.next()) // { value: undefined, done: true }

// p28