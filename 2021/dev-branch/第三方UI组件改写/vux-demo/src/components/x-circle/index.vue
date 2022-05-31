<template>
  <div class="vux-circle">
    <svg viewBox="0 0 100 100">
      <!-- svg viewport表示SVG可见区域的大小 -->
      <!-- SVG就像是我们的显示器屏幕，viewBox就是截屏工具选中的那个框框，最终的呈现就是把框框中的截屏内容再次在显示器中全屏显示！ -->
      <!-- 默认应该是"xMidYmid meet"效果 -->
      <!-- xMid	viewport和viewBox x轴中心对齐 -->
      <!-- YMid	viewport和viewBox y轴中心点对齐。注意Y是大写。 -->
      <!-- meet	保持纵横比缩放viewBox适应viewport，即长边等比缩放到svg viewport宽高 -->
      <!-- 除了meet外还有两个值：
            slice	保持纵横比同时比例小的方向放大填满viewport，即短边等比缩放到svg viewport宽高
            none	扭曲纵横比以充分适应viewport，即viewBox宽高拉伸到和svg viewport一致 -->
      <defs v-if="isGradient"> 
        <!-- 所有需要再次使用的引用元素定义在defs元素里面 -->
        <!-- 在defs元素中定义的图形元素不会直接呈现。 你可以在你的视口的任意地方利用 <use>元素呈现这些元素，
          也可以使用url获取对应id形式，如本例子:stroke="isGradient ? url : strokeColor"里的url为
          'url(#' + this.id + ')'，获取的id就是defs里的linearGradient
          defs详细例子 https://blog.csdn.net/zoubf/article/details/80226900
        -->
        <linearGradient :id='id' x1="10%" y1="45%" x2="50%" y2="0%">
          <stop offset="0%" :style="{'stop-color': strokeColor[0], 'stop-opacity': 1}"/>
          <stop offset="100%" :style="{'stop-color': strokeColor[1], 'stop-opacity': 1}"/>
        </linearGradient>
      </defs>
      <!-- 底部灰色圆 -->
      <!-- <path :d="gapPathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"/> -->
      <path :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"/>
      <!-- 动画圆 关键pathStyle -->
      <!-- <path :d="gapPathString"
        :stroke-linecap="strokeLinecap"
        :stroke="isGradient ? url : strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0" :style="gapPathStyle"/> -->
      <path :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="isGradient ? url : strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div class="vux-circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
* Fork from https://github.com/react-component/progress
* MIT license
*/

export default {
  name: 'x-circle',
  props: {
    gap: { // 是否是整圆
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeColor: {
      type: [Array, String],
      default: '#3FC7FA'
    },
    trailWidth: {
      type: Number,
      default: 1
    },
    trailColor: {
      type: String,
      default: '#D9D9D9'
    },
    percent: {
      type: Number,
      default: 0
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    anticlockwise: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'vux-circle-gradient'
    }
  },
  computed: {
    url () {
      return 'url(#' + this.id + ')'
    },
    radius () { // 外直径默认50
      return 50 - this.strokeWidth / 2
    },
    pathString () {
      if (this.gap) {
        return this.gapPathString;
      }
      /**
       *  M = moveto
          L = lineto
          H = horizontal lineto
          V = vertical lineto
          C = curveto
          S = smooth curveto
          Q = quadratic Belzier curve
          T = smooth quadratic Belzier curveto
          A = elliptical Arc
          Z = closepath
          大写表示绝对定位，小写表示相对定位。
       */
      /**
       * 弧形可以视为圆形或椭圆形的一部分
       * a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
       * 前两个参数分别是x轴半径和y轴半径
       * 第三个参数表示弧形的旋转情况,逆时针为负
       * large-arc-flag决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。
       * sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。
       * 最后两个参数是指定弧形的终点
       */
      return `M 50,50 m 0,-${this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
      /**
       * M 50,50 基准点(50,50)
       * m 0,-${this.radius} 起始位置基准点正上方radius处
       * a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
       * 画圆弧，半径radius，不旋转，大角度弧，顺时针，终点是(0,${2 * this.radius})
       * a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
       * 继续画圆弧，顺时针，终点在(0,-${2 * this.radius})
       */
    },
    gapPathString() {
      const angle = this.gap * Math.PI / 360;
      const gapX = +((this.radius * Math.sin(angle)).toFixed(2));
      const gapY = +((this.radius * Math.cos(angle)).toFixed(2));
      // const startX = 50 - gapX;
      // const startY = 50 + gapY;
      // const midX = 50;
      // const midY = 50 - this.radius;
      // const endX = 50 + startX;
      // const endY = 50 + startY;
      const startX = - gapX;
      const startY = gapY;
      const midX = gapX;
      const midY = -gapY - this.radius;
      const endX = gapX;
      const endY = gapY + this.radius;
      // console.log('this.radius', this.radius, 'this.gap', this.gap, 'angle', angle, 'gapX', gapX, 'gapY', gapY);
      // console.log('startX', startX, 'startY', startY, 'midX', midX, 'midY', midY, 'endX', endX, 'endY', endY);
      return `M 50,50 m ${startX},${startY}
      a ${this.radius},${this.radius} 0 0 1 ${midX},${midY}
      a ${this.radius},${this.radius} 0 0 1 ${endX},${endY}`
    },
    len () {
      if (this.gap) {
        return (180 - this.gap / 2) / 180 * Math.PI * 2 * this.radius
      }
      return Math.PI * 2 * this.radius
    },
    gapLen() { // 有缺口时的长度
      return (180 - this.gap / 2) / 180 * Math.PI * 2 * this.radius
    },
    pathStyle () {
      if (this.gap) {
        return this.gapPathStyle;
      }
      return {
        // 控制画笔的虚实
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        // dashoffset增加时实线逆时针
        // 0处实线都看不见，100处实线全部显示（即dashoffset为0）
        // 0处顺时针时，实线从右边慢慢出来，所以一开始是正数，慢慢往0靠近
        // 0处逆时针，实现从左边慢慢出来，所以一开始是负值，慢慢往0靠近
        'stroke-dashoffset': `${((this.anticlockwise ? this.percent - 100 : 100 - this.percent) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    gapPathStyle () { // 有缺口时的路径动画
      return {
        'stroke-dasharray': `${this.gapLen}px ${this.gapLen}px`,
        'stroke-dashoffset': `${((this.anticlockwise ? this.percent - 100 : 100 - this.percent) / 100 * this.gapLen)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    isGradient () {
      return typeof this.strokeColor !== 'string'
    }
  }
}
</script>

<style>
.vux-circle {
  position: relative;
  width: 100%;
  height: 100%;
}
.vux-circle-content {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
