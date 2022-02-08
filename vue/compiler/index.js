/*
_n toNumber
_s toString
_l renderList
_t renderSlot
_m renderStatic
_v createTextNVode
_e createEmptyVNode
_q looseTqual
_i looseIndexOf
_f resolveFilter
_k checkKeyCodes
*/

const compiler = require('vue-template-compiler');

const template1 = `<p>{{ message }}</p>`;
const compiler1 = compiler.compile(template1);
console.log('模版插值 ', compiler1.render);
// compiler1.rendr -> with(this){return _c('p',[_v(_s(message))])} - h('p', {}, [...])
// this -> new Vue()
// _c -> createElement -> return vnode
// _v(_s(message) -> createTextVNode(toString(message))
/*
{
  ast: {
    type: 1,
    tag: 'p',
    attrsList: [],
    attrsMap: {},
    rawAttrsMap: {},
    parent: undefined,
    children: [ [Object] ],
    plain: true,
    static: false,
    staticRoot: false
  },
  render: "with(this){return _c('p',[_v(_s(message))])}",
  staticRenderFns: [],
  errors: [],
  tips: []
}
*/

const template2 = `<p>{{ flag ? message : 'no message found' }}</p>`;
const compiler2 = compiler.compile(template2);
console.log('表达式 ', compiler2.render);
// with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}

const template3 = `
  <div id="div1" class="container">
    <img :src="imgUrl" />
  </div>
`;
const compiler3 = compiler.compile(template3);
console.log('属性和动态属性 ', compiler3.render);
// with(this){return _c('div',{staticClass:"container",attrs:{"id":"div1"}},[_c('img',{attrs:{"src":imgUrl}})])}

const template4 = `
  <div>
    <p v-if="flag === 'a'">A</p>
    <p v-else>B</p>
  </div>
`;
const compiler4 = compiler.compile(template4);
console.log('条件 ', compiler4.render);
// with(this){return _c('div',[(flag === 'a')?_c('p',[_v("A")]):_c('p',[_v("B")])])}

const template5 = `
 <ul>
  <li v-for="item in list" :key="item.id">{{ item.title }}</li>
 </ul>
`;
const compiler5 = compiler.compile(template5);
console.log('循环 ', compiler5.render);
// with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}

const template6 = `
  <button @click="clickHandler">submit</button>
`;
const compiler6 = compiler.compile(template6);
console.log('事件 ', compiler6.render);
// with(this){return _c('button',{on:{"click":clickHandler}},[_v("submit")])}

const template7 = `
  <input type="text" v-model="name" />
`;
const compiler7 = compiler.compile(template7);
console.log('v-model ', compiler7.render);
// with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}

const template8 = `
  <body>
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </body>
`;
const compiler8 = compiler.compile(template8);
console.log('slot ', compiler8.render);
// with(this){return _c('body',[_t("header"),_v(" "),_t("default"),_v(" "),_t("footer")],2)}
