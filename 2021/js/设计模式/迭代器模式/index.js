class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++];
    }
    return null;
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false;
    }
    return true;
  }
}

class Container {
  constructor(list) {
    this.list = list;
  }
  getInterator() {
    return new Iterator(this);
  }
}

let container = new Container([1, 2, 3]);
let iterator = container.getInterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
