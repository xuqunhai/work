const visitor = {
    // 当遍历到 CallExpression 时候触发
    CallExpression(path) {
      const callee = path.node.callee;
      // 判断当前当前执行的函数是否是组合表达式
      if (types.isMemberExpression(callee)) {
        const { object, property } = callee;
        if (types.isIdentifier(object, { name: 'console' }) && types.isIdentifier(property, { name: 'log' })) {
          // 查找最接近的父函数或程序
          const parent = path.getFunctionParent();
          const parentFunName = parent.node.id.name;
          path.node.arguments.unshift(types.stringLiteral(`from function ${parentFunName}`))
        }
      }
    }
  }
  
  /*
  function funA() {
	console.log(1)
}

// 转换成

function funA() {
	console.log('from function funA:', 1)
}
  */

// https://astexplorer.net/
// https://juejin.cn/post/6983842832680812574
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
