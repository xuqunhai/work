<template>
  <!-- vux-tab-wrap => relative + padding-top -->
  <!-- vux-tab-bar-top => 
    会使得vux-tab-item背景渐变方向从左下变成左上，
    使vux-tab-ink-bar绝对定位从bottom变成top
  -->
  <div
    class="vux-tab-wrap"
    :class="barPosition === 'top' ? 'vux-tab-bar-top' : ''">
    <div class="vux-tab-container">
      <!-- vux-tab-no-animate =》
        会使vux-tab-item都有3px的底边框
        没有.vux-tab-ink-bar，自然就没有动画
      -->
      <!-- scrollable =》
        会使得vux-tab-item固定宽度 flex: 0 0 22%;
        使.vux-tab-ink-bar绝地定位的left和right重新计算
      -->
      <div
        class="vux-tab"
        :class="[{'vux-tab-no-animate': !animate},{ scrollable }]"
        ref="nav">
        <slot></slot>
        <div
          v-if="animate"
          class="vux-tab-ink-bar"
          :class="barClass"
          :style="barStyle">
          <span
            class="vux-tab-bar-inner"
            :style="innerBarStyle"
            v-if="customBarWidth"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parentMixin } from '../mixins/multi-items'

export default {
  name: 'tab',
  mixins: [parentMixin],
  mounted () {
    // stop bar anmination on first loading
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReady = true
      }, 0)
    })
  },
  props: {
    lineWidth: {
      type: Number,
      default: 3
    },
    activeColor: String,
    barActiveColor: String,
    defaultColor: String,
    disabledColor: String,
    animate: {
      type: Boolean,
      default: true
    },
    customBarWidth: [Function, String],
    preventDefault: Boolean,
    scrollThreshold: {
      type: Number,
      default: 4
    },
    barPosition: {
      type: String,
      default: 'bottom',
      validator (val) {
        return ['bottom', 'top'].indexOf(val) !== -1
      }
    }
  },
  computed: {
    barLeft () { // 确定当前项的left值-前提假设均等
      if (this.hasReady) {
        const nav = this.$refs.nav
        // console.log('computed barLeft');
        // console.log(nav.offsetWidth);
        // console.log(this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width);
        // nav.offsetWidth指屏幕宽度
        // this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width指当前项宽度
        // 所以这里count指当每一项均等时，一个屏幕宽度可以容纳几个项
        const count = this.scrollable ? (nav.offsetWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        // console.log(count);
        // console.log(`${this.currentIndex * (100 / count)}%`);

        // 宽度不同时，如果要动画应该用下面这个!!!!!!!!!!!!!!!!!!!!!!!
        // console.log((this.$children[this.currentIndex || 0].$el.getBoundingClientRect().left-this.$children[0].$el.getBoundingClientRect().left)/window.innerWidth);
        return `${((this.$children[this.currentIndex || 0].$el.getBoundingClientRect().left-this.$children[0].$el.getBoundingClientRect().left)/window.innerWidth)*100}%`

        // 每一项占屏幕比例为100/count，那么第currentIndex项距离屏幕左边为this.currentIndex*(100/count)
        return `${this.currentIndex * (100 / count)}%`
      }
    },
    barRight () { // 确定当前项的right值-前提假设均等
      if (this.hasReady) {
        const nav = this.$refs.nav
        const count = this.scrollable ? (nav.offsetWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        // 屏幕右边距离第currentIndex项的距离：100/count为每项相对屏幕宽度比例
        // count为2时，第1项右边在50%位置，所以距离屏幕右边为 (2-0-1)*(100/2)=50%
        // count为2.5时，第1项右边在40%位置,所以距离屏幕右边为 (2.5-0-1)*(100/2.5)=60%
        // console.log(`${(count - this.currentIndex - 1) * (100 / count)}%`);

        // 宽度不同时，如果要动画应该用下面这个!!!!!!!!!!!!!!!!!!!!!!!
        // console.log((window.innerWidth - (this.$children[this.currentIndex || 0].$el.getBoundingClientRect().right-this.$children[0].$el.getBoundingClientRect().left))/window.innerWidth);
        return `${((window.innerWidth - (this.$children[this.currentIndex || 0].$el.getBoundingClientRect().right-this.$children[0].$el.getBoundingClientRect().left))/window.innerWidth)*100}%`
        
        return `${(count - this.currentIndex - 1) * (100 / count)}%`
      }
    },
    // when prop:custom-bar-width
    innerBarStyle () { // 自定义bar样式定义
      return {
        width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
        background: this.barActiveColor || this.activeColor
      }
    },
    // end
    barStyle () { // bar样式确定
      const commonStyle = {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        height: this.lineWidth + 'px',
        transition: !this.hasReady ? 'none' : null
      }
      if (!this.customBarWidth) {
        commonStyle.background = this.barActiveColor || this.activeColor
      } else {
        commonStyle.background = 'transparent' // when=prop:custom-bar-width
      }
      return commonStyle
    },
    barClass () {
      return {
        'vux-tab-ink-bar-transition-forward': this.direction === 'forward',
        'vux-tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    },
    scrollable () { // 能否滚动判断
      return this.number > this.scrollThreshold
    }
  },
  watch: {
    currentIndex (newIndex, oldIndex) { // 根据向前还是向后方向确定底部bar动画先后顺序
      this.direction = newIndex > oldIndex ? 'forward' : 'backward'
      this.$emit('on-index-change', newIndex, oldIndex)
      this.hasReady && this.scrollToActiveTab()
    }
  },
  data () {
    return {
      direction: 'forward',
      right: '100%',
      hasReady: false
    }
  },
  methods: {
    scrollToActiveTab () {
      if (!this.scrollable || !this.$children || !this.$children.length) {
        return
      }
      const currentIndexTab = this.$children[this.currentIndex].$el
      let count = 0
      const nav = this.$refs.nav
      const scrollDuration = 15
      const shouldMove = currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft;
      const shouldMoveStep = shouldMove/scrollDuration;
      // scroll animation
      const step = () => {
        // const scrollDuration = 15
        // const nav = this.$refs.nav
        // console.log('count', count);
        // console.log('currentIndexTab.offsetLeft', currentIndexTab.offsetLeft); // 当前项离第一项左边距离
        // console.log('currentIndexTab.offsetWidth', currentIndexTab.offsetWidth);
        // console.log('nav.offsetWidth', nav.offsetWidth);
        // console.log('nav.scrollLeft', nav.scrollLeft); // 已滚动距离
        // currentIndexTab.offsetLeft-nav.scrollLeft是当前项距离屏幕左侧距离？
        // (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 指当前项居中时当前项左侧距离屏幕左侧距离？
        // if (count === 0) {
        //   console.log('当前项距离屏幕左侧距离:');
        //   console.log(currentIndexTab.offsetLeft-nav.scrollLeft);
        //   console.log('当前项居中时当前项左侧距离屏幕左侧距离:');
        //   console.log((nav.offsetWidth - currentIndexTab.offsetWidth) / 2);
        //   console.log('初始时scrollLeft已滚动距离:');
        //   console.log(nav.scrollLeft);
        // }
        // console.log('这一次scrollLeft增加了:');
        // console.log((currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft));
        // 两者相减表示 当前项移动到屏幕中央时需要移动的距离？？？
        /*
          scrollLeft认识——当前滚动了多少
          * 如果元素不能滚动（比如：元素没有溢出），那么scrollLeft 的值是0。
          * 如果给scrollLeft 设置的值小于0，那么scrollLeft 的值将变为0。
          * 如果给scrollLeft 设置的值大于元素内容最大宽度，那么scrollLeft 的值将被设为元素最大宽度。
        */
        // nav.scrollLeft += (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) / scrollDuration
        nav.scrollLeft += shouldMoveStep
        if (++count < scrollDuration) {
          window.requestAnimationFrame(step)
        } else {
          // console.log('大于等于scrollDuration时的nav.scrollLeft:');
          // console.log(nav.scrollLeft);
        }
      }
      window.requestAnimationFrame(step)
    }
  }
}
</script>


<style lang="less">
@import '../styles/variable.less';

@prefixClass: vux-tab;
@easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
@effect-duration: .3s;

.@{prefixClass} {

  &-ink-bar {
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: @tab-bar-active-color;
    text-align: center;

    &-transition-forward {
      transition: right @effect-duration @easing-in-out,
      left @effect-duration @easing-in-out @effect-duration * 0.3;
    }
    &-transition-backward {
      transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
      left @effect-duration @easing-in-out;
    }
  }

}

.vux-tab-bar-top .@{prefixClass} {
  &-ink-bar {
    top: 0;
  }
}

.vux-tab {
  display: flex;
  background-color: #fff;
  height: 44px;
  position: relative;
}

.vux-tab button {
  padding: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  appearance: none;
}

.vux-tab .vux-tab-item {
  display: block;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
  background-size: 100% 1px;
  font-size: 14px;
  text-align: center;
  line-height: 44px;
  color: @tab-text-default-color;
}

.vux-tab .vux-tab-item.vux-tab-selected {
  color: @tab-text-active-color;
  border-bottom: 3px solid @tab-text-active-color;
}

.vux-tab-bar-top {
  .vux-tab .vux-tab-item {
    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) top left no-repeat;
    background-size: 100% 1px;
  }
  .vux-tab .vux-tab-item.vux-tab-selected {
    border-bottom: none;
    border-top: 3px solid @tab-text-active-color;
  }
}

.vux-tab .vux-tab-item.vux-tab-disabled {
  color: @tab-text-disabled-color;
}

.vux-tab.vux-tab-no-animate .vux-tab-item.vux-tab-selected {
  background: 0 0;
}

/** when=prop:custom-bar-width **/
.vux-tab-bar-inner {
  display: block;
  background-color: @tab-text-active-color;
  margin: auto;
  height: 100%;
  transition: width 0.3s @easing-in-out;
}

.vux-tab-item-badge {
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  display: inline-block;
  height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 30px;
  margin: auto 0 auto 4px;
  line-height: 18px;
  font-size: 11px;
  background-clip: padding-box;
  vertical-align: middle;
}

.vux-tab-wrap {
  position: relative;
  padding-top: 44px;
}

.vux-tab-container {
  height: 44px;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  position: absolute;
}

.scrollable {
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 17px;
  box-sizing: content-box;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.scrollable .vux-tab-ink-bar {
  bottom: 17px;
  position: absolute;
}

.scrollable .vux-tab-item {
  flex: 0 0 22%;
}

.scrollable .vux-tab-item:nth-child(1) {
  flex: 0 0 9%;
}
.scrollable .vux-tab-item:nth-child(2) {
  flex: 0 0 15%;
}
.scrollable .vux-tab-item:nth-child(3) {
  flex: 0 0 16%;
}
.scrollable .vux-tab-item:nth-child(5) {
  flex: 0 0 25%;
}
.scrollable .vux-tab-item:nth-child(6) {
  flex: 0 0 35%;
}
.scrollable .vux-tab-item:nth-child(7) {
  flex: 0 0 50%;
}

</style>
