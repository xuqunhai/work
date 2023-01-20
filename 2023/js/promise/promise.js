function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  this.callback = []
  var _this = this
  function resolve(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'resolved'
    _this.promsieResult = data
    _this.callback.forEach((item) => item.resFn(_this.promsieResult))
  }
  function reject(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'rejected'
    _this.promsieResult = data
    _this.callback.forEach((item) => item.rejFn(_this.promsieResult))
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
Promise.prototype.then = function (resFn, rejFn) {
  return new Promise((resolve, reject) => {
    if (this.promiseStatus === 'resolved') {
      let result = resFn(this.promsieResult)
      if (result instanceof Promise) {
        result.then(
          (v) => resolve(v),
          (r) => reject(r)
        )
      } else {
        resolve(result)
      }
    }
    if (this.promiseStatus === 'rejected') {
      let result = rejFn(this.promsieResult)
      if (result instanceof Promise) {
        result.then(
          (v) => resolve(v),
          (r) => reject(r)
        )
      } else {
        resolve(result)
      }
    }
    if (this.promiseStatus === 'pending') {
      this.callback.push({
        resFn,
        rejFn
      })
    }
  })
}
