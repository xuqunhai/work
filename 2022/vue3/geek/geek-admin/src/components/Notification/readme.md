如何设计一个弹窗组件？
由一个弹窗的标题，以及具体的弹窗的内容组成的。我们希望弹窗有一个关闭的按钮，点击之后就可以关闭弹窗，弹窗关闭之后还可以设置回调函数。
像 Dialog 和 Notification 类的组件，我们只是单纯想显示一个提示或者报错信息，过几秒就删除，如果在每个组件内部都需要写一个 <Dialog v-if>，并且使用 v-if 绑定变量的方式控制显示就会显得很冗余。
所以，这里就要用到一种调用 Vue 组件的新方式：我们可以使用 JavaScript 的 API 动态地创建和渲染 Vue 的组件。

弹窗类的组件都需要直接渲染在 body 标签下面，弹窗类组件由于布局都是绝对定位，如果在组件内部渲染，组件的 css 属性（比如 Transform）会影响弹窗组件的渲染样式，为了避免这种问题重复出现，弹窗组件 Dialog、Notification 都需要渲染在 body 内部。

  <teleport
    :disabled="!appendToBody"
    to="body"
  >
    <div class="el-dialog">
      <div class="el-dialog__content">
        <slot />
      </div>
    </div>
  </teleport>

template 的本质就是使用 h 函数创建虚拟 Dom，如果我们自己想动态创建组件时，使用相同的方式即可。

function createComponent(Component, props, children) {
  const vnode = h(Component, { ...props, ref: MOUNT_COMPONENT_REF }, children)
  const container = document.createElement('div')
  vnode[COMPONENT_CONTAINER_SYMBOL] = container
  render(vnode, container)
  return vnode.component
}
export function Notification(options) {
  return createNotification(mergeProps(options))
}

function createNotification(options) {
  const instance = createNotificationByOpts(options)
  setZIndex(instance)
  addToBody(instance)
  return instance.proxy
}

创建组件后，由于 Notification 组件同时可能会出现多个弹窗，所以我们需要使用数组来管理通知组件的每一个实例，每一个弹窗的实例都存储在数组中进行管理。

const instanceList = []
function createNotification(options) {
  ...
  addInstance(instance)
  return instance.proxy
}  
function addInstance(instance) {
  instanceList.push(instance)
}
;['success', 'warning', 'info', 'error'].forEach((type) => {
  Notification[type] = (options) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      }
    }
    options.type = type
    return Notification(options)
  }
})

// 有了instanceList， 可以很方便的关闭所有信息弹窗
Notification.closeAll = () => {
  instanceList.forEach((instance) => {
    instance.proxy.close()
    removeInstance(instance)
  })
}