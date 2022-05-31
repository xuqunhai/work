class Circle {
  draw() {}
}

class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  draw() {
    this.circle.draw();
    this.setRedBorder(this.circle);
  }
  setRedBorder(circle) {}
}

let circle = new Circle();
let dec = new Decorator(circle);
dec.draw();
