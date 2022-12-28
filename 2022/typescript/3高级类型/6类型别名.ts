// 可以给类型或类型集合起一个新名字
// 使用type关键字描述类型变量
// 可减少文档编写量

{
  type Age = number
  type AgeCreator = () => Age
  function getAge(arg: AgeCreator): Age {
    return arg()
  }
}

{
  // 类型别名可以是泛型
  type Person<T> = {
    age: T
  }
}

{
  // 可使用类型别名在属性里引用自己
  type Person<T> = {
    name: T;
    mother: Person<T>;
    father: Person<T>;
  }
}