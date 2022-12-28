// 索引类型——检查使用了动态属性名的代码
{
  function pluck0(obj, names) {
    return names.map(name => obj[name])
  }
}

{
  function pluck1<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
    return names.map(name => obj[name])
  }
  interface Person {
    name: string,
    age: number
  }

  const person: Person = {
    name: '111',
    age: 35
  }
  pluck1(person, ['name'])
  // pluck1(person, ['profession']) // 不能将类型“"profession"”分配给类型“keyof Person”。
}

{
  //类型映射：从旧类型中创建新类型
  // 令每个属性成为只读或可选类型
  interface Person {
    name: string,
    age: number
  }
  // 属性可选
  interface Person2 {
    name?: string,
    age?: number
  }
  // 只读
  interface Person3 {
    readonly name: string,
    readonly age: number
  }

  type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }

  type PersonPartial = Partial<Person>
  type ReadonlyPerson = Readonly<Person>

  // Readony Partial已经内置在ts里，还有其他：Required、Pick、Record、Exclude、Extract、NonNullable
}