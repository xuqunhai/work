"use strict";

var _dec, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// 张三
var oInput = document.getElementById('inp');
var oBtn = document.getElementById('btn');
var Search = (_dec = dealData('张三'), Skin(_class = (_class2 = (_temp =
/*#__PURE__*/
function () {
  function Search() {
    _classCallCheck(this, Search);

    _initializerDefineProperty(this, "url", _descriptor, this);

    this.keyValue = '';
  }

  _createClass(Search, [{
    key: "getContent",
    value: function getContent(a, b) {
      console.log('向' + this.url + '发送网络请求, 数据:' + this.keyValue, a, b);
      return 10;
    }
  }]);

  return Search;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [myReadOnly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'urlA-';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "getContent", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "getContent"), _class2.prototype)), _class2)) || _class);
;

function Skin(target) {
  target.aaa = 30;
}

var oS = new Search(); // oS.url = 20;

oInput.oninput = function () {
  oS.keyValue = this.value;
};

oBtn.onclick = function () {
  oS.getContent(1, 2);
}; // 
// 李四 
// 装饰私有属性 
// function myReadOnly (proto, key, descriptor) {
//     // console.log(proto, key, descriptor);
//     descriptor.writable = false;
//     descriptor.initializer = function () {
//         return 6;
//     }
// }
// 原型上的属性的话
// function dealData (proto, key, descriptor) {
//     console.log(proto, key, descriptor);
//     let oldValue = descriptor.value;
//     // 代理思想
//     descriptor.value = function () {
//         var urlB = 'urlB-';
//         console.log('向' + urlB + '发送网络请求, 数据:' + this.keyValue);
//         return oldValue.apply(this, arguments);
//     }
// }
// function dealData (ms) {
//     return function (proto, key, descriptor) {
//         console.log(proto, key, descriptor);
//         let oldValue = descriptor.value;
//         // 代理思想
//         descriptor.value = function () {
//             var urlB = 'urlB-';
//             console.log('向' + urlB + '发送网络请求, 数据:' + this.keyValue + ms);
//             return oldValue.apply(this, arguments);
//         }        
//     }
// }
// var keyValue = '';
// oInput.oninput = function () {
//     keyValue = this.value;
// };
// oBtn.onclick = function () {
//     newGetContent(keyValue);
// };
// function getContent (data) {
//     var url = 'urlA-';
//     console.log('向' + url + '发送网络请求, 数据:' + data);
// }
// var newGetContent = dealFunc(getContent);
// 李四
// function dealFunc (func) {
//     return function (data) {
//         // 
//         var urlB = 'urlB-';
//         console.log('向' + urlB + '发送网络请求, 数据:' + data);
//         return func.apply(this, arguments);
//     }
// };
