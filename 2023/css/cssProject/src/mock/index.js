import Mock from 'mockjs'
Mock.setup({
  timeout: '300-600'
})

Mock.mock('/api/user', 'get', getUsers)
function getUsers() {
  return Mock.mock({
    data: {
      'data|3': [
        {
          name: '@cname',
          age: '@integer(20, 50)',
          'phone|11': '@integer(0, 9)',
          city: '@city'
        }
      ],
      status: '200',
      msg: '请求成功'
    }
  })
}

export default Mock
