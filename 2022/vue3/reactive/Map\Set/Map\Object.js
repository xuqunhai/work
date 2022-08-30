可以说Object结构提供键-值对应，Map结构提供值-值对应因此其实采用map结构会优于传统对象
Map应用场景
对于经典算法问题中 上楼梯问题：共n层楼梯，一次仅能跨1或2步，总共有多少种走法？
这一类问题都有一个递归过程中内存溢出的bug存在，此时就可以运用Map减少递归过程中重复运算的部分，解决内存溢出的问题。
{
  let n = 100
  let map = new Map()
  function upStairs (n) {
    if (n === 1) return 1
    if (n === 2) return 2
    if (map.has(n)) return map.get(n)
    let ret = upStairs(n - 1) + upStairs(n - 2)
    map.set(n, ret)
    return ret
  }
  console.log(upStairs(n)) // 573147844013817200000
}

4. 什么时候用 Map
要添加的键值名和 Object 上的默认键值名冲突，又不想改名时，用 Map
需要 String 和 Symbol 以外的数据类型做键值时，用 Map
键值对很多，有需要计算数量时，用 Map
需要频繁增删键值对时，用 Map

不过 Map 和 Object 有一些重要的区别，在下列情况中使用 Map 会是更好的选择：
Map 默认情况下不包含任何键，所有键都是自己添加进去的。不同于 Object 原型链上有一些默认的键。
Map 的键可以是任意类型数据，就连函数都可以。

Map	Object
意外的键
Map 默认情况不包含任何键。只包含显式插入的键。	
一个 Object 有一个原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
备注：虽然从 ES5 开始可以用 Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

键的类型
一个 Map 的键可以是任意值，包括函数、对象或任意基本类型。	一个 Object 的键必须是一个 String 或是 Symbol。

键的顺序	
Map 中的键是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值。
虽然 Object 的键目前是有序的，但并不总是这样，而且这个顺序是复杂的。因此，最好不要依赖属性的顺序。
自 ECMAScript 2015 规范以来，对象的属性被定义为是有序的；ECMAScript 2020 则额外定义了继承属性的顺序。
参见 OrdinaryOwnPropertyKeys 和 EnumerateObjectProperties 抽象规范说明。
但是，请注意没有可以迭代对象所有属性的机制，每一种机制只包含了属性的不同子集。
（for-in 仅包含了以字符串为键的属性；Object.keys 仅包含了对象自身的、可枚举的、以字符串为键的属性；
Object.getOwnPropertyNames 包含了所有以字符串为键的属性，即使是不可枚举的；
Object.getOwnPropertySymbols 与前者类似，但其包含的是以 Symbol 为键的属性，等等。）

Size
Map 的键值对个数可以轻易地通过 size 属性获取。	Object 的键值对个数只能手动计算.

迭代
Map 是 可迭代的 的，所以可以直接被迭代。	
Object 没有实现 迭代协议，所以使用 JavaSctipt 的 for...of 表达式并不能直接迭代对象。
备注：
对象可以实现迭代协议，或者你可以使用 Object.keys 或 Object.entries。
for...in 表达式允许你迭代一个对象的可枚举属性。

性能	
在频繁增删键值对的场景下表现更好。
在频繁添加和删除键值对的场景下未作出优化。

序列化和解析	
没有元素的序列化和解析的支持。
（但是你可以使用携带 replacer 参数的 JSON.stringify() 创建一个自己的对 Map 的序列化和解析支持。参见 Stack Overflow 上的提问：How do you JSON.stringify an ES6 Map?）
原生的由 Object 到 JSON 的序列化支持，使用 JSON.stringify()。
原生的由 JSON 到 Object 的解析支持，使用 JSON.parse()。


{
  const data = {};
  // element 为节点对象
  const element = document.querySelector("#app");
  console.log(element); // 输出 div.node 对象
  // 将对象转化成字符串输出 [object HTMLDivElement]
  console.log(element.toString()); // [object HTMLDivElement]
  // 用点操作符不能有空格，所以采用中括号的形式给对象赋值
  data[element] = 'objectData'
  // 输出 objectData，说明在对象中存在[object HTMLDivElement]键名
  console.log(data['[object HTMLDivElement]']); // objectData
}
{
    // 1. 通过new Map来创建dataMap容器
  const dataMap = new Map();
  // 2. 获取节点对象，作为测试数据
  const element = document.querySelector("#app");
  // 3. 通过 set 方法给 dataMap 中指定键和对应的值
  dataMap.set(element,'objectData');
  // 4. 通过 get 来从 dataMap 中获取键名对应的值
  console.log(dataMap.get(element)); // objectData
  // 5. 揭开面目
  console.log(dataMap); // Map(1) {div#app => 'objectData'}
}

{
  const dataMap = new Map();
  dataMap.clear() // 清除所有成员，没有返回值
}

// Map自身方法介绍
//   含增删改查方法：set、get、has、delete；
//   遍历方法：keys、values、entries、forEach；
//   其他方法：size、clear。
//   需要注意的是forEach方法还可以接受第二个参数，改变第一个参数即回调函数的内部this指向。
{
  const map = new Map([ ['name','rx'] ])
  const testObj = {
    objName: 'objName'
  }
  map.forEach(function (value, key) {
    console.log(key, value, this.objName) // name rx objName
  }, testObj)
}

// Map 类型转化
{
  // Map 转为数组
  // 通过扩展运算符实现
  let map = new Map()
  let arr = [...map]
}
{
  // 数组转为 Map
  let map = new Map(arr)
}
{
  // Map 转为对象
  // 通过遍历利用set将键值对加入对象中
  let obj = {}
  for (let [k, v] of map) {
    obj[k] = v
  }
}
{
  // 对象转为 Map
  function objToMap (object) {
    let map = new Map()
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        map.set(key, object[key])
      }
    }
    return map
  }
  var testObj = {
    'name': 'currName',
    'nums': [1, [2, 3]],
    'objs': {
      'innerObj': 'content'
    }
  }
  let map = objToMap(testObj)
  map.set('name', 'changedName')
  console.log(testObj) // { name: 'currName',
                      //   nums: [ 1, [ 2, 3 ] ],
                      //   objs: { innerObj: 'content' } }
  console.log(map) // Map {
                  // 'name' => 'changedName',
                  // 'nums' => [ 1, [ 2, 3 ] ],
                  // 'objs' => { innerObj: 'content' } }
}

{
    var a=NaN
    var b=NaN
    console.log(a===b) // false
    console.log(Object.is(a,b)) // true
}