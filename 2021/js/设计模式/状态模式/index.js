class State {
  // 状态
  constructor(color) {
    this.color = color;
  }
  handle(ctx) {
    // 状态切换
    console.log(`turn to ${this.color} light`);
    ctx.setState(this);
  }
}

class Context {
  // 主体
  constructor() {
    this.state = null;
  }
  getState() {
    // 状态获取
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

let ctx = new Context();
let red = new State('red');

red.handle(ctx);
console.log(ctx.getState());
