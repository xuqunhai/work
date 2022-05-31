<template>
  <input class="input-item" type="text" :placeholder="title" v-model="val" @change="inputChange" :blur="inputChange" @input="inputChange" />
</template>

<script>
export default {
  name: 'xp-input-text',
  props: {
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
      type: String,
      required: false
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
      val: this.value
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