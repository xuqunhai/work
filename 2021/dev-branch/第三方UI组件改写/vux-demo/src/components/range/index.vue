<template>
  <div class="vux-range-input-box" style="position:relative;margin-right:30px;margin-left:50px;">
    <input class="vux-range-input" v-model.number="currentValue">
  </div>
</template>

<script>
import Powerange from './powerange'

export default {
  name: 'range',
  props: {
    decimal: Boolean, // 小数
    customOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      default: 0,
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    minHTML: String,
    maxHTML: String,
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: Boolean,
    disabledOpacity: Number,
    rangeBarHeight: {
      type: Number,
      default: 1
    },
    rangeHandleHeight: { // 不是圆球大小，而是上下位置?大于30上移，小于30下移
      type: Number,
      default: 30
    }
  },
  created () {
    this.currentValue = this.value // 将props传进来的value同步到currentValue
  },
  mounted () {
    const _this = this
    this.$nextTick(() => {
      let options = {
        callback: function (value) {
          _this.currentValue = value
        },
        decimal: this.decimal,
        start: this.currentValue,
        min: this.min,
        max: this.max,
        minHTML: this.minHTML,
        maxHTML: this.maxHTML,
        disable: this.disabled,
        disabledOpacity: this.disabledOpacity,
        // 这里减80是因为元素.vux-range-input-box的margin左50px，右30px
        initialBarWidth: window.getComputedStyle(this.$el.parentNode).width.replace('px', '') - 80,
        onTouchstart (e) {
          _this.$emit('on-touchstart', e)
        },
        onTouchend (e) {
          _this.$emit('on-touchend', e)
        },
        hideRange: this.customOptions.hideRange,
        isAlignCircleCenter: this.customOptions.isAlignCircleCenter,
        isShowCurValue: this.customOptions.isShowCurValue,
        isAlignLR: this.customOptions.isAlignLR,
        isCircleActive: this.customOptions.isCircleActive,
      }
      if (this.step !== 0) {
        options.step = this.step
      }
      this.range = new Powerange(this.$el.querySelector('.vux-range-input'), options)
      // 这里就是确定小球和中线的相对位置，想要垂直居中，不仅rangeHandleHeight要变，小球直径也要同步
      const handleTop = (this.rangeHandleHeight - this.rangeBarHeight) / 2
      this.$el.querySelector('.range-handle').style.top = `-${handleTop}px`
      this.$el.querySelector('.range-bar').style.height = `${this.rangeBarHeight}px`
      this.handleOrientationchange = () => {
        this.update()
      }
      window.addEventListener('orientationchange', this.handleOrientationchange, false)
    })
  },
  methods: {
    update () {
      console.log('update', this.currentValue)
      let value = this.currentValue
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.range.reInit({
        min: this.min,
        max: this.max,
        step: this.step,
        value
      })
      this.currentValue = value
      this.range.setStart(this.currentValue)
      this.range.setStep()
    }
  },
  data () {
    return {
      currentValue: 0
    }
  },
  watch: {
    currentValue (val) {
      this.range && this.range.setStart(val)
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value (val) {
      this.currentValue = val
    },
    min () {
      this.update()
    },
    step () {
      this.update()
    },
    max () {
      this.update()
    }
  },
  beforeDestroy () {
    window.removeEventListener('orientationchange', this.handleOrientationchange, false)
  }
}
</script>

<style lang="less">
@import './variable.less';
@import './powerange.less';
</style>

