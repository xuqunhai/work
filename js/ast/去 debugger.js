const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");

// 源代码
const code = `
function fn() {
  console.log('debugger')
  debugger;
}
`;

// 1. 源代码解析成 ast
const ast = parser.parse(code);


// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  DebuggerStatement(path) {
    // 删除该抽象语法树节点
    path.remove();
  }
}
traverse.default(ast, visitor);

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code)

// 4. 日志输出

// function fn() {
//   console.log('debugger');
// }

