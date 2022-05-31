var passiveSupported = false

try {
  var options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
} catch (err) {}

// passiveSupported默认为false，options.passive被访问时会变成true
export default passiveSupported
