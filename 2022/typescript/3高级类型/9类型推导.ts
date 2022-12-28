// ts通过结果反向推测——发生在变量初始化或函数有返回值时
// 类型推导作用——能动态获取类型，建设手动标注类型的工作量

// 需要匹配参数推测类型
let a = [0, 'hello', null] // (string | number)[]

// ts类型兼容性是基于结构子类型的
{
  interface Person {
    age: number;
  }
  class Father {
    age: number
  }
  let person: Person;
  person = new Father()
  // 只要满足子结构描述，就可以通过编译时检查
  // 会造成运行时和编译时可能存在类型偏差
}

{
  // 所以允许某些在编译时无法进行安全确认的类型操作
  // 只会检查是否符合Person类型标准，比较过程是递归进行的，检查每个成员及子成员
  interface Person {
    name: string;
  }
  let person: Person;
  const alice = { name: 'Alice', age: 22 }
  person = alice;
}

{
  //在判断两个函数返回值是否相同的，ts比对的是函数签名
  let fun1 = (a: number) => 0
  let fun2 = (b: number, s: string) => 0
  fun2 = fun1 // 首先比较参数列表类型：fun1每个参数类型都能在fun2里找到，所以允许赋值
  // fun1 = fun2 // 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。
}

// 更复杂例子
{
  // infer关键字会引入一个待推断的类型变量，该变量在推断成立时会写入类型，失败时会回退为any
  type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

  let fun1 = (a: number) => ({ a, b: 'hello' });
  // type Fun1ReturnType = ReturnType<fun1> // “fun1”表示值，但在此处用作类型。是否指“类型 fun1”?
  type Fun1ReturnType = ReturnType<typeof fun1>
  // type Fun1ReturnType = {
  //   a: number;
  //   b: string;
}
