const jsError = {
  title: '页面标题',
  url: '页面url',
  timestamp: '访问时间戳',
  userAgent: '用户浏览器',
  kind: 'stability', // 大类
  type: 'error', // 小类
  errorType: 'jsError',
  message: 'Uncaught TypeError: Cannot set property error of undefined', // 类型详情
  filename: '',
  postion: '0:0', // 行列信息
  stack: '堆栈信息',
  selector: '选择器'
};

const promiseError = {
  // ...
  errorType: 'promiseError'
};
