class Product {
  constructor(name) {
    this.name = name;
  }
  init() {}
  fun1() {}
  fun2() {}
}

class Creator {
  create(name) {
    // 将new操作单独封装
    return new Product(name);
  }
}

let creator = new Creator();
let p = creator.create('p1');
p.init();
p.fun1();
