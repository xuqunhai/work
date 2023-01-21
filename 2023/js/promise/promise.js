function Promise(excutor) {
  this.promiseStatus = 'pending'
  this.promsieResult = null
  this.callback = []
  var _this = this
  function resolve(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'resolved'
    _this.promsieResult = data
    setTimeout(() => {
      _this.callback.forEach((item) => item.resFn(_this.promsieResult))
    })
  }
  function reject(data) {
    if (_this.promiseStatus !== 'pending') return
    _this.promiseStatus = 'rejected'
    _this.promsieResult = data
    setTimeout(() => {
      _this.callback.forEach((item) => item.rejFn(_this.promsieResult))
    })
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
Promise.prototype.then = function (resFn, rejFn) {
  const _this = this
  if (typeof resFn !== 'function') {
    resFn = (val) => val
  }
  if (typeof rejFn !== 'function') {
    rejFn = (reason) => {
      throw 'reject'
    }
  }
  return new Promise((resolve, reject) => {
    const cb = function (type) {
      try {
        // 不仅回调，还要处理返回值，则外面包一层函数，里面一并处理
        let result = type(_this.promsieResult)
        if (result instanceof Promise) {
          // 想获取promise对象状态，可通过then拿到
          result.then(
            (v) => resolve(v),
            (r) => reject(r)
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.promiseStatus === 'resolved') {
      setTimeout(() => {
        cb(resFn)
      })
    }
    if (this.promiseStatus === 'rejected') {
      setTimeout(() => {
        cb(rejFn)
      })
    }
    if (this.promiseStatus === 'pending') {
      this.callback.push({
        resFn: function () {
          cb(resFn)
        },
        rejFn: function () {
          cb(rejFn)
        }
      })
    }
  })
}

Promise.prototype.catch = function (rejFn) {
  this.then(undefined, rejFn)
}

Promise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    if (val instanceof Promise) {
      val.then(
        (v) => resolve(v),
        (r) => reject(r)
      )
    } else {
      resolve(val)
    }
  })
}

Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}

Promise.all = function (promises) {
  const arr = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          arr[i] = v
          if (arr.length === promises.length) {
            resolve(arr)
          }
        },
        (r) => reject(r)
      )
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => resolve(v),
        (r) => reject(r)
      )
    }
  })
}
