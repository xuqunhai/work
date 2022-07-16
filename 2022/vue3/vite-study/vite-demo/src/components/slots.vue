<template>
  <blog-post>
    <template v-slot:header>
      <h1>About Me</h1>
    </template>
    <template v-slot:default>
      <p>Here's some page content, which will be included in $slots.default.</p>
    </template>
    <template v-slot:footer>
      <p>Copyright 2020 Evan You</p>
    </template>
  </blog-post>
</template>

<script>
const app = createApp({});
app.component('blog-post', {
  render() {
    return h('div', [
      h('header', this.$slots.header()),
      h('main', this.$slots.default()),
      h('footer', this.$slots.footer())
    ]);
  }
});
</script>