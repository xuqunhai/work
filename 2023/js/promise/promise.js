function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  var _this = this
  function resolve(data) {
    _this.promiseStatus = 'resolved'
    _this.promiseStatus = data
  }
  function reject(data) {}
  excutor(resolve, reject)
}
Promise.prototype.then = function () {}
