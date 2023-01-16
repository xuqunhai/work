<template>
  <div
    :style="
      'postion: relative; background: url(' +
      image +
      ') center; background-size: cover;'
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CMagazine',
  props: {
    image: String
  }
}
</script>
