interface geekCourse {
  name: string,
  price: number[],
  buyer: string,
  teacherIcon: string | boolean,
  say(): string
}

let vueCouse: geekCourse = {
  name: 'vue',
  price: [50],
  buyer: 'kevin',
  teacherIcon: false,
  say() {
    return '88'
  }
}

interface App<HostElement = any> {
  version: string
  use(...options: any[]): this
  unmount(): void
  proivde<T>(key: string, value: T): this
  _uid: number
  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this
}

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

const props = defineProps<{
  title: string
  value?: number
}>()

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

interface Todo {
  title: string,
  done: boolean
}

import { ref, Ref } from 'vue'
let todos: Ref<Todo[]> = ref([{ title: 'learn vue', done: false }])