const debounce = (fun, delay = 1000, before) => {
  let timer = null
  return (params) => {
   timer && window.clearTimeout(timer)
   before && before(params)
   timer = window.setTimeout(() => {
     // click事件fun是Function input事件fun是Array
    if (!Array.isArray(fun)) {
     fun = [fun]
    }
    for (let i in fun) {
     fun[i](params)
    }
    timer = null
   }, parseInt(delay))
  }
 }
 export default {
  name: 'Debounce',
  functional: true, // 静态组件 当不声明functional时该组件同样拥有上下文以及生命周期函数
  render(createElement, context) {
   const before = context.props.before
   const time = context.props.time
   const vnodeList = context.slots().default
   if (vnodeList === undefined){
    console.warn('<debounce> 组件必须要有子元素')
    return null
   }
   const vnode = vnodeList[0] || null // 获取子元素虚拟dom
   if (vnode.tag === 'input') {
    const defaultFun = vnode.data.on.input
    const debounceFun = debounce(defaultFun, time, before) // 获取节流函数
    vnode.data.on.input = debounceFun
   } else if (vnode.tag === 'button') {
    const defaultFun = vnode.data.on.click
    const debounceFun = debounce(defaultFun, time, before) // 获取节流函数
    vnode.data.on.click = debounceFun
   } else if (vnode.componentOptions && vnode.componentOptions.tag === 'el-input') {
    const defaultFun = vnode.componentOptions.listeners.input
    const debounceFun = debounce(defaultFun, time, before) // 获取节流函数
    vnode.componentOptions.listeners.input = debounceFun
   } else if (vnode.componentOptions && vnode.componentOptions.tag === 'el-button') {
    const defaultFun = vnode.componentOptions.listeners.click
    const debounceFun = debounce(defaultFun, time, before) // 获取节流函数
    vnode.componentOptions.listeners.click = debounceFun
   } else {
    console.warn('<debounce> 组件内只能出现下面组件的任意一个且唯一 el-button、el-input、button、input')
    return vnode
   }
   return vnode
  }
 }