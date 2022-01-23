import './grid.less';
import Utils from 'utils';

const config = [
  {
    name: 'cid',
    title: 'cid',
    type: String,
    default: '',
    require: false,
    component: 'none'
  },
  {
    name: 'columns',
    title: '列数',
    type: Number,
    require: false,
    component: 'InputNumber'
  },
  { component: 'split' },
  {
    name: 'width',
    title: '宽度',
    type: Number,
    default: 0,
    require: false,
    component: 'InputNumber'
  },
  {
    name: 'height',
    title: '高度',
    type: Number,
    default: 0,
    require: false,
    component: 'InputNumber'
  },
  { component: 'split' },
  {
    name: 'margin',
    title: '外边距',
    type: String,
    default: '',
    require: false,
    component: 'InputLRTB'
  },
  {
    name: 'padding',
    title: '内边距',
    type: String,
    default: '',
    require: false,
    component: 'InputLRTB'
  },
  { component: 'split' },
  {
    name: 'background',
    title: '背景',
    type: String,
    default: 'none',
    require: false,
    component: 'InputBackground'
  },
  {
    name: 'boxShadow',
    title: '阴影',
    type: String,
    default: 'none',
    require: false,
    component: 'InputShadow'
  }
];

export default {
  name: 'xp-grid',
  props: Utils.toProps(config),
  render(h) {
    return (
      <div class="cimpo-grid" style="display:-webkit-flex;">
        {this.$slots.default}
      </div>
    );
  },
  mounted() {
    this.padCells(this.columns);
  },
  watch: {
    columns: function (val) {
      this.padCells(val);
    }
  },
  methods: {
    padCells(val) {
      let data = this.getModelData();
      if (data) {
        if (val >= data.children.length) {
          let newCols = val - data.children.length;
          for (let i = 0; i < newCols; i++) {
            this.addComponent({
              name: 'xp-cell',
              path: 'common/Cell/Cell',
              props: {}
            });
          }
        } else {
          let newCols = val - data.children.length;
          for (let i = 0; i < newCols; i++) {
            let child = data.children.pop();
            this.removeComponent(child.cid);
          }
        }
      }
    }
  }
};
