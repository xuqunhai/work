<template>
  <span>
    <img :src="src" />
    <xp-controll v-if="showControll" @change="change" />
  </span>
</template>

<script>
export default {
  name: 'xp-image',
  props: {
    src: {
      type: String,
      default: '/public/images/no-image-icon.png'
    }
  },
  computed: {
    showControll() {
      if (this.isEditMode() && this.display) {
      }
    }
  }
};
</script>