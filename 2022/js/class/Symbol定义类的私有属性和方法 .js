// a.js
// Symbol常量pwd被定义在a.js所在的模块中，外面的模块获取不到这个Symbol，也不可能再创建一个一模一样的Symbol出来（因为Symbol是唯一的），
// 因此这个pwd的Symbol只能被限制在a.js内部使用，所以使用它来定义的类属性是没有办法被模块外访问到的，达到了一个私有化的效果
const pwd = Symbol();

class Login {
  constructor(username, pwd) {
    this.username = username;
    this[pwd] = pwd;
  }

  checkPassword(pwd) {
    return this[pwd] === pwd;
  }
}

export default Login;
// ------------------------------------------------------------
import Login from './a';

const login = new Login('admin1', '111111');

login.checkPassword('123456'); // true

login.pwd; // oh!no!
login[pwd]; // oh!no!
login['pwd']; // oh!no!
