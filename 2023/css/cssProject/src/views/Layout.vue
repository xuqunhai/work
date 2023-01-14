<template>
  <c-layout>
    <c-header fixed style="background: pink">header</c-header>
    <c-layout horizontal>
      <c-aside style="background: blue">aside</c-aside>
      <c-main style="background: green">
        <div style="height: 1000px">
          <div>main</div>
          <div>main</div>
          <div>main</div>
        </div>
      </c-main>
    </c-layout>
    <c-footer style="background: yellow">footer</c-footer>
  </c-layout>
</template>
