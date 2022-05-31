<template>
  <span class="select-area">
    <el-select v-model="val" placeholder="请选择" @change="inputChange">
      <el-option label value></el-option>
      <el-option v-for="item in values" :key="item.value" :label="item.label"></el-option>
    </el-select>
  </span>
</template>

<script>
import { Select, Option } from 'element-ui';
export default {
  name: 'xp-input-select',
  components: {
    'el-select': Select,
    'el-option': Option
  },
  props: {
    cid: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    value: {
      type: [String, Number, Boolean]
    },
    values: {
      type: Array,
      required: true
    },
    valueChange: {
      type: Function,
      required: false
    },
    validate: {
      type: String,
      default: () => '',
      required: false
    }
  },
  data() {
    return {
      val: ''
    };
  },
  watch: {
    value(newVal) {
      this.val = newVal;
    }
  },
  methods: {
    inputChange(e) {
      if (this.val !== this.value) {
        this.valueChange && this.valueChange(this.name, this.val, 'InputText');
      }
    }
  }
};
</script>