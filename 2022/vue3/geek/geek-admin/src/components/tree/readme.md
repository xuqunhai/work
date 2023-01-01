如何设计一个树形组件？
https://github.com/hug-sun/element3/blob/master/packages/element3/packages/tree/Tree.vue

tree 组件具体要分成三个组件进行实现。
最外层的 tree 组件负责整个树组件的容器，内部会通过 provide 方法为子元素提供全局的配置和操作方法。每个 tree 的配置中的 title、expanded、checked 树形作为树组件显示的主体内容。children 是一个深层嵌套的数组，我们需要用递归组件的方式渲染出完成的树，
tree 内部的 tree-node 组件就负责递归渲染出完成的树形结构。
最后，我们想支持树节点的自定义渲染，这就需要在 teree-node 内部定制 tree-node-content 组件，用来渲染用户传递的 render-content 或者默认的插槽函数。

树形组件的节点可以无限展开，父节点可以展开和收起节点，并且每一个节点有一个复选框，可以切换当前节点和所有子节点的选择状态。另外，同一级所有节点选中的时候，父节点也能自动选中。
{ 
  expandedList: [4, 5], 
  checkedList: [5], 
  data: [ 
    { 
      id: 1, 
      label: '一级 1', 
      children: [ 
        { 
          id: 4, 
          label: '二级 1-1', 
          children: [ 
            { id: 9, label: '三级 1-1-1' }, 
            { id: 10, label: '三级 1-1-2' } 
          ] 
        } 
      ] 
    }, 
    { 
      id: 2, 
      label: '一级 2', 
      children: [ 
        { 
          id: 5, 
          label: '二级 2-1' 
        }, 
        { 
          id: 6, 
          label: '二级 2-2' 
        } 
      ] 
    } 
  ], 
  defaultNodeKey: { 
    childNodes: 'children', 
    label: 'label' 
  } 
}

leetcode 第 226 题反转二叉树，题目的描述很简单，就是把属性结构反转

var invertTree = function(root) {
  // 递归 终止条件
  if(root==null) {
    return root
  }
  // 递归的逻辑
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}