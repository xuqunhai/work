// 为什么要调用super(props)方法,因为 Es6 采用的是先创建父类实例的 this,然后在用子类的构造函数修改 this
// super这个关键字, 它不仅仅是一个关键字，还可以作为函数和对象

// 当super 作为函数调用时, 它代表的指向的是父类的构造函数
class B extends A {
  // class关键字声明了B继承自A类
  constructor() {
    // constructor构造器函数
    super(); // 调用super(),super虽然代表了父类 A 的构造函数,会执行 A 的constructor,但是此时的this指向的是 B
  }
  // 作为函数调用:它必须只能在子类的构造器函数(constructor)中进行调用的,如果放在其他地方,则是会报错的
  fun() {
    super(); // 报错,super()不能放置在函数内调用
  }
}

// super 作为对象使用
// super作为对象使用时，分为在普通方法中使用和在静态方法中使用
class Animal {
  // class关键字声明了一个Animal类
  constructor() {
    this.name = '父类上的实例上的属性'; // 定义在父类实例上属性
    this.age = 40;
  }
  print() {
    console.log(this.age);
  }
  // 原型上的方法
  parent() {
    // 类Animal的一个方法
    console.log('我是父类Animal的普通方法... ...');
  }
}
Animal.prototype.desc = 'super实例上的属性';

class Dog extends Animal {
  // class关键字定义了Dog继承自Animal类
  constructor() {
    super();
    this.age = 20;
    this.name = 'itclan'; // 子类B的私有属性
    super.name = '川川'; // 等同于对this.name赋值为川川
    console.log(super.name); // 读的是A.prototype.name，所以返回undefined,super是父类,而name是父类的私有属性,无法直接访问
    console.log(this.name); // 川川
  }
  getAge() {
    // super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类 B 的实例 导致输出的是 20
    // 这个特性很有用,可以用于重写(覆盖)父类的私有属性
    super.print();
  }
  watchHome() {
    // super在普通方法之中, 指向Animal.prototype
    // 子类watchHome为Dog的方法
    super.parent(); // 我是父类的普通方法
    // 等价于Animal.prototype.parent() // // 我是父类的普通方法
  }
  watchHome2() {
    // 在子类普通方法中, 通过 super 调用父类的方法时, 方法内部的 this 指向当前子类的实例
    return super.name; // 定义在父类实例上的属性, 无法通过super调用
  }
  watchHome3() {
    return super.desc; // super实例上的属性,可以拿到父类中原型下的desc属性,定义在原型下的属性和方法都是公有的
  }
}

// 如果 super作为对象,用在静态方法之中,这时super将指向父类 , 而不是父类的原型对象
class Parent {
  static myMethod(msg) {
    // 父类的方法之前加静态static关键字
    console.log('static1', msg);
  }

  myMethod(msg) {
    // 父类的私有普通方法
    console.log('instance2', msg);
  }
}

class Child extends Parent {
  // 类child继承自篇Parent
  static myMethod(msg) {
    // 子类的私有myMethod方法前声明static
    // 子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类而不是子类的实例
    super.myMethod(msg); // super在静态方法中指向父类, 而不是父类的原型
  }

  myMethod(msg) {
    super.myMethod(msg); // super在普通方法中指向父类的原型
  }
}

Child.myMethod(1); // static1 1

var child = new Child();
child.myMethod(2); // instance2 2

// 当使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
// console.log(super); // 报错
// console.log(super)当中的super，是无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。
