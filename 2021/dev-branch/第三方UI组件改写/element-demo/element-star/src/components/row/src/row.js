export default {
  name: 'ElRow',

  componentName: 'ElRow',

  props: {
    tag: { // 自定义元素标签
      type: String,
      default: 'div'
    },
    gutter: Number, // 栅格间隔 -> 0
    type: String, // 布局模式，可选 flex，现代浏览器下有效
    justify: { // flex 布局下的水平排列方式
      type: String,
      default: 'start'
    },
    align: { // flex 布局下的垂直排列方式
      type: String,
      default: 'top'
    }
  },

  computed: {
    style() {
      const ret = {};

      if (this.gutter) { // margin左右设为负数的话，子组件col设置padding左右时就不用把第一个的左padding和最后一个的右padding去掉
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render(h) { // 采用render函数渲染，通过this.$slots.default获取自定义内容
    return h(this.tag, {
      class: [
        'el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { 'el-row--flex': this.type === 'flex' }
      ],
      style: this.style
    }, this.$slots.default);
  }
};
