// 获取主入口文件
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, 'utf-8');
  // 将我们提供的代码解析成完整的ECMAScript代码的AST
  const ast = parser.parse(body, {
    sourceType: 'module' //表示我们要解析的是ES模块
  });
  // console.log(ast.program.body);
  /*
  [
    Node {
      type: 'ImportDeclaration',
      start: 0,
      end: 27,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      specifiers: [ [Node] ],
      source: Node {
        type: 'StringLiteral',
        start: 16,
        end: 26,
        loc: [SourceLocation],
        extra: [Object],
        value: './add.js'
      }
    },
    Node {
      type: 'ImportDeclaration',
      start: 28,
      end: 63,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      specifiers: [ [Node] ],
      source: Node {
        type: 'StringLiteral',
        start: 50,
        end: 62,
        loc: [SourceLocation],
        extra: [Object],
        value: './minus.js'
      }
    },
    Node {
      type: 'VariableDeclaration',
      start: 65,
      end: 87,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      declarations: [ [Node] ],
      kind: 'const'
    },
    Node {
      type: 'VariableDeclaration',
      start: 88,
      end: 117,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      declarations: [ [Node] ],
      kind: 'const'
    },
    Node {
      type: 'ExpressionStatement',
      start: 119,
      end: 136,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      expression: Node {
        type: 'CallExpression',
        start: 119,
        end: 135,
        loc: [SourceLocation],
        callee: [Node],
        arguments: [Array]
      }
    },
    Node {
      type: 'ExpressionStatement',
      start: 137,
      end: 159,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      expression: Node {
        type: 'CallExpression',
        start: 137,
        end: 158,
        loc: [SourceLocation],
        callee: [Node],
        arguments: [Array]
      }
    }
  ]
  */
  /*
  Node {
    type: 'File',
    start: 0,
    end: 160,
    loc: SourceLocation {
      start: Position { line: 1, column: 0, index: undefined },
      end: Position { line: 9, column: 0, index: undefined },
      filename: undefined,
      identifierName: undefined
    },
    errors: [],
    program: Node {
      type: 'Program',
      start: 0,
      end: 160,
      loc: SourceLocation {
        start: [Position],
        end: [Position],
        filename: undefined,
        identifierName: undefined
      },
      sourceType: 'module',
      interpreter: null,
      body: [ [Node], [Node], [Node], [Node], [Node], [Node] ],
      directives: []
    },
    comments: []
  }
  */

  // 将用import语句引入的文件路径收集起来。我们将收集起来的路径放到deps里。
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value); // 将file目录路径跟获得的value值拼接起来保存到deps里
      deps[node.source.value] = abspath; // value指的是什么意思呢？其实就是import的值, value指的就是import后面的 './add.js' 和 './minus.js'
    }
  });
  // console.log(deps);
  // { './add.js': './src/add.js', './minus.js': './src/minus.js' }

  // ES6转成ES5（AST） - 传入的AST转化成我们在第三个参数里配置的模块类型
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  // console.log(code); // 将我们写const 转化成var了
  /*
  "use strict";

  var _add = _interopRequireDefault(require("./add.js"));

  var _minus = require("./minus.js");

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var sum = (0, _add["default"])(1, 2);
  var division = (0, _minus.minus)(2, 1);
  console.log(sum);
  console.log(division);
  */

  // 包括该模块的路径（file），该模块的依赖（deps），该模块转化成es5的代码
  const moduleInfo = { file, deps, code };
  return moduleInfo;
};
// getModuleInfo('./src/index.js');

const parseModules = (file) => {
  const entry = getModuleInfo(file);
  const temp = [entry];
  // for (let i = 0; i < temp.length; i++) {
  //   const deps = temp[i].deps;
  //   if (deps) {
  //     for (const key in deps) {
  //       if (deps.hasOwnProperty(key)) {
  //         temp.push(getModuleInfo(deps[key])); // 遍历deps，通过调用getModuleInfo将获得的依赖模块信息push到temp数组里。
  //       }
  //     }
  //   }
  // }
  // console.log(temp);
  /*
  [
    {
      file: './src/index.js',
      deps: { './add.js': './src/add.js', './minus.js': './src/minus.js' },
      code: '"use strict";\n' +
        '\n' +
        'var _add = _interopRequireDefault(require("./add.js"));\n' +
        '\n' +
        'var _minus = require("./minus.js");\n' +
        '\n' +
        'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
        '\n' +
        'var sum = (0, _add["default"])(1, 2);\n' +
        'var division = (0, _minus.minus)(2, 1);\n' +
        'console.log(sum);\n' +
        'console.log(division);'
    },
    {
      file: './src/add.js',
      deps: {},
      code: '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports["default"] = void 0;\n' +
        '\n' +
        'var _default = function _default(a, b) {\n' +
        '  return a + b;\n' +
        '};\n' +
        '\n' +
        'exports["default"] = _default;'
    },
    {
      file: './src/minus.js',
      deps: {},
      code: '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports.minus = void 0;\n' +
        '\n' +
        'var minus = function minus(a, b) {\n' +
        '  return a - b;\n' +
        '};\n' +
        '\n' +
        'exports.minus = minus;'
    }
  ]
  */

  // temp数组里的对象格式不利于后面的操作，
  // 以文件的路径为key，{code，deps}为值的形式存储
  const depsGraph = {}; //新增代码
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]));
        }
      }
    }
  }
  // 新增代码
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    };
  });
  console.log(depsGraph);
  /*
  {
    './src/index.js': {
      deps: { './add.js': './src/add.js', './minus.js': './src/minus.js' },
      code: '"use strict";\n' +
        '\n' +
        'var _add = _interopRequireDefault(require("./add.js"));\n' +
        '\n' +
        'var _minus = require("./minus.js");\n' +
        '\n' +
        'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
        '\n' +
        'var sum = (0, _add["default"])(1, 2);\n' +
        'var division = (0, _minus.minus)(2, 1);\n' +
        'console.log(sum);\n' +
        'console.log(division);'
    },
    './src/add.js': {
      deps: {},
      code: '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports["default"] = void 0;\n' +
        '\n' +
        'var _default = function _default(a, b) {\n' +
        '  return a + b;\n' +
        '};\n' +
        '\n' +
        'exports["default"] = _default;'
    },
    './src/minus.js': {
      deps: {},
      code: '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports.minus = void 0;\n' +
        '\n' +
        'var minus = function minus(a, b) {\n' +
        '  return a - b;\n' +
        '};\n' +
        '\n' +
        'exports.minus = minus;'
    }
  }
  */
  return depsGraph;
};

// parseModules('./src/index.js');

// 现在的目的就是要生成一个bundle.js文件，也就是打包后的一个文件。
// 但是我们现在是不能执行index.js这段代码的，因为浏览器不会识别执行require和exports。
// 不能识别是为什么？不就是因为没有定义这require函数，和exports对象。那我们可以自己定义。
const bundle = (file) => {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) { // 转化成绝对路径
                return require(graph[file].deps[relPath])
            }
            var exports = {} // 增添了一个空对象 exports,执行add.js代码的时候，会往这个空对象上增加一些属性，
            (function (require,exports,code) {
                eval(code) // 执行eval（code）。也就是执行主模块的code这段代码
            })(absRequire,exports,graph[file].code) // 执行reuire函数的时候，又立即执行一个立即执行函数，这里是把code的值传进去了
            return exports
        }
        require('${file}') // 将主模块路径传入require函数执行
    })(${depsGraph})`; // 把保存下来的depsGraph，传入一个立即执行函数。
};
// 执行主文件code，遇到require后从depsGraph取
const content = bundle('./src/index.js');

console.log(content);

/*
// add.js
"use strict";
Object.defineProperty(exports, "__esModule", {  value: true});
exports["default"] = void 0;
var _default = function _default(a, b) {  return a + b;};
exports["default"] = _default;

exports = {
  __esModule：{  value: true}，
  default：function _default(a, b) {  return a + b;}
}

var _add = _interopRequireDefault(require("./add.js"));
可见，return出去的值，被_interopRequireDefault接收，_interopRequireDefault再返回default这个属性给_add，
因此_add = function _default(a, b) { return a + b;}
现在明白了，为什么ES6模块 引入的是一个对象引用了吧，因为exports就是一个对象。

*/
