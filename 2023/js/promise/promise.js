function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  function resolve(data) {
    this.promiseStatus = 'resolved'
    this.promiseStatus = data
  }
  function reject(data) {}
  excutor(resolve, reject)
}
Promise.prototype.then = function () {}
