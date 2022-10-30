// 类型保护、 类型区分、类型推导
// interface 描述对象结构
// 复用对象结构 - 交叉类型 联合类型
// 函数传参时使用interface对对象进行类型约束

interface A {
  a: number,
  b: string,
  c: number[],
  d: Array<string>
}

let obj1: A = {
  a: 1,
  b: '2',
  c: [1],
  d: ['1'],
  // e: 1 //  // 类型“A”上不存在属性“e”。
}