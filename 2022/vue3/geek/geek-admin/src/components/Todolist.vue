<template>
  <div>
    <span class="dustbin"> 🗑 </span>
    <div class="animate-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没输入！</div>
      </div></transition
    >
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)"> ❌ </span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
</template>

<script setup>
// import { ref, computed } from 'vue'
// let title = ref('')
// let todos = ref([{ title: '学习Vue', done: false }])

// function addTodo() {
//   todos.value.push({
//     title: title.value,
//     done: false
//   })
//   title.value = ''
// }
// function clear() {
//   todos.value = todos.value.filter((v) => !v.done)
// }
// let active = computed(() => {
//   return todos.value.filter((v) => !v.done).length
// })
// let all = computed(() => todos.value.length)
// let allDone = computed({
//   get: function () {
//     return active.value === 0
//   },
//   set: function (value) {
//     todos.value.forEach((todo) => {
//       todo.done = value
//     })
//   }
// })

import { ref, reactive, watchEffect, computed } from 'vue'

function useStorage(name, value = '[]') {
  let data = ref(JSON.parse(localStorage.getItem(name) || value))
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}

function useTodos() {
  let title = ref('')
  // let todos = ref(
  //   JSON.parse(
  //     localStorage.getItem('todos') || `[{ title: '学习Vue', done: false }]`
  //   )
  // )
  // watchEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos.value))
  // })
  let todos = useStorage('todos', '[]')
  let showModal = ref(false)
  function addTodo() {
    console.log('addTodo', title.value)
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 1500)
      return
    }
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = ''
  }

  let animate = reactive({ show: false, el: null })
  // 在 beforeEnter 函数中，通过 getBoundingClientRect 函数获取鼠标的点击位置，让动画元素通过 translate 属性移动到鼠标所在位置；
  function beforeEnter(el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect()
    let x = window.innerWidth - rect.left - 60
    let y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
  }
  // enter 钩子中，把动画元素移动到初始位置
  function enter(el, done) {
    document.body.offsetHeight
    el.style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
  }
  // 动画结束后，把动画元素再隐藏起来
  function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
  }
  function removeTodo(e, i) {
    animate.el = e.target
    animate.show = true
    setTimeout(() => {
      todos.value.splice(i, 1)
    }, 100)
  }

  function clear() {
    todos.value = todos.value.filter((v) => !v.done)
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length
  })
  let all = computed(() => todos.value.length)
  let allDone = computed({
    get: function () {
      return active.value === 0
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value
      })
    }
  })
  return {
    animate,
    beforeEnter,
    afterEnter,
    enter,
    showModal,
    title,
    todos,
    addTodo,
    removeTodo,
    clear,
    active,
    all,
    allDone
  }
}

let count = ref(1)
function add() {
  count.value++
}
let {
  animate,
  beforeEnter,
  afterEnter,
  enter,
  showModal,
  title,
  todos,
  addTodo,
  removeTodo,
  clear,
  active,
  all,
  allDone
} = useTodos()
</script>

<style>
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-leave-active {
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.dustbin,
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>

<style lang="scss" scoped>
$padding: 10px;
$white: #fff;
ul {
  width: 500px;
  margin: 0 auto;
  padding: 0;
  li {
    &:hover {
      cursor: pointer;
    }
    list-style-type: none;
    margin-bottom: $padding;
    padding: $padding;
    background: $white;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
