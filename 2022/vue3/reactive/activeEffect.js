// 详细分析见 activeEffect.txt
/*
分三步：对象 - 属性 - 属性相关表达式
WeakMap存所有对象，存过就不再处理
Map存对象所有属性，存过就不再处理
Set存属性所有相关表达式，遇到effect就存
*/
const targetMap = new WeakMap();
let activeEffect = null; // 引入 activeEffect 变量

const effect = eff => {
  console.log('执行 effect 函数，将参数 eff 赋值给 activeEffect')
  console.log(`eff 就是一个函数： ${eff} ；`)
  activeEffect = eff; // 1. 将副作用赋值给 activeEffect
  console.log('执行 activeEffect');
  activeEffect();     // 2. 执行 activeEffect
  console.log('activeEffect执行完毕，重置 activeEffect');
  activeEffect = null;// 3. 重置 activeEffect
}

const track = (target, key) => {
  console.log(`执行 track 函数， 判断当前是否有 activeEffect: {${!!activeEffect}}`);
    if (activeEffect) {  // 1. 判断当前是否有 activeEffect
        let depsMap = targetMap.get(target);
      console.log(`有 activeEffect，从 WeakMap 类型的 targetMap对象获取key为 ${JSON.stringify(target)} 的Map值:${!!depsMap};`);
        if (!depsMap) {
          console.log('获取不到, 设置为新 Map 实例');
            targetMap.set(target, (depsMap = new Map()));
        } else {
          console.log(`Map 实例已存在，即之前收集过了`);
        }
        let dep = depsMap.get(key);
        console.log(`从Map值里获取key为 ${key} 的 Set 实例: ${!!dep};`);
        if (!dep) {
          console.log('获取不到, 设置为新 Set 实例');
            depsMap.set(key, (dep = new Set()));
        } else {
          console.log(`Set 实例已存在，即之前 ${key} 收集过了`);
        }
        dep.add(activeEffect);  // 2. 添加 activeEffect 依赖
        console.log(`添加 activeEffect 依赖到 Set 实例， 此时 ${key} 依赖个数：${dep.size}; `);
    }
}

const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
  console.log(`从类型为 WeakMap 的 targetMap 获取key为 ${JSON.stringify(target)} 的值，类型为Map: ${!!depsMap}`);
    if (!depsMap) return;
    let dep = depsMap.get(key);
    console.log(`Map值存在, 获取key为 ${key} 的Set实例值: ${!!dep}`);
    if (dep) {
      console.log(`Set值存在, 遍历并一一调用， depLen: ${dep.size}`);
        dep.forEach(effect => effect());
    }
};

const reactive = (target) => {
    const handler = {
        get(target, key, receiver) {
          console.log(`执行 reactive 函数 get 方法，key为 ${key};`)
            const result = Reflect.get(target, key, receiver);
            console.log('执行 reactive 函数 get 方法里面 track')
            track(target, key);
            return result;
        },
        set(target, key, value, receiver) {
            const oldValue = target[key];
            console.log(`执行 reactive 函数 set 方法，key为 ${key};`)
            const result = Reflect.set(target, key, value, receiver);
            if (oldValue != result) {
              console.log('执行 reactive 函数 set 方法里面 trigger')
                trigger(target, key);
            }
            return result;
        }
    }

    return new Proxy(target, handler);
}
console.log('执行 reactive 函数，将包含price 和 quantity 属性的对象变成响应式数据');
let product = reactive({ price: 10, quantity: 2 });
let total = 0, salePrice = 0;
console.log('执行 effect 函数');
effect(() => {
  console.log('获取 price 和 quantity 属性后赋值给 total');
    total = product.price * product.quantity
});
console.log('打印 total：', total); // 20
console.log('赋值 quantity')
product.quantity = 5;
console.log('打印 total：', total); // 50
console.log('赋值 price')
product.price = 20;
console.log('打印 total：', total); // 100

console.log('执行另一个effetc！！！');
effect(() => {
  console.log('触发price属性，收集依赖？');
    salePrice = product.price * 0.9
});
console.log(total, salePrice);  // 20 9
product.quantity = 5;
console.log(total, salePrice);  // 50 9
product.price = 20;
console.log(total, salePrice);  // 100 18