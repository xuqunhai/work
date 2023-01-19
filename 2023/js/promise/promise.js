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
  excutor(resolve, reject)
}
Promise.prototype.then = function () {}
