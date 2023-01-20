function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  var _this = this
  function resolve(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'resolved'
    _this.promsieResult = data
  }
  function reject(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'rejected'
    _this.promsieResult = data
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
}
