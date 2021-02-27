function show(content) {
  window.document.getElementById('app').innerText = 'Hello test1234567 hot, ' + content;
}
class Point {
  constructor(x, y) {    //constructor 构造方法
      this.x = x;
      this.y = y;
  }

  toString() {
      return '(' + this.x + ', ' + this.y + ')';
  }
}

var p = new Point(1, 2);
module.exports = show;