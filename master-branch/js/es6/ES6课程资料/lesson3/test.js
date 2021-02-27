"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { 
  if (typeof superClass !== "function" && superClass !== null) { 
    throw new TypeError("Super expression must either be null or a function"); 
  } 
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); 
  if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { 
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { 
    o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { 
  if (!(instance instanceof Constructor)) { 
    throw new TypeError("Cannot call a class as a function"); 
  } 
}

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { 
  if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
  if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
}

// class
// class 
// 私有属性 公属性（原型属性） 静态属性 （函数属性）
var Plane =
/*#__PURE__*/
function () {
  _createClass(Plane, null, [{
    key: "alive",
    // ES7
    // static alive = 10;
    value: function alive() {
      return true;
    }
  }]);

  function Plane(name) {
    _classCallCheck(this, Plane);

    this.name = name || '普通飞机';
    this.blood = 100;
  }

  _createClass(Plane, [{
    key: "fly",
    value: function fly() {
      console.log('fly');
    } // ES7 私有属性
    // name = 10;

  }]);

  return Plane;
}();

;
Plane(); //

var AttackPlane =
/*#__PURE__*/
function (_Plane) {
  _inherits(AttackPlane, _Plane);

  function AttackPlane(name) {
    var _this;

    _classCallCheck(this, AttackPlane);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AttackPlane).call(this, name));
    _this.logo = 'duyi';
    return _this;
  }

  _createClass(AttackPlane, [{
    key: "dan",
    value: function dan() {
      console.log('biubiubiu');
    }
  }]);

  return AttackPlane;
}(Plane);

var oAp = new AttackPlane('攻击机'); //ES5
//1. must be new
//2. class Plane.prototype 不能枚举
//3. 静态属性要放到Plane 非原型
