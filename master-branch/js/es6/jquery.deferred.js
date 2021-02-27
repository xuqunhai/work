Deferred = function () {
  var arr = [
    [
      cb('once memory'), 'done', 'resolve'
    ],
    [
      cb('once memory'), 'fail', 'reject'
    ],
    [
      cb('memory'), 'progress', 'notify'
    ]
  ];
  var pedding = true;
  var deferred = {};
  for (var i = 0; i < arr.length; i++) {
    deferred[arr[i][1]] = (function (index) {
      return function (func) {
        arr[index][0].add(func)
      }
    })(i);
    deferred[arr[i][2]] = (function (index) {
      return function () {
        var args = arguments;
        if (pedding) {
          arr[index][0].fire.apply(window, args);
          arr[index][2] == 'resolve' || arr[index][2] == 'reject' ? pedding = false : '';
        }
      }
    })(i);
  }
}

function some() {
  var fire = function () {
    for (; fireIndex < list.length; fireIndex++) {
      list[fireIndex].apply(window, args)
    }
    if (options.indexOf('once') != -1) {
      list = [];
      fireIndex = 0;
    }

  }
  return {
    add: function (func) {
      list.push(func);
      if (options.indexOf('memory') != -1 && fired) {
        fire()
      }
      return this;
    },
    fire: function () {
      fireIndex = 0;
      args = arguments;
      fired = true;
      fire();
    }
  }
}