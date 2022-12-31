// 配置 jest 的测试行为
module.exports = {
  transform: {
    // .vue文件用 vue-jest 处理
    '^.+\\.vue$': 'vue-jest',
    // .js或者.jsx用 babel-jest处理
    '^.+\\.jsx?$': 'babel-jest',
    //.ts文件用ts-jest处理
    '^.+\\.ts$': 'ts-jest'
  },
  // 匹配文件名是 xx.spect.js。这里请注意，Jest 只会执行.spec.js 结尾的文件。
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  collectCoverage: true, // 收集代码测试覆盖率
  coverageReporters: ['json', 'html']
}
