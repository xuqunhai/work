// Set可以将具有Iterable接口的其他数据结构作为参数用于初始化

// 自身方法
// 含增删查方法：add、has、delete；
// 遍历方法：keys、values、entries、forEach；
// 其他方法：size、clear。

// Set 转 Array
// 利用set=[...set] 和 set=Array.from([set])将它转成数组

// Set应用场景
{
  let a = new Set([1, 2, 3])
  let b = new Set([2, 3, 4])

  // 并集
  let union = new Set([...a, ...b])
  console.log(union) // Set { 1, 2, 3, 4 }
  // 交集
  let intersect = new Set([...a].filter(x => b.has(x)))
  console.log(intersect) // Set { 2, 3 }
  // 差集
  let difference = new Set([...[...a].filter(x => !b.has(x)), ...[...b].filter(x => !a.has(x))])
  console.log(difference) // Set { 1, 4 }

  // 赋新值
  let aDouble = new Set([...a].map(x => x * 2))
  console.log(aDouble) // Set { 2, 4, 6 }
}


// 数组中map方法及遍历相关方法
/*
Array.map()、
Array.flatMap() 为 Array.map()与Array.flat()方法的叠加
数组展开嵌套的方法Array.flat()，其中可以有一个参数表示展开层数，默认只展开一层。

arr.reduce((pre, next) => {}, initValue)
Array.filter()、
Array.find()、返回数组内满足条件的第一个值,当查找的是数组中不可重复的值时，建议使用find方法，会比filter更优越。
Array.findIndex(),返回数组内满足条件的第一个值在数组中的index
Array.includes() 判断数组中是否含有某个值,对于数组中NaN值，includes可以识别到NaN
const arr = [1, 2, 3, NaN]
console.log(arr.includes(NaN)) // true

Array.every()、Array.some()

*/