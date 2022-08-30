// WeakMap是 ES6 中新增的一种集合类型，叫做“弱映射”。它和Map是兄弟关系，
// 与Map的区别就在于这个弱字，API 还是Map的那套（只有set get has delete)

// 为什么要有 WeakMap 呢？它解决了什么问题呢？

// 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
// WeakMap 的键名引用的对象是弱引用
{
  const e1 = document.getElementById('.e1')
  const e2 = document.getElementById('.e2')
  const arr = [
    [e1, 'e1'],
    [e2, 'e2']
  ]
  // arr对e1和e2的引用，而这种引用又是强引用。
  // 它的区别就体现在。当我们不再需要这两个对象时，我们必须手动的删除这个引用，解除arr都两个对象的引用关系，
  // 否则垃圾回收机制不会释放e1和e2占用的内存。因为，arr仍然存在着对对象的引用！
  arr[0] = null // 当忘记了手动删除引用，就会造成内存泄漏
  arr[1] = null
}
// 什么是弱引用？
// 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
{
  const myMap = new WeakMap()
  let my = {
      name: "ljc",
      sex: "男"
  }
  myMap.set(my, 'info');
  console.log(myMap);
  // 当执行my = null时会解除my对原数据的引用，
  // 而myMap实例对象对my所引用对象是弱引用关系，该数据的引用计数为 0 ，程序垃圾回收机制在执行时会将引用对象回收。
}
{
  // 而如果时强引用关系则引用计数为 1 ，不会被垃圾回收机制清除。
  const myMap = new Map() // 强引用
  let my = {
      name: "ljc",
      sex: "男"
  }
  myMap.set(my, 'info');
  console.log(myMap);
}

// Map 和 WeakMap 的区别
// Map 的键可以是任意类型，WeakMap 只接受对象作为键（null除外），不接受其他类型的值作为键
// Map 的键强引用,实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； WeakMap 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
// Map 可以被遍历，基本方法：set、get、has、delete；遍历方法：keys、values、entries、forEach；其他方法：size、clear。
// WeakMap 不能被遍历, 无法获取长度，基本方法：set、get、has、delete。
// WeakMap内部成员是会取决于垃圾回收机制有没有执行，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是不可预测的，因此不可遍历

// WeakMap 的使用场景
// 1. DOM 节点元数据
{
  // const m = new Map() //  Map 对节点对象是强引用关系，仍然保存着对按钮的引用，所以会引起内存泄漏
  const m = new WeakMap() // 代码执行后，登录按钮从DOM树中被删除了，引用计数为0，等待垃圾回收机制回收
  const loginBtn=document.getElementById('#login')
  m.set(loginBtn, {disabled: true})
}
// 2. 部署私有属性 https://juejin.cn/post/6993101968545677319#heading-15
// 3. 数据缓存
{
  // 当我们需要在不修改原有对象的情况下储存某些属性等，而又不想管理这些数据时，可以使用WeakMap
}

// WeakMap应用场景
//   WeakMap因为键必须为对象，且在回收机制上的优越性，其可以用在以下两个场景：    
//   1. 对特定DOM节点添加状态时。当DOM节点被删除，将DOM节点作为“键”的WeakMap也会自动被回收。
//   2. 对类或构造函数中私有属性绑定定义。当实例被删除，被作为“键”的this消失，WeakMap自动回收。
{
  let element = document.getElementById('box')
  let wMap = new WeakMap()
  wMap.set(element, {clickCount: 0})
  element.addEventListener('click', () => {
    let countObj = wMap.get(element)
    countObj.clickCount++

    console.log(wMap.get(element).clickCount) // click -> n+=1
  })
}
{
  const _age = new WeakMap()
  const _fn = new WeakMap()
  class Girl {
    constructor (age, fn) {
      _age.set(this, age)
      _fn.set(this, fn)
    }
    changeAge () {
      let age = _age.get(this)
      age = age >= 18 ? 18 : null
      _age.set(this, age)

      _age.get(this) === 18
      ? _fn.get(this)()
      : console.log('error')
    }
  }

  const girl = new Girl(25, () => console.log('forever 18 !'))
  girl.changeAge() // forever 18 !
}