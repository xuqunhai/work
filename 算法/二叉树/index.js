/*
分层数据的抽象模型
DOM树、级联选择、树形控件

深度优先遍历-递归
const dfs=root=>{
  console.log(root.val)
  root.children.forEach(dfs)
}

广度优先遍历
1根节点入队
2队头出队并访问
3队头children挨个入队
4重复2、3步，直到队列为空

const bfs=(root)=>{
  const q=[root]
  while(q.length>0){
    const n=q.shift()
    console.log(n.val)
    n.children.forEach(child=>q.push(child))
  }
}
*/
