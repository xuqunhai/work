<template>
  <div class="el-table">
    <div class="hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <div class="el-table__header-wrapper" ref="headerWrapper">
      <table-header ref="tableHeader" :store="store"> </table-header>
    </div>
    <div class="el-table__body-wrapper" ref="bodyWrapper">
      <table-body :context="context" :store="store"> </table-body>
    </div>
  </div>
</template>

<script>
// table 提供了整个表格的标签容器；
// hidden-columns 负责隐藏列的显示，并且通过 table-store 进行表格内部的状态管理。
// 每当 table 中的 table-store 被修改后，table-header、table-body 都需要重新渲染。
export default {
  created() {
    // 使用 createStore 创建表格的 store 数据管理，并且通过 TableLayout 创建表格的布局，然后把 store 通过属性的方式传递给 table-header 和 table-body。
    let table = getCurrentInstance()
    const store = createStore(table, {
      rowKey: props.rowKey,
      defaultExpandAll: props.defaultExpandAll,
      selectOnIndeterminate: props.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: props.indent,
      lazy: props.lazy,
      lazyColumnIdentifier: props.treeProps.hasChildren || 'hasChildren',
      childrenColumnName: props.treeProps.children || 'children',
      data: props.data
    })
    table.store = store
    const layout = new TableLayout({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader
    })
    table.layout = layout

    // table-header 组件内部会接收传递的 store，并且提供监听的事件，包括 click，mousedown 等鼠标操作后，计算出当前表头的宽高等数据进行显示。
    const instance = getCurrentInstance()
    const parent = instance.parent
    const storeData = parent.store.states
    const filterPanels = ref({})
    const { tableLayout, onColumnsChange, onScrollableChange } =
      useLayoutObserver(parent)
    const hasGutter = computed(() => {
      return !props.fixed && tableLayout.gutterWidth
    })
    onMounted(() => {
      nextTick(() => {
        const { prop, order } = props.defaultSort
        const init = true
        parent.store.commit('sort', { prop, order, init })
      })
    })
    const {
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick
    } = useEvent(props, emit)
    const {
      getHeaderRowStyle,
      getHeaderRowClass,
      getHeaderCellStyle,
      getHeaderCellClass
    } = useStyle(props)
    const { isGroup, toggleAllSelection, columnRows } = useUtils(props)

    instance.state = {
      onColumnsChange,
      onScrollableChange
    }
    // eslint-disable-next-line
    instance.filterPanels = filterPanels
  },
  // 在 table-body 中，也是类似的实现方式和效果。不过 table-body 和 table-header 中的定制需求较多，我们需要用 render 函数来实现定制化的需求。
  // 利用 h 函数返回 el-table__body 的渲染，通过 state 中读取的 columns 数据依次进行数据的显示。
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
}
</script>
