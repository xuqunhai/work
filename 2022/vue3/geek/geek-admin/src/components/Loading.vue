<script>
const loadingDirective = {
  mounted: function (el, binding, vnode) {
    const mask = createComponent(Loading, {
      ...options,
      onAfterLeave() {
        el.domVisible = false
        const target =
          binding.modifiers.fullscreen || binding.modifiers.body
            ? document.body
            : el
        removeClass(target, 'el-loading-parent--relative')
        removeClass(target, 'el-loading-parent--hidden')
      }
    })
    el.options = options
    el.instance = mask.proxy
    el.mask = mask.proxy.$el
    el.maskStyle = {}

    binding.value && toggleLoading(el, binding)
  },

  updated: function (el, binding) {
    el.instance.setText(el.getAttribute('element-loading-text'))
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },

  unmounted: function () {
    el.instance && el.instance.close()
  }
}

export default {
  install(app) {
    // if (Vue.prototype.$isServer) return
    app.directive('loading', loadingDirective)
  }
}
</script>
