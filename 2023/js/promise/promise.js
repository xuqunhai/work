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
  if (this.promiseStatus === 'resolved') {
    resFn(this.promsieResult)
  }
  if (this.promiseStatus === 'rejected') {
    rejFn(this.promsieResult)
  }
  if (this.promiseStatus === 'pending') {
    this.callback.push({
      resFn,
      rejFn
    })
  }
}
