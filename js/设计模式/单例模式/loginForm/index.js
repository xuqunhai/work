class LoginForm {
  constructor() {
    this.state = 'hide';
  }
  show() {
    if ((this.state = 'show')) return;
    this.state = 'show';
  }
  hide() {
    if (this.state === 'hide') return;
    this.state = 'hide';
  }
}

LoginForm.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();
