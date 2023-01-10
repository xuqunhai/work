<template>
  <!-- 在 colums 中去配置每行需要显示的属性，通过 render 函数可以返回定制化的结果，再使用 h 函数返回 Button，渲染出对应的按钮。 -->
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>
<script>
import { h, defineComponent } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
const createColumns = ({ sendMail }) => {
  return [
    {
      title: 'Name',
      key: 'name',
      align: 'center'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => 'Send Email' }
        )
      }
    }
  ]
}
const createData = () => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32
  }
]
export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      data: createData(),
      columns: createColumns({
        sendMail(rowData) {
          message.info('send mail to ' + rowData.name)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>
