<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
    <slot name="slot1"/> <!-- 具名插槽 -->
    <p>===========</p>
    <slot/> <!-- 默认插槽 -->
  </div>
</template>

<script>
import consoleMixin from './consoleMixin.js'

export default {
  name: 'BaseComponent',
  props: {
    test: Number
  },
  mixins: [ consoleMixin ],
  methods: {
    handleClick () {
      this.$emit('customize-click')
    }
  }
}
</script>