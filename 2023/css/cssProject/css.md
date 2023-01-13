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
分层：七层（纵向）
Settings - 变量var
Tools - scss的mixin/function
Generic - normalize重置默认
Base - 基础样式定制化设置 form.scss/a.scss
Objects - 通用模块,集成在了components组件里
Components - 组件,集成在了components组件里
Trumps - 权重需要最高时

ACSS
一个样式属性一个类
tailwindcss
好吃：极强复用性，维护成本低
坏处：破坏了CSs命名语义化