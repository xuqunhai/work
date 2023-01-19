function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  var _this = this
  function resolve(data) {
    _this.promiseStatus = 'resolved'
    _this.promsieResult = data
  }
  function reject(data) {
    _this.promiseStatus = 'rejected'
    _this.promsieResult = data
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
Promise.prototype.then = function () {}
