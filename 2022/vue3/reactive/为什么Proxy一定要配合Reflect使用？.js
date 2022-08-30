// Proxy 中 get 陷阱中还会存在一个额外的参数 receiver 。
// Proxy 中接受的 Receiver 形参表示代理对象本身或者继承与代理对象的对象。
// Reflect 中传递的 Receiver 实参表示修改执行原始操作时的 this 指向。
{
  const obj = {
    name: 'wang.haoyu',
  };

  const proxy = new Proxy(obj, {
    // get陷阱中target表示原对象 key表示访问的属性名
    get(target, key, receiver) {
      console.log(receiver === proxy); // true 表示这里 receiver 的确是和代理对象相等的。
      return target[key];
    },
  });

  proxy.name;
}
// -----------------
{
  const parent = {
    get value() {
      return '19Qingfeng';
    },
  };

  const proxy = new Proxy(parent, {
    // get陷阱中target表示原对象 key表示访问的属性名
    get(target, key, receiver) {
      console.log(receiver === proxy); // false
      console.log(receiver === obj); // true; receiver 代表的是继承与 Proxy 的对象，也就是 obj
      return target[key];
    },
  });

  const obj = {
    name: 'wang.haoyu',
  };

  // 设置obj继承与parent的代理对象proxy
  Object.setPrototypeOf(obj, proxy);

  obj.value
}
// -----------------
{
  const parent = {
    get value() {
      return '19Qingfeng';
    },
  };

  const handler = {
    get(target, key, receiver) {
      console.log(this === handler); // log: true
      console.log(receiver === obj); // log: true
      return target[key];
    },
  };

  const proxy = new Proxy(parent, handler);

  const obj = {
    name: 'wang.haoyu',
  };

  // 设置obj继承与parent的代理对象proxy
  Object.setPrototypeOf(obj, proxy);

  // log: false
  obj.value
}
// -----------------
{
  const parent = {
    name: '19Qingfeng',
    get value() { // 它继承的 proxy 对象中存在 value 的属性访问操作符，所以会发生屏蔽效果。触发 proxy 上的 get value() 属性访问操作
      return this.name;
    },
  };

  const handler = {
    get(target, key, receiver) { // target 为源对象也就是 parent ，key 为 value 。
      return Reflect.get(target, key);
      // Proxy 中 get 陷阱的 receiver 不仅仅会表示代理对象本身同时也还有可能表示继承于代理对象的对象，
      // 这里显然它是指向继承与代理对象的 obj 
      // return Reflect.get(target, key, receiver);
      // 在 Reflect 中 get 陷阱中第三个参数传递了 Proxy 中的 receiver 也就是 obj 作为形参，它会修改调用时的 this 指向。
      // 理解成为 target[key].call(receiver)
    },
  };

  const proxy = new Proxy(parent, handler);

  const obj = {
    name: 'wang.haoyu',
    // 当我们调用 obj.value 时，由于 obj 本身不存在 value 属性。
  };

  // 设置obj继承与parent的代理对象proxy
  Object.setPrototypeOf(obj, proxy);

  // log: 19Qingfeng
  console.log(obj.value);
}
// -----------------