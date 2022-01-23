<template>
  <div class="component-card" @click="click" draggable="true" @dragstart="dragstart" effectAllowed="copy" dropEffect="copy">
    <img v-if="image" :src="image" alt="image" />
    <i v-if="className" :class="className" />
    <div v-else class="letter">{{firtLetter}}</div>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'w-component-card',
  props: {
    image: {
      type: String,
      default: ''
    },
    comType: {
      type: String
    },
    title: {
      type: String
    },
    name: {
      type: String
    },
    property: {
      type: Object
    }
  },
  data() {
    let firtLetter = this.name.substr(0, 1);
    return { firtLetter };
  },
  methods: {
    click(e) {
      //   eventHub.$emit('create-component', { name: this.name, path: this.path });
    },
    dragstart(e) {
      if (e.currentTarget === e.target) {
        e.dataTransfer.setData('mod-type', this.comType);
        e.dataTransfer.setData('mod-name', this.name);
        e.dataTransfer.setData('mod-path', this.name);
        e.dataTransfer.setData('mod-props', JSON.stringify(this.property));
      }
    }
  }
};
</script>