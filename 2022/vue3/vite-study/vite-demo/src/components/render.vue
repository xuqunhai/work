<script>
const { createApp, h } = Vue;
const app = createApp({});
app.component('anchored-heading', {
  render() {
    return h(
      'h' + this.level, // 标签名
      {}, // prop 或 attribute
      // 向组件中传递不带 v-slot 指令的子节点时，比如 anchored-heading 中的 Hello world! ，
      // 这些子节点被存储在组件实例中的 $slots.default 中。
      this.$slots.default() // 包含其子节点的数组
    );
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
});

// render() 函数的实现要精简得多，但是需要非常熟悉组件的实例 property。
/*
实例 property

$data
组件实例正在侦听的数据对象。

$props
当前组件接收到的 props 对象。

$el:仅可读
组件实例正在使用的根 DOM 元素。
对于使用了片段的组件，$el 是占位 DOM 节点，Vue 使用它来跟踪组件在 DOM 中的位置。
建议使用模板引用来直接访问 DOM 元素，而不是依赖于 $el。

片段 https://v3.cn.vuejs.org/guide/migration/fragments.html
模板引用 https://v3.cn.vuejs.org/guide/component-template-refs.html

$options
用于当前组件实例的初始化选项。

$parent
父实例，如果当前实例有的话。

$root
当前组件树的根组件实例。如果当前实例没有父实例，此实例将会是其自己。

$slots: 仅可读
用来以编程方式访问通过插槽分发的内容。
每个具名插槽都有其相应的 property (例如：v-slot:foo 中的内容将会在 this.$slots.foo() 中被找到)。
default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
在使用渲染函数编写一个组件时，访问 this.$slots 会很有帮助。
<slot> 组件 https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
通过插槽分发内容 https://v3.cn.vuejs.org/guide/component-basics.html#%E9%80%9A%E8%BF%87%E6%8F%92%E6%A7%BD%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9

$refs 仅可读
一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

$attrs 仅可读
包含了父作用域中不作为组件 props 或自定义事件的 attribute 绑定和事件。
通过 v-bind="$attrs" 传入内部组件——这在创建高阶的组件时会非常有用。



*/
</script>