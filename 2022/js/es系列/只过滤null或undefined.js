const defaultValue = 100;
let value = someValue || defaultValue;
//当 someValue 转成 boolean 值为 false 时，value 的值都是 defaultValue
// 当 someValue 的值为 0 时 ，我们其实期望 value 值为 0, 但是它却被错误的分配成了 100.

// ?? 操作符可以规避以上问题，它只有在左操作数是 null 或者是 undefined 时，才会返回右侧操作数。
const defaultValue2 = 100;
let value2 = someValue ?? defaultValue; //someValue 为 0 ，value 的值是 0
