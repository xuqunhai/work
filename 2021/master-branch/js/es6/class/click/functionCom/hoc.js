// export default function WithConsole (WrappedComponent) {
//   return {
//     template: '<wrapped v-on="$listeners" v-bind="$attrs"/>',
//     components: {
//       wrapped: WrappedComponent
//     },
//     mounted () {
//       console.log('I have already mounted')
//     }
//   }
// }

// export default function WithConsole (WrappedComponent) {
//   return {
//     mounted () {
//       console.log('I have already mounted')
//     },
//     render (h) {
//       return h(WrappedComponent, {
//         on: this.$listeners,
//         attrs: this.$attrs,
//       })
//     }
//   }
// }

// export default function WithConsole (WrappedComponent) {
//   return {
//     mounted () {
//       console.log('I have already mounted')
//     },
//     render (h) {
//       return h(WrappedComponent, {
//         on: this.$listeners,
//         attrs: this.$attrs,
//         props: this.$props
//       })
//     }
//   }
// }

// this.$props 始终是空对象，这是因为这里的 this.$props 指的是高阶组件接收到的 props，而高阶组件没有声明任何 props，所以 this.$props 自然是空对象啦，那怎么办呢？很简单只需要将高阶组件的 props 设置与被包装组件的 props 相同即可了：
export default function WithConsole (WrappedComponent) {
  return {
    mounted () {
      console.log('I have already mounted')
    },
    props: WrappedComponent.props,
    render (h) {
      // return h(WrappedComponent, {
      //   on: this.$listeners,
      //   attrs: this.$attrs,
      //   props: this.$props
      // })

      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), []).map(vnode => {
          vnode.context = this._self
          return vnode
        })

      return h(WrappedComponent, {
        on: this.$listeners,
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots,
        props: this.$props
      }, slots) // 将 slots 作为 h 函数的第三个参数
    }
  }
}