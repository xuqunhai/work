// WeakSet与Set之间不同之处，依然是：
// 1. WeakSet内的值只能为对象；
// 2. WeakSet依旧是弱引用。

// 因为弱引用的关系，WeakSet只有简单的增删查方法：add、delete、has
// 弱引用也会被垃圾回收，但具体回收时间是不确定的，所以他没有size

// WeakSet应用场景
// 存放DOM节点，避免删除这些节点后引发的内存泄漏的情况；
{
  let wSet = new WeakSet()
  wSet.add(document.getElementById('box'))
}
// 在构造函数和类中存放实例this，同样避免删除实例的时候产生的内存泄漏的情况
{
  const _boy = new WeakSet()
  class Boy {
    constructor () {
      _boy.add(this)
    }
    method () {
      if (!_boy.has(this)) {
        throw new TypeError('Boy.prototype.method 只能在Boy的实例上调用！')
      }
    }
  }
}