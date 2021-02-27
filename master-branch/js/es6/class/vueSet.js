function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (!isUndef(target) || isPrimitive(target))) {
    warn('不能在undefined null或原始类型上设置响应式属性')
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 假设该属性已经在对象上有定义了，那么只需要直接设置该属性的值即可，这将自动触发响应，因为已存在的属性是响应式的
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = target.__ob__
  // 为 Vue 实例对象添加属性 / 为根数据对象添加属性,原因就是根数据对象的 Observer 实例收集不到依赖
  if (target.isVue || (ob && ob.vmCount)) {
    warn('不要给Vue实例或运行时根对象添加响应式属性，要的话在data选项中声明')
  }
  if (!ob) { // target 也许原本就是非响应的，这个时候 target.__ob__是不存在的
    target[key] = val
    return val
  }
  // 保证新添加的属性是响应式
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}