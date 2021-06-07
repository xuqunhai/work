// 存储全局使用的Vue对象
let _Vue = null
class VueRouter {
  // vue.use要求plugin具备一个install方法
  static install (Vue) {
    // 判断插件是否已经安装过
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    _Vue = Vue

    // 将main文件中实例化Vue对象时传入的router对象添加到Vue的原型链上。
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    // 用于快速查找route
    this.routeMap = {}
    this.data = _Vue.observable({
      current: window.location.hash.substr(1)
    })
    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    // 注册router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      methods: {
        clickHandler (e) {
          // 修改hash
          location.hash = this.to
          // 修改current，触发视图更新
          this.$router.data.current = this.to
          e.preventDefault()
        }
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      }
    })
    const that = this
    // 注册router-view插件
    Vue.component('router-view', {
      render (h) {
        const component = that.routeMap[that.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 在hash发生更改的时候，修改current属性，触发组件更新
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.substr(1)
    })
  }
}

export default VueRouter