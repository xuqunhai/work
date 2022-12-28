// 函数类型包括：参数类型和返回值类型
function add1(x: number, y: number): number {
  return x + y
}

const add2 = (x: number, y: number): number => x + y

let add3: (x: number, y: number) => number
// function add4(x: number, y: number): number // 函数实现缺失或未立即出现在声明之后。
{
  // 可选参数
  // ts函数强调参数必须一一对应
  function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName
  }
  let name1 = buildName('rafer', 'xu')
  // let name2 = buildName('rafer') // 应有 2 个参数，但获得 1 个。
  // let name3 = buildName('hai', 'xu', 'qun') // 应有 2 个参数，但获得 3 个。

  // 可选参数必须在必要参数后面
  // 如果想让firstName可选，那么要把firstName放在最后面
  function buildName2(firstName: string, lastName?: string) {
    if (lastName) {
      return firstName + " " + lastName
    } else {
      return firstName
    }
  }
  let name2 = buildName2('rafer')
}

// 默认参数
{
  function buildName3(firstName = 'rafer', lastName: string) { }
  // buildName3(, 'rafer') // 应为参数表达式。
  // buildName3(null, 'rafer') // 类型“null”的参数不能赋给类型“string | undefined”的参数。
  buildName3(undefined, 'rafer')
}

// 剩余参数
{
  function buildName4(firstName: string, ...names: string[]) { }
  buildName4('rafer')
  buildName4('rafer', 'xu', 'qunhai')

  let buildNameFun: (firstName: string, ...names: string[]) => string
}