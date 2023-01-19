function Promise(excutor) {
  function resolve(data) {}
  function reject(data) {}
  excutor(resolve, reject)
}
Promise.prototype.then = function () {}
