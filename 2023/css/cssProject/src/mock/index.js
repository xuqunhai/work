import Mock from 'mockjs'
Mock.setup({
  timeout: '300-600'
})

Mock.mock('/api/user', 'get', getUser)
function getUser() {
  return Mock.mock({
    data: {
      data: {
        name: '@cname',
        'phone|11': '@integer(0, 9)',
        city: '@city'
      },
      status: '200',
      msg: '请求成功'
    }
  })
}

export default Mock
