const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");
const fs = require("fs");


function compile(code) {
  // 1.parse
  const ast = parser.parse(code);

  // 2,traverse
  const visitor = {
    //this表达式
    ThisExpression(path) {
      //构建var _this = this
      let node = t.VariableDeclaration(
        'var',
        [
          t.VariableDeclarator(
            t.Identifier('_this'),
            t.Identifier('this')
          )
        ]
      ),
        //构建 _this标识符
        str = t.Identifier('_this'),
        //查找变量声明的父节点
        //这里只是针对例子的，真正转换需要考虑的情况很多
        parentPath = path.findParent((path) => path.isVariableDeclaration())
      //满足条件
      if (parentPath) {
        //插入
        parentPath.insertBefore(node)
        path.replaceWith(
          str
        )
      } else {
        return
      }
    },
    //处理箭头函数。
    ArrowFunctionExpression(path) {
      var node = path.node
      //构造一个t.FunctionExpression节点，将原有path替换掉即可
      path.replaceWith(t.FunctionExpression(
        node.id,
        node.params,
        node.body
      ))
    }
  };
  traverse.default(ast, visitor);

  // 3. generator
  return generator.default(ast, {}, code);
}

const code = `
var func = ()=>{
  console.log(this.b)
};
`;
console.log(compile(code).code);


/*
如下代码：
var func = ()=>{
    console.log(this.b)
}; 
目的是将箭头函数转换成普通函数声明(这里仅仅是具体这种格式的转化
要转换的只是ArrowFunctionExpression即箭头函数和this表达式ThisExpression部分
那么我们的visitor里的函数名称就包括ArrowFunctionExpression和ThisExpression了。

//visitor里面方法的key就对应我们要处理的node  type
const visitor = {
    //处理this表达式  
    ThisExpression(path){
        //将this转换成_this的形式
    },
    //处理箭头函数。
    ArrowFunctionExpression(path){
       //转换成普通的FunctionExpression
    }
}  

经过对比，确定我们的操作应该是将ArrowFunctionExpression替换为FunctionExpression，
遇到有this表达式的，绑定一下this，并将其转换。

replaceWith(targetObj) 替换
findParent() 查找满足条件的父节点
insertBefore 插入兄弟节点

*/