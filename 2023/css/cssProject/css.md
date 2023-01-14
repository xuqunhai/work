BEM
块 元素 修饰符
menu__tab--active

CSS模块化可扩展架构

SMACSS
分类：Base(浏览器默认样式重置normalize.css)、Layout（grid.css）、Modules(模块通用样式, article.css / menu.css)、State（状态）、Theme（换肤）
.l-header / .is-hidden / .theme-nav

vue里面只有base / state / theme，
layout和modules都集成在了components组件里

ITCSS
分层：七层（纵向）- 下一层继承上一层，下一层权重越高，复用性越低
Settings - 变量var（颜色、边框、字体大小、阴影、层级...）
Tools - scss的mixin/function - SassMagic工具库
Generic - normalize重置默认
Base - 基础样式定制化设置 form.scss/a.scss，对各类元素基础样式进行补充
Objects - 通用模块,集成在了components组件里
Components - 组件,集成在了components组件里
Trumps - 权重需要最高时

ACSS
一个样式属性一个类
tailwindcss
好吃：极强复用性，维护成本低
坏处：破坏了CSS命名语义化

scss和sass区别
写法
sass
$border-dark: #fff
.alert
 border: 1px splid $border-dark

scss
$border-dark: #fff;
.alert {
  border: 1px splid $border-dark;
}