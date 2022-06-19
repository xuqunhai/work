import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app0 = createApp(App);
app0.use(router);
app0.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app0.component(key, component);
}

import 'virtual:windi.css';

app0.mount('#app');
// setTimeout(() => app0.unmount(), 5000);

// 调用 createApp 返回一个应用实例。影响仅限于该特定应用实例
// 由于 createApp 方法返回应用实例本身，因此可以在其后链式调用其它方法

const app = createApp({
  hello: 'app',
  mounted() {
    // console.log('createApp mounted: ', this.$options.hello);
  }
});
app.mixin({
  hello: 'mixin',
  mounted() {
    // mixin mounted:  undefined,mixin;,app;
    /*
    undefined,mixin; -> parent:undefined, child:mixin
    (undefined,mixin;),app; -> parent:(undefined,mixin;), child:app
    */
    console.log('mixin mounted: ', this.$options.hello);
  }
});
app.config.optionMergeStrategies.hello = (parent, child) => {
  return `${parent},${child};`;
};
app.mount('#app2');

// const app2 = createApp();

// console.log(app.config);

// console.log(app2);

// ['isNativeTag', 'performance', 'globalProperties', 'optionMergeStrategies', 'errorHandler', 'warnHandler', 'compilerOptions']
/*
应用配置

组件渲染函数和侦听器执行期间抛出的未捕获错误
app.config.errorhandle=(err,vm,info)=>{}
`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子

为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，
app.config.warnHandler=(msg,vm,trace){}
`trace` 是组件的继承关系追踪

添加一个可以在应用的任何组件实例中访问的全局 property。组件的 property 在命名冲突时具有优先权。
app.config.globalProperties.$http = () => {}
app.config.globalProperties.foo = 'bar'
app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})

performance
默认：false
设置为 true ,在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。
只适用于开发模式和支持 performance.mark API 的浏览器。

compilerOptions
配置运行时编译器的选项。
该配置选项只在完整的构建版本中生效 (即可以在浏览器中编译模板的独立版 vue.js)。
如果你使用的是附带额外构建设置的仅运行时版本，编译器选项必须通过构建工具的配置传入
对 vite 来说：通过 @vitejs/plugin-vue 选项传入。
// 任何以 'ion-' 开头的元素都会被识别为自定义元素
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
如果一个组件匹配了这个条件，它就不需要在本地或全局注册，Vue 也不会抛出 Unknown custom element 的警告。
注意所有的原生 HTML 和 SVG 标记都不需要被这个函数匹配——Vue 的解析器会自动进行这项检查。
app.config.compilerOptions.whitespace = 'preserve'
默认情况下，Vue 会移除/压缩模板元素之间的空格以产生更高效的编译结果：
元素之间的包括折行在内的多个空格会被移除
文本结点之间可被压缩的空格都会被压缩成为一个空格
将值设置为 'preserve' 可以禁用。
app.config.compilerOptions.comments = true
将这个选项设置为 true 可以强制 Vue 在生产环境下保留注释。而在开发环境下注释是始终被保留的。
这个选项一般会用于依赖 HTML 注释的其它库和 Vue 配合使用。


*/
// console.log(Object.keys(app.config));

// ['_uid', '_component', '_props', '_container', '_context', '_instance', 'version', 'config', 'use', 'mixin', 'component', 'directive', 'mount', 'unmount', 'provide']
// console.log(Object.keys(app2));

// 注册一个选项对象
app.component('my-component', {
  /* ... */
});
// 检索注册的组件
const MyComponent = app.component('my-component');
console.log('MyComponent: ', MyComponent);
