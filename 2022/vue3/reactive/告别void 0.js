// undefined不是保留的关键字。相反，undefined只是全局对象window上的一个属性
// void 0操作，执行结束之后会返回一个undefined这个原始值。

// undefined 它是 window 对象的一个全局属性，那么我们可以局部也起一个也叫 undefined 的变量给它赋值
// 在这个作用域下找到的所有 undefined 都是那个新的值
function test(value) {
  let undefined = "hello world";
  if (value === undefined) {
    return `value is undefined`;
  }
  return `value is not undefined`;
}
let value;
test(value);  // 'value is not undefined'

// 在ES5之前，全局对象window上的undefined属性是可以被修改的，因为可以被修改，就很容易造成一些不可以预知的问题

// 在现代浏览器和JS引擎中，是没有必要继续使用void 0的：
// 在ES5中，明确表示全局对象window上的undefined属性是一个只读属性，它不能被修改。
// 在ES5语法之后，全局对象上undefined不可以被任意修改的
// 虽然，undefined作为一个全局属性不能被修改了，但是在JS标准中，它仍然不是一个关键字。所以，当undefined作为一个本地变量时，任然是可以被修改的。
// 将undefined作为一个本地变量是不规范的，所以，这个是你需要避免的写法。
// 在在eslint中，是不允许将undefined作为一个变量名的