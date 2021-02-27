<template>
  <div
    class="el-rate"
    @keydown="handleKey"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0">
    <span
      v-for="(item, key) in max"
      class="el-rate__item"
      @mousemove="setCurrentValue(item, $event)"
      @mouseleave="resetCurrentValue"
      @click="selectValue(item)"
      :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
      :key="key">
      <!-- hover样式是缩放 -->
      <i
        :class="[classes[item - 1], { 'hover': hoverIndex === item }]"
        class="el-rate__icon"
        :style="getIconStyle(item)">
        <!-- decimalStyle: color: green; width: 50%; -->
        <i
          v-if="showDecimalIcon(item)"
          :class="decimalIconClass"
          :style="decimalStyle"
          class="el-rate__decimal">
        </i>
      </i>
    </span>
    <span v-if="showText || showScore" class="el-rate__text" :style="{ color: textColor }">{{ text }}</span>
  </div>
</template>

<script>
  // import { hasClass } from 'element-ui/src/utils/dom';
  import { hasClass } from '../../utils/dom';
  // import { isObject } from 'element-ui/src/utils/types';
  import { isObject } from '../../utils/types';
  // import Migrating from 'element-ui/src/mixins/migrating';

  export default {
    name: 'ElRate',

    // mixins: [Migrating],

    // inject: {
    //   elForm: {
    //     default: ''
    //   }
    // },

    data() {
      return {
        pointerAtLeftHalf: true,
        currentValue: this.value,
        hoverIndex: -1
      };
    },

    props: {
      // 绑定值
      value: {
        type: Number,
        default: 0
      },
      // 低分和中等分数的界限值，值本身被划分在低分中
      lowThreshold: {
        type: Number,
        default: 2
      },
      // 高分和中等分数的界限值，值本身被划分在高分中
      highThreshold: {
        type: Number,
        default: 4
      },
      // 最大分值
      max: {
        type: Number,
        default: 5
      },
      // icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色
      colors: {
        type: [Array, Object],
        default() {
          return ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
        }
      },
      // 未选中 icon 的颜色
      voidColor: {
        type: String,
        default: '#C6D1DE'
      },
      // 只读时未选中 icon 的颜色
      disabledVoidColor: {
        type: String,
        default: '#EFF2F7'
      },
      // icon 的类名
      // 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；
      // 若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名
      iconClasses: {
        type: [Array, Object],
        default() {
          return ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'];
        }
      },
      // 未选中 icon 的类名
      voidIconClass: {
        type: String,
        default: 'el-icon-star-off'
      },
      // 只读时未选中 icon 的类名
      disabledVoidIconClass: {
        type: String,
        default: 'el-icon-star-on'
      },
      // 是否为只读
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否允许半选
      allowHalf: {
        type: Boolean,
        default: false
      },
      // 是否显示辅助文字
      // 若为真，则会从 texts 数组中选取当前分数对应的文字内容
      showText: {
        type: Boolean,
        default: false
      },
      // 是否显示当前分数，show-score 和 show-text 不能同时为真
      showScore: {
        type: Boolean,
        default: false
      },
      // 辅助文字的颜色, 评价结果文案对应的颜色
      textColor: {
        type: String,
        default: 'red'
      },
      // 辅助文字数组, 每个评价对应的评价语
      texts: {
        type: Array,
        default() {
          return ['极差', '失望', '一般', '满意', '惊喜'];
        }
      },
      // 分数显示模板, scoreTemplate可以传入一个包含value的字符串模版
      scoreTemplate: {
        type: String,
        default: '{value}'
      }
    },

    computed: {
      // 根据当前值实时更新文案
      text() {
        let result = '';
        if (this.showScore) { // 正则替换格式为{value}(包括value的前后空格),只读时取this.value，否则取this.currentValue;
          result = this.scoreTemplate.replace(/\{\s*value\s*\}/, this.rateDisabled
            ? this.value
            : this.currentValue);
        } else if (this.showText) { // 取出texts数组里对应的文字进行显示
          result = this.texts[Math.ceil(this.currentValue) - 1];
        }
        return result;
      },
      // 确定小数时的样式，如宽度
      decimalStyle() {
        let width = '';
        if (this.rateDisabled) { // 只读时取小数部分
          width = `${ this.valueDecimal }%`;
        } else if (this.allowHalf) { // 半选时为50%
          width = '50%';
        }
        return {
          color: this.activeColor,
          width
        };
      },
      //  取this.value小数部分
      valueDecimal() {
        return this.value * 100 - Math.floor(this.value) * 100;
      },
      // 返回各区间值对应的类名
      // iconClasses -> ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']
      // 返回值: {2: "el-icon-star-on", 4: {excluded: true, value: "el-icon-star-on"}, 5: "el-icon-star-on"}
      classMap() {
        return Array.isArray(this.iconClasses)
          ? {
            [this.lowThreshold]: this.iconClasses[0],
            // excluded为true说明边界值this.highThreshold是属于下一个区域this.max的
            [this.highThreshold]: { value: this.iconClasses[1], excluded: true },
            [this.max]: this.iconClasses[2]
          } : this.iconClasses;
      },
      // 返回对应的iconClass
      decimalIconClass() {
        return this.getValueFromMap(this.value, this.classMap); // el-icon-star-on
      },
      // 根据是否只读返回对应iconClass
      voidClass() {
        // disabledVoidIconClass -> el-icon-star-on
        // voidIconClass -> el-icon-star-off
        return this.rateDisabled ? this.disabledVoidIconClass : this.voidIconClass;
      },
      // 根据当前值返回正确的iconClass
      activeClass() {
        return this.getValueFromMap(this.currentValue, this.classMap);
      },
      // 返回多区间对应的颜色映射表
      colorMap() { // {2: "red", 4: {value: "green", excluded: true}, 5: "blue"}
        return Array.isArray(this.colors)
          ? {
            [this.lowThreshold]: this.colors[0],
            [this.highThreshold]: { value: this.colors[1], excluded: true },
            [this.max]: this.colors[2]
          } : this.colors;
      },
      // 根据当前值查询颜色映射表找出对应的颜色
      activeColor() {
        return this.getValueFromMap(this.currentValue, this.colorMap);
      },
      // 根据当前值currentValue确定每个星星对应的class
      // 当currentValue为小数时的class数组是和去掉小数的class数组是一样的，比如3.5和3所对应的class数组都是一样的
      // 3   -> ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on", "el-icon-star-off", "el-icon-star-off"]
      // 3.5 -> ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on", "el-icon-star-off", "el-icon-star-off"]
      // 4   -> ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on", "el-icon-star-on", "el-icon-star-off"]
      classes() {
        let result = [];
        let i = 0;
        let threshold = this.currentValue; // 3.5, 3
        if (this.allowHalf && this.currentValue !== Math.floor(this.currentValue)) {
          // this.currentValue为小数时, 会减1，比如3.5会变成2.5
          threshold--;
        }
        // threshold为2.5和3时，result是一样的，因为比2.5和3小的都是0，1，2
        for (; i < threshold; i++) {
          result.push(this.activeClass);
        }
        for (; i < this.max; i++) {
          result.push(this.voidClass);
        }
        return result;
      },
      // 是否只读
      rateDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    watch: {
      // 执行emit('input')，会使父组件的value改变，从而改变绑定在子组件的value，从而会触发watch里的value函数
      value(val) { // 将最新value同步更新到currentValue
        this.currentValue = val; // currentValue一改变会触发更新classes、activeClass、activeColor;
        this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
      }
    },

    methods: {
      // getMigratingConfig() {
      //   return {
      //     props: {
      //       'text-template': 'text-template is renamed to score-template.'
      //     }
      //   };
      // },
      // 循环map获取map对象的key组成数组，保留大于或大于等于value的值，然后把满足条件的进行从小到大的顺序进行排序
      // 取出排序后的第一个作为key值，获取map中对应的value,从而确认当前值value应使用哪个区间的样式
      getValueFromMap(value, map) {
        // console.log('value', value); // 3
        // console.log('map', map); // {2: "el-icon-star-on", 4: {value: "el-icon-star-on", excluded: true}, 5: "el-icon-star-on"}
        // console.log('Object.keys(map)', Object.keys(map)); // ["2", "4", "5"]
        const matchedKeys = Object.keys(map)
          .filter(key => {
            const val = map[key];
            // console.log('key', key); // 2, 4, 5
            // console.log('val', val); // 'el-icon-star-on', {value: "el-icon-star-on", excluded: true}, 'el-icon-star-on'
            const excluded = isObject(val) ? val.excluded : false;
            // console.log('value', value); // 3
            // console.log('key', key); // 2, 4, 5
            // console.log('value < key', value < key);
            return excluded ? value < key : value <= key; // 取出大于等于3的key
          })
          .sort((a, b) => a - b);
          // console.log('matchedKeys', matchedKeys); // ["4", "5"]
        const matchedValue = map[matchedKeys[0]]; // matchedKeys[0] -> 4, map[4] -> {value: "el-icon-star-on", excluded: true}
        return isObject(matchedValue) ? matchedValue.value : (matchedValue || ''); // 'el-icon-star-on'
      },
      // 显示半颗星的情况
      // 只读、有小数，在item - 1和item之间
      // 允许半选、指着半选、在item - 0.5和item之间
      showDecimalIcon(item) { // item是指第几个星星
        // item - 1 < this.value && item > this.value; -> this.value在item - 1和item之间 
        // item - 0.5 <= this.currentValue && item > this.currentValue; -> this.currentValue在item - 0.5和item之间
        // this.currentValue为3.5且item为4时满足条件
        let showWhenDisabled = this.rateDisabled && this.valueDecimal > 0 && item - 1 < this.value && item > this.value;
        /* istanbul ignore next */
        let showWhenAllowHalf = this.allowHalf &&
          this.pointerAtLeftHalf &&
          item - 0.5 <= this.currentValue &&
          item > this.currentValue;
          // console.log('showWhenDisabled', showWhenDisabled); // undefined
          // console.log('item', item); // 4
          // console.log('this.currentValue', this.currentValue); // 3.5
          // console.log('showWhenAllowHalf', showWhenAllowHalf); // true
        return showWhenDisabled || showWhenAllowHalf;
      },
      // 样式关键：给已选currentValue和前面的项设置activeColor，给之后的项设置未选样式
      getIconStyle(item) {
        const voidColor = this.rateDisabled ? this.disabledVoidColor : this.voidColor;
        return {
          color: item <= this.currentValue ? this.activeColor : voidColor
        };
      },
      // 只读时什么都不做，
      // 触发input和change事件，并传参，允许半选，且在左半边时，取this.currentValue，否则取value（因为传入的参数value都是整数，所以半边时不能用）
      selectValue(value, key) {
        // console.log('selectValue item', value); // 1,2,3,4,5
        // console.log('key', key); // 0,1,2,3,4
        if (this.rateDisabled) { // 只读
          return;
        }
        if (this.allowHalf && this.pointerAtLeftHalf) { // 允许半选，且在左半边
          this.$emit('input', this.currentValue); // 利用v-model特性，触发父组件的input事件，改变父组件的value，进而带动子组件（也就是自己）的value的改变，从而触发watch中的value函数执行，更新currentValue
          this.$emit('change', this.currentValue);
        } else {
          this.$emit('input', value); // 利用v-model特性，触发父组件的input事件，改变父组件的value，进而带动子组件（也就是自己）的value的改变，从而触发watch中的value函数执行，更新currentValue
          this.$emit('change', value);
        }
      },
      // 根据方向键更新currentValue
      handleKey(e) {
        // 只读时什么都不做，
        if (this.rateDisabled) {
          return;
        }
        let currentValue = this.currentValue;
        const keyCode = e.keyCode;
        // 更新currentValue
        if (keyCode === 38 || keyCode === 39) { // 上38 右39
          if (this.allowHalf) {
            currentValue += 0.5;
          } else {
            currentValue += 1;
          }
          e.stopPropagation();
          e.preventDefault();
        } else if (keyCode === 37 || keyCode === 40) { // 下40 左37
          if (this.allowHalf) {
            currentValue -= 0.5;
          } else {
            currentValue -= 1;
          }
          e.stopPropagation();
          e.preventDefault();
        }
        currentValue = currentValue < 0 ? 0 : currentValue;
        currentValue = currentValue > this.max ? this.max : currentValue;
        this.$emit('input', currentValue); // 利用v-model特性，触发父组件的input事件，改变父组件的value，进而带动子组件（也就是自己）的value的改变，从而触发watch中的value函数执行，更新currentValue
        this.$emit('change', currentValue);
      },
      // 星星mousemove触发,确定currentValue -> 当允许半选，且鼠标在左半边时，value需要减0.5才是currentValue
      // 不会改变value,会改变currentValue
      setCurrentValue(value, event) {
        // 只读时什么也不做
        if (this.rateDisabled) {
          return;
        }
        /* istanbul ignore if */
        if (this.allowHalf) { // 允许半选
          let target = event.target;
          if (hasClass(target, 'el-rate__item')) {
            target = target.querySelector('.el-rate__icon');
          }
          if (hasClass(target, 'el-rate__decimal')) {
            target = target.parentNode;
          }
          // 以上确保target都是.el-rate__icon,即整个星星
          // offsetX -> 事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量
          this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth; // 等效于event.offsetX <= target.clientWidth/2，所以此时鼠标在左半边
          this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value; // 左半边value要减0.5
        } else {
          this.currentValue = value; // 实时更新currentValue
        }
        this.hoverIndex = value; // 放大星星
      },
      // 星星mouseleave触发，取之前的值，即value进行currentValue还原操作
      // 以value为准
      // 点击后也会触发
      resetCurrentValue() {
        // 只读时什么也不做
        if (this.rateDisabled) {
          return;
        }
        if (this.allowHalf) { // 允许半选时，确定当前是否在半选
          this.pointerAtLeftHalf = this.value !== Math.floor(this.value);
        }
        this.currentValue = this.value; // 更新currentValue
        this.hoverIndex = -1; // 去掉hover样式，大小恢复原来
      }
    },

    created() {
      if (!this.value) {
        this.$emit('input', 0); // 利用v-model特性，触发父组件的input事件，改变父组件的value，进而带动子组件（也就是自己）的value的改变，从而触发watch中的value函数执行，更新currentValue
      }
    }
  };
</script>
