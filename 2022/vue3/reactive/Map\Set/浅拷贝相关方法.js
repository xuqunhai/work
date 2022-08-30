// assign方法效果类似于在数组中的concat拼接方法
// 但需要注意的是Object.assign()其方法自身实行的便是浅拷贝，而不是深拷贝
{
  var testObj = {
    'name': 'currName',
    'nums': [1, [2, 3]],
    'objs': {
      'innerObj': 'content'
    }
  }
  var secObj = Object.assign({}, testObj)
  secObj.name = 'changedName'
  secObj.nums[0] = '一'
  secObj.nums[1] = ['二', '三']
  secObj.objs['innerObj'] = 'changedContent'
  console.log(testObj) // { name: 'currName',
                      //   nums: [ '一', [ '二', '三' ] ],
                      //   objs: { innerObj: 'changedContent' } }
  console.log(secObj) // { name: 'changedName',
                      //   nums: [ '一', [ '二', '三' ] ],
                      //   objs: { innerObj: 'changedContent' } }
}

// Object.freeze()
// 被freeze方法冻结过的对象，其自身也无法添加、删除或修改其第一层数据
{
  var testObj = {
    'name': 'currName',
    'nums': [1, [2, 3]],
    'objs': {
      'innerObj': 'content'
    }
  }
  var secObj = Object.freeze(testObj)
  secObj.name = 'changedName'
  secObj.nums[0] = '一'
  secObj.nums[1] = ['二', '三']
  secObj.objs['innerObj'] = 'changedContent'
  secObj.age = 18
  delete secObj.name
  console.log(testObj) // { name: 'currName',
                      //   nums: [ '一', [ '二', '三' ] ],
                      //   objs: { innerObj: 'changedContent' } }
  console.log(secObj) // { name: 'currName',
                      //   nums: [ '一', [ '二', '三' ] ],
                      //   objs: { innerObj: 'changedContent' } }
}