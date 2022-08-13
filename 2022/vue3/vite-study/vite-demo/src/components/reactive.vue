<script setup>
/*
reactive方法用来创建响应式对象，
它接收一个对象/数组参数，返回对象的响应式副本，
当该对象的属性值发生变化，会自动更新使用该对象的地方。
下面以分别以对象和数组作为参数演示：
*/
import { reactive } from 'vue';

let reactiveObj = reactive({ name: 'Chris1993' });
let setReactiveObj = () => {
  reactiveObj.name = 'Hello Chris1993';
};

let reactiveArr = reactive(['a', 'b', 'c', 'd']);
let setReactiveArr = () => {
  reactiveArr[1] = 'Hello Chris1993';
};

/*
reactive 可以用在深层对象或数组吗？
答案是可以的，reactive是基于 ES2015 Proxy API 实现的，它的响应式是整个对象的所有嵌套层级。
*/
let reactiveDeepObj = reactive({
  user: { name: 'Chris1993' }
});
let setReactiveDeepObj = () => {
  reactiveDeepObj.user.name = 'Hello Chris1993';
};

let reactiveDeepArr = reactive(['a', ['a1', 'a2', 'a3'], 'c', 'd']);
let setReactiveDeepArr = () => {
  reactiveDeepArr[1][1] = 'Hello Chris1993';
};

/*
reactive 返回值和源对象相等吗？
答案是不相等的，因为reactive是基于 ES2015 Proxy API 实现的，返回结果是个 proxy 对象。
*/
let reactiveSource = { name: 'Chris1993' };
let reactiveData = reactive(reactiveSource);

console.log(reactiveSource === reactiveData);
// false

console.log(reactiveSource);
// {name: 'Chris1993'}

console.log(reactiveData);
// Reactive<{name: 'Chris1993'}>

/**
TypeScript 如何写 ref 和 reactive 参数类型？
在使用 TypeScript 写 ref / reactive 参数类型时，可以根据 ref / reactive 接口类型来实现具体的类型：
function ref<T>(value: T): Ref<T>
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>

import { ref } from 'vue'
let refValue = ref<string>('Chris1993');
// refValue 类型为： Ref<string>
let setRefValue = () => {
  refValue.value = 'Hello Chris1993'; // ok!
  refValue.value = 1993; // error!
}
// reactive也类似
let reactiveValue = reactive<{name: string}>({name: 'Chris1993'});
 */

// reactive的属性值可以是 ref值；
// 这是因为 reactive将会对所有深层的 refs进行解包，并且保持 ref的响应式。
let name = ref('Chris1993');
let nameReactive = reactive({ name });
console.log(name.value === nameReactive.name); // true

name.value = 'Hello Chris1993';
console.log(name.value); // Hello Chris1993
console.log(nameReactive.name); // Hello Chris1993

nameReactive.name = 'Hi Chris1993';
console.log(name.value); // Hi Chris1993
console.log(nameReactive.name); // Hi Chris1993

// 当通过赋值方式将 ref分配给 reactive属性时，ref也会自动被解包：
// ref本质也是 reactive，ref(obj)等价于 reactive({value: obj})。
let name2 = ref('Chris1993');
let nameReactive2 = reactive({});
nameReactive2.name = name2;

console.log(name2.value); // Chris1993
console.log(nameReactive2.name); // Chris1993
console.log(name2.value === nameReactive2.name); // true
</script>

<template>
  <div>
    <h2>Vue3 reactive API Base</h2>
    <div>
      Object:{{reactiveObj.name}}
      <span @click="setReactiveObj">Update</span>
    </div>
    <div>
      Array:{{reactiveArr}}
      <span @click="setReactiveArr">Update</span>
    </div>
    <h2>Vue3 reactive deep API Base</h2>
    <div>
      Object:{{reactiveDeepObj.user.name}}
      <span @click="setReactiveDeepObj">Update</span>
    </div>
    <div>
      Array:{{reactiveDeepArr}}
      <span @click="setReactiveDeepArr">Update</span>
    </div>
  </div>
</template>