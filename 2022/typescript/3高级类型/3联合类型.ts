// 联合类型表示一个变量可以是几种类型之一
// number | string 表示一个值可以是数字或字符串

function padLeft(value: string, padding: string | number) { }
// let indentedString = padLeft('Hello ', true) // 类型“boolean”的参数不能赋给类型“string | number”的参数。
let indentedString = padLeft('Hello ', 1)

// 如果一个值是联合类型，我们只能访问它们共有属性（交集）
{
  interface A {
    a: number,
    b: string
  }
  interface B {
    a: string,
    c: string
  }
  interface C {
    a: boolean,
    d: string
  }
  let obj: A | B | C
  // obj.b = 1 // 类型“A | B | C”上不存在属性“b”。
}