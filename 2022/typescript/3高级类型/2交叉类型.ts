// 交叉类型：两个不同类型叠加位新的类型，并包含所需的所有类型
{
  // type关键字作用：声明类型变量
  type newType = number & string
  let a: newType
  interface A {
    d: number,
    z: string,
  }
  interface B {
    f: string,
    g: string,
  }
  type C = A & B
  let c: C
}

// 当交叉类型有属性冲突时，无论如何赋值都不可能通过检查
{
  type newType = number & string
  let a: newType
  interface A {
    d: number
  }
  interface B {
    d: string
  }
  type C = A & B
  let c: C
  // c.a = 1 // 类型“C”上不存在属性“a”。
  // c.d = 1 // 不能将类型“number”分配给类型“never”。
  // c.d = '1' // 不能将类型“string”分配给类型“never”。

  // 想要一个变量可能是string，也有可能是number时，联合类型可以解决
}