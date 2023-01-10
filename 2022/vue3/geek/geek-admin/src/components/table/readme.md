table 标签负责表格的容器，thead 负责表头信息的容器，tbody 负责表格的主体，tr 标签负责表格的每一行，th 和 td 分别负责表头和主体的单元格。

表格组件的使用风格，从设计上说也分为了两个方向。一个方向是完全由数据驱动，这里我们可以参考 Naive Ui 的使用方式，n-data-table 标签负责容器，直接通过 data 属性传递数据，通过 columns 传递表格的表头配置。
还有一种是 Element3 现在使用的风格，配置数据之后，具体数据的展现形式交给子元素来决定，把 columns 当成组件去使用.

支持表头或者某一列的锁定，在滚动的时候锁定列不受影响。一个 table 标签很难实现这个效果，这时候我们就需要分为 table-head 和 table-body 两个组件进行维护，通过 colgroup 组件限制每一列的宽度实现表格的效果，而且表头还需要支持表头嵌套。

表头还需要支持点击事件，点击后对当前这一列实现排序的效果，同时每一列还可能会有详情数据的展开，甚至表格内部还会有树形组件的嵌套、底部的数据显示等等。
把这些需求组合在一起，表格就成了组件库中最复杂的组件。我们需要先分解需求，把组件内部拆分成 table、table-column、table-body、table-header 组件

table 提供了整个表格的标签容器；
hidden-columns 负责隐藏列的显示，并且通过 table-store 进行表格内部的状态管理。
每当 table 中的 table-store 被修改后，table-header、table-body 都需要重新渲染。

<template>
  <div class="el-table">
    <div class="hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <div class="el-table__header-wrapper"
         ref="headerWrapper">
      <table-header ref="tableHeader"
                    :store="store">
      </table-header>
    </div>
    <div class="el-table__body-wrapper"
         ref="bodyWrapper">
      <table-body :context="context"
                  :store="store">                  
      </table-body>
    </div>
  </div>
</template>

table-body 和 table-header 中的定制需求较多，我们需要用 render 函数来实现定制化的需求。

render() {
    return h(
      'table',
      {
        class: 'el-table__body',
        cellspacing: '0',
        cellpadding: '0',
        border: '0'
      },
      [
        hColgroup(this.store.states.columns.value),
        h('tbody', {}, [
          data.reduce((acc, row) => {
            return acc.concat(this.wrappedRowRender(row, acc.length))
          }, []),
          h(
            ElTooltip,
            {
              modelValue: this.tooltipVisible,
              content: this.tooltipContent,
              manual: true,
              effect: this.$parent.tooltipEffect,
              placement: 'top'
            },
            {
              default: () => this.tooltipTrigger
            }
          )
        ])
      ]
    )
  }

一旦数据量庞大之后，表格就成了最容易导致性能瓶颈的组件，那这种场景如何去做优化呢？
在虚拟列表解决方案中，我们首先要获取窗口的高度、元素的高度以及当前滚动的距离，通过这些数据计算出当前屏幕显示出来的数据。然后创建这些元素标签，设置元素的 transform 属性模拟滚动效果。这样表面看是 1000 条数据在表格里显示，实际只渲染了屏幕中间的这 100 行数据，当我们滚动鼠标的同时，去维护这 100 个数据列表，这样就完成了标签过多的性能问题。
如果表格内部每一行的高度不同的话，我们就需要对每一个元素的高度进行估计。具体操作时，先进行渲染，然后等待渲染完毕之后获取高度并且缓存下来，即可实现虚拟列表元素高度的自适应。

虚拟滚动也是面试的热门解决方案，你一定要手敲一遍才能加深理解。