import { go } from '../libs/router'

const parentMixin = {
  mounted () {
    if (this.value >= 0) { // 传进来的value大于等于0时更新currentIndex
      this.currentIndex = this.value
    }
    this.updateIndex()
  },
  methods: {
    updateIndex () { // 存在直接子组件且存在选中项时更新index
      if (!this.$children || !this.$children.length) return
      this.number = this.$children.length
      let children = this.$children
      // console.log('children'); -> vux-tab-item
      for (let i = 0; i < children.length; i++) {
        children[i].currentIndex = i
        if (children[i].currentSelected) {
          this.index = i
        }
      }
    }
  },
  props: {
    value: Number
  },
  watch: {
    currentIndex (val, oldVal) { // currentIndex变化时更新currentSelected，并emit事件
      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false)
      val > -1 && this.$children[val] && (this.$children[val].currentSelected = true)
      this.$emit('input', val)
      this.$emit('on-index-change', val, oldVal)
    },
    index (val) { // index变化时会触发currentIndex同步
      this.currentIndex = val
    },
    value (val) { // value变化时会触发index同步
      this.index = val
    }
  },
  data () {
    return {
      index: -1,
      currentIndex: this.index,
      number: this.$children.length
    }
  }
}

const childMixin = {
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$parent.updateIndex()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  methods: {
    onItemClick (hasLink) {
      if (this.$parent.preventDefault) { // $parent有preventDefault属性
        // 触发on-before-index-change并把当前索引传入
        this.$parent.$emit('on-before-index-change', this.currentIndex)
        return
      }
      if (typeof this.disabled === 'undefined' || this.disabled === false) { // 没有设置disabled
        this.currentSelected = true
        this.$parent.currentIndex = this.currentIndex
        this.$nextTick(() => {
          this.$emit('on-item-click', this.currentIndex)
        })
      }
      if (hasLink === true) {
        go(this.link, this.$router)
      }
    }
  },
  watch: {
    currentSelected (val) {
      if (val) {
        this.$parent.index = this.currentIndex
      }
    },
    selected (val) { // selected变化时，同步更新currentSelected
      this.currentSelected = val
    }
  },
  data () {
    return {
      currentIndex: -1,
      currentSelected: this.selected
    }
  }
}

export {
  parentMixin,
  childMixin
}
