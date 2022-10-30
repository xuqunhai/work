// 泛型用于提升代码冲用性，不仅支持当前设计的数据类型，也能支持将来的数据类型
// 灵活选择希望支持的类型

// 泛型函数
// 将输入参数作为他的返回值
function hello<T>(arg: T): T {
  return arg
}
// 添加了泛型变量T，代表用户即将传入的泪腺
// 使用T作为返回的类型

// 如何使用泛型函数？
// 两种方法：
// 尖括号
let output1 = hello<string>('hello ts')
// 类型推断 - 精简代码、提高可读性、代码简洁，但在某些复杂情况下，会失灵
let output2 = hello(1)
// 鼠标移到output1 和 output2 会看到类型提示

// 泛型变量
// 如果上面hello函数需要使用参数arg长度时
/*
function hello2<T>(arg: T): T {
  console.log(arg.length) // 类型“T”上不存在属性“length”。
  return arg
}
// 编译器会选择最糟糕的情况进行处理，比如T为number类型时就会没有length
*/

// 使用泛型数组就一定会有length属性
function hello3<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function hello4<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}