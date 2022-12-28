{
  function isNumber(padding: number | string): padding is number {
    return typeof padding === 'number'
  }
  function isString(x: number | string): x is string {
    return typeof x === 'string'
  }
  function padLeft(value: string, padding: number | string) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value
    }
    // 每次typeof都必须定义函数（isNumber）？
    // 当使用基本类型时，会开启类型保护。
    // if (isString(padding)) {
    if (typeof padding === 'string') {
      return padding + value
    }
    throw new Error(`Expected string or number, got '${padding}'.`)
  }
  console.log(padLeft('Hello', 4)) // "    Hello"
}

{
  // instanceof 也可以开启类型保护，可以将类作为比较对象
  interface Person {
    talk(): void
  }
  class Teacher implements Person {
    constructor(name: string) { }
    talk() { }
  }
  class Student implements Person {
    constructor(name: string, age: string, classRoom: string) { }
    talk() { }
  }
  function getPerson() {
    return Math.random() < 0.5 ? new Teacher('zhang') : new Student('ming', '8', '3')
  }
  const person = getPerson()
  if (person instanceof Teacher) {
    person;
  }
  if (person instanceof Student) {
    person;
  }
}