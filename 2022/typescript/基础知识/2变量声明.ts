let myName = `raferxu`
const age = 32

// 初始化阶段已经声明该变量类型，中途更改，触发ts编译时报错
// myName = 1 // 不能将类型“number”分配给类型“string”。ts(2322)

/*
有时比ts更了解这个值的类型，
通过类型断言，明确告知编译器，究竟要干什么
*/
// 类型断言两种形式
// 尖括号
let string1: any = "this is a string"
let string1Length: number = (<string>string1).length
// 使用关键字as
let string2: any = "this is a string"
let string2Length: number = (string2 as string).length
// ts中JSX类型断言只能使用as，因为尖括号在JSX中已经用于表达泛型