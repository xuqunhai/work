// 标准用法的 import 导入的模块是静态的，会使所有被导入的模块，在加载时就被编译（无法做到按需编译，降低首页加载速度）。
// 可能希望根据条件导入模块或者按需导入模块，这时你可以使用动态导入代替静态导入。
// 在 import() 之前，当我们需要根据条件导入模块时，不得不使用 require()。
if (XXX) {
  const menu = require('./menu');
}
// 如今可以替换为:
if (XXX) {
  const menu = import('./menu');
}

// @babel/preset-env 已经包含了 @babel/plugin-syntax-dynamic-import，因此如果要使用 import() 语法，只需要配置 @babel/preset-env 即可。
// 提示： 请不要滥用动态导入（只有在必要情况下采用）
// 静态框架能更好的初始化依赖，而且更有利于静态分析工具和 tree shaking 发挥作用。

// 另外，import() 返回的是一个 promise 对象。例如：
//menu.js
export default {
  menu: 'menu'
};

//index.js
if (true) {
  let menu = import('./menu');
  console.log(menu); //Promise {<pending>
  menu.then((data) => console.log(data)); //Module {default: {menu: "menu"}, __esModule: true, Symbol(Symbol.toStringTag): "Module"}
} else {
}
