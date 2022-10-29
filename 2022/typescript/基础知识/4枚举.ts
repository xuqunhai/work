/*
订单开始状态 0
未结账 1
运输中 2
运输完成 3
已收货 4

纯数字使代码缺乏可读性
枚举可定义一些有意义常量
*/

// 数字枚举
enum OrderStatus {
  Start = 1, // 只在这里写赋值，则后面枚举变量就是递增
  Unpaid,
  Shipping,
  Shipped,
  Complete
}
// 使用 OrderStatus.Start 代替原本的数字 1，代码具备可读性，免去注释

// 如果连第一个枚举变量的值都不写，则Start的值为0，后面枚举类型再依次递增
enum OrderStatus2 {
  Start, // Start = 0 一样效果
  Unpaid,
  Shipping,
  Shipped,
  Complete
}

// 不允许没有给出确定值的写法
/*
function hello<T>(arg: T): T {
  return arg
}
enum Example {
  A = hello(), // 只有数字枚举可具有计算成员，但此表达式的类型为“unknown”。
  B, // 枚举成员必须具有初始化表达式。
}
*/

// 字符串枚举
// 没有递增含义，所以必须手动初始化，必须都是字符串字面量
enum OrderStatus3 {
  Start = 'Start',
  Unpaid = 'Unpaid',
  Shipping = 'Shipping',
  Shipped = 'Shipped',
  Complete = 'Complete'
}
// 提升可读性，利于调试，更常用

// 数字枚举技巧——反向映射, 字符串枚举没有反向映射
enum Enum {
  A = 11
}
const a = Enum.A
const nameOfA = Enum[a]
console.log('a', a) // 11 - 从属性名获取值
console.log('nameOfA', nameOfA) // A - 从值获取属性名

/*
// 数字枚举反向映射原理
// 编译后js代码
(function (Enum) {
  Enum[Enum["A"] = 11] = "A"
})(Enum || (Enum = {}))
*/