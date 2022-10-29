const symbol1 = Symbol()
const symbol2 = Symbol('hello')
const symbol3 = Symbol('hello')
// console.log(symbol2 === symbol3) // false

// 用于对象属性的键
const obj = {
  [symbol1]: "value"
}
console.log(obj[symbol1]) // value

/*
常量使用symbol值好处：
任何其他值都不可能有相同的值
保证特定字面量或特定switch语句值可按设计工作
*/