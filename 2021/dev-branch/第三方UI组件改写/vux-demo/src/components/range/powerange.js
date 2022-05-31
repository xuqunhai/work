import { findClosest, getWidth, percentage } from './utils'
import classes from './lib/classes'
import mouse from './lib/mouse'
import events from './lib/events'

// init() -> 显示页面元素并绑定事件
// step() -> 需要step时计算steps数组
// setStart() -> 设置圆球left、进度条宽度和当前值
function Horizontal (element, options) {
  this.element = element
  this.options = options || {}
  this.slider = this.create('span', 'range-bar')
  this.hasAppend = false
  this.rangeToast = null
  this.rangeDot = null
  this.rangeHandle = null

  if (this.element !== null && this.element.type === 'text') this.init()
  if (this.options.step) {
    // console.log(this.slider); // range-bar整个
    // console.log(this.slider.offsetWidth); // 总宽度
    // console.log(this.handle); // range-handle圆球, getWidth获取直径，当为100%或auto时直接设为0
    // 计算step步数放入数组
    this.step(this.slider.offsetWidth || this.options.initialBarWidth, getWidth(this.handle))
  }
  this.setStart(this.options.start) // currentValue
}
// 设置圆球left、进度条宽度和当前值
Horizontal.prototype.setStart = function (start) {
  var begin = (start === null) ? this.options.min : start // 初始值，没传时取min最小值
  // 第一参数除以第二参数，当前进度占总进度的百分比
  var part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
  // 两个参数相乘，当前进度百分比乘以总进度条宽度，得到当前进度条宽度
  if (this.options.isAlignCircleCenter) {
    var offset = percentage.of(part, this.slider.offsetWidth) // raferxu
  } else {
    var offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth)
  }
  
  // 当存在step时，从steps数组里取出和offset最接近的正数
  var position = (this.options.step) ? findClosest(offset, this.steps) : offset
  // 将position作为圆球的left和进度条的宽度
  this.setPosition(position)
  // 圆球的left、进度条可能最大值
  if (this.options.isAlignCircleCenter) {
    this.setValue(this.handle.style.left, this.slider.offsetWidth)
  } else {
    this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth) // raferxu
  }
  
}
// 算出总进度条最大值，并确定steps数组
Horizontal.prototype.setStep = function () {
  // 确定每一step位置并存入数组
  this.step(getWidth(this.slider) || this.options.initialBarWidth, getWidth(this.handle))
}
// 确定圆球的left和当前进度条的宽度
Horizontal.prototype.setPosition = function (val) {
  if (this.options.isAlignCircleCenter) { // raferxu
    var handleVal = val - this.handle.clientWidth / 2;
    this.handle.style.left = handleVal + 'px'
  } else {
    this.handle.style.left = val + 'px'
  }
  this.slider.querySelector('.range-quantity').style.width = val + 'px'
}
// 触发onTouchstart，记录点击位置、圆球left、进度条最大值和文字无法被选中
Horizontal.prototype.onmousedown = function (e) {
  this.options.onTouchstart(e) // 调用onTouchstart，也就是用户自定义的on-touchstart会被emit
  if (this.options.isShowCurValue) {
    classes(this.rangeToast).remove('range-handle-toast-none')
    if (this.options.isCircleActive) {
      classes(this.rangeDot).add('range-handle-toast-none')
      classes(this.rangeHandle).remove('range-handle-none')
    }
  }
  if (e.touches) e = e.touches[0]
  this.startX = e.clientX // 记录点击坐标
  this.handleOffsetX = this.handle.offsetLeft // 圆球距离左边距离，也就是当前进度条宽度
  if (this.options.isAlignCircleCenter) {
    this.restrictHandleX = this.slider.offsetWidth // 进度条最大宽度
  } else {
    this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth // 进度条最大宽度 raferxu
  }
  
  // this.slider -》 range-bar this.handle -》range-handle
  this.unselectable(this.slider, true) // 禁止页面显示的元素的文字被选中
}
// 自动触发change
Horizontal.prototype.changeEvent = function (state) {
  if (typeof Event === 'function' || !document.fireEvent) {
    var event = document.createEvent('HTMLEvents')
    event.initEvent('change', false, true)
    this.element.dispatchEvent(event)
  } else {
    this.element.fireEvent('onchange')
  }
}
// 更新圆球left、进度条宽度和当前值
Horizontal.prototype.onmousemove = function (e) {
  // touchmove中添加event.preventDefault方法之后会阻止浏览器默认的滚动
  // 在touchmove中判断x轴和y轴的移动值，判断当前是往哪个方向滑动，如果是在x轴上滑动（左右），就调用event.preventDefault()方法，如果是在y轴上滑动（上下），就不调用event.preventDefault()
  // var w = x<0?x*-1:x;     //x轴的滑动值
  // var h = y<0?y*-1:y;     //y轴的滑动值
  // if(w>h){                //如果是在x轴中滑动
  //   event.preventDefault();
  // }
  // 扩展
  /**
   * QQ和微信中打开，发现touchmove只会触发一次，而且touchend也经常不触发。
   * 主要是由于200ms超时导致内核不一定会一直处理touchmove事件，一旦超时会将后续所有的事件转交给UI处理，导致touchmove不会一直触发。
   * 建议开发者在touchstart时调用event.preventDefault，这样就可以保证内核会一起触发touchmove事件了。
   * 但是！！！页面中的超链接点击没反应了！！！给其他地方加的click事件也不触发了！！！
   * 因为在移动端click事件的触发条件就是必须touchstart和touchend同时触发才能触发click
   * 这样只能在touchmove里添加，但是又会造成无法滚动问题，所以x方向才添加
   * 正确的触发过程应该是：touchstart→touchmove→touchend或者touchstart→touchend→click。
   */
  e.preventDefault()
  if (e.touches) e = e.touches[0]
  // 圆球应该停留的精确坐标
  var leftOffset = this.handleOffsetX + e.clientX - this.startX
  // 设定了step时，从steps数组取出最接近的正数
  var position = (this.steps) ? findClosest(leftOffset, this.steps) : leftOffset
  // 确定圆球left和当前进度条宽度
  if (leftOffset <= 0) {
    this.setPosition(0) // 最小值为0
  } else if (leftOffset >= this.restrictHandleX) {
    this.setPosition(this.restrictHandleX) // 只能设进度条最大宽度
  } else {
    this.setPosition(position)
  }
  // 确定当前值
  if (this.options.isAlignCircleCenter) {
    this.setValue(this.handle.style.left, this.slider.offsetWidth)
  } else {
    this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth) // raferxu
  }
  
}
// 根据第二参数set确定文本能否被选中
Horizontal.prototype.unselectable = function (element, set) {
  // .unselectable {
  //   user-select: none; // 文本无法被选中
  // }
  if (!classes(this.slider).has('unselectable') && set === true) {
    classes(this.slider).add('unselectable')
  } else {
    classes(this.slider).remove('unselectable')
  }
}
// 触发onTouchend事件，并去掉文本无法被选中的限制
Horizontal.prototype.onmouseup = function (e) {
  this.options.onTouchend(e)
  if (this.options.isShowCurValue) {
    if (!classes(this.rangeToast).has('range-handle-toast-none')) {
      classes(this.rangeToast).add('range-handle-toast-none')
      if (this.options.isCircleActive) {
        classes(this.rangeDot).remove('range-handle-toast-none')
        classes(this.rangeHandle).add('range-handle-none')
      }
    }
  }
  this.unselectable(this.slider, false)
}
// 传入的值只决定是否移除事件，而长条的颜色只是由this.options.disable决定
Horizontal.prototype.disable = function (force) {
  if (this.options.disable || force) { // 移除事件
    this.mouse.unbind()
    this.touch.unbind()
  }
  
  if (this.options.disable) { // 底部长条透明度设置
    if (this.options.disableOpacity) {
      this.slider.style.opacity = this.options.disableOpacity // 内联设置，优先级比下面的class高
    }
    classes(this.slider).add('range-bar-disabled')
  }
}
// 隐藏input、生成要显示的元素、绑定事件
Horizontal.prototype.init = function () {
  this.hide() // 把this.element隐藏,即把input隐藏
  this.append() // 在this.element后面生成需要显示在页面的元素
  this.bindEvents() // 绑定触摸事件
  this.checkValues(this.options.start) // 确保start在min和max之间
  this.setRange(this.options.min, this.options.max) // 显示最大最小标尺
  this.disable() // 当this.options.disable为true时，移除交互和设置进度条透明度
}
// 根据最新参数重新调用init
Horizontal.prototype.reInit = function (opts) {
  this.options.start = opts.value
  this.options.min = opts.min
  this.options.max = opts.max
  this.options.step = opts.step
  this.disable(true)
  this.init()
}
// 负数时取反
Horizontal.prototype.checkStep = function (value) {
  if (value < 0) value = Math.abs(value)
  this.options.step = value
  return this.options.step
}
// 计算出当前停留的value,并确保和this.element.value同步，否则更新this.element.value并触发相应的change事件
Horizontal.prototype.setValue = function (offset, size) {
  var part = percentage.from(parseFloat(offset), size) // 当前进度条占总进度的百分比
  // 保证当前进度值在min和max之间
  if (offset === '0px' || size === 0) {
    value = this.options.min
  } else {
    // 确定当前进度在总进度条的位置和对应的值
    var value = percentage.of(part, this.options.max - this.options.min) + this.options.min
    // 进度值四舍五入
    value = (this.options.decimal) ? (Math.round(value * 100) / 100) : Math.round(value)

    if (value > this.options.max) {
      value = this.options.max
    }
  }

  if (this.options.isShowCurValue) {
    if (this.options.isAlignLR) {
      if (value === this.options.max) {
        classes(this.rangeToast).remove('range-handle-toast-left').add('range-handle-toast-right')
      } else if (value === this.options.min) {
        classes(this.rangeToast).remove('range-handle-toast-right').add('range-handle-toast-left')
      } else {
        classes(this.rangeToast).remove('range-handle-toast-right').remove('range-handle-toast-left')
      }
    }
    this.rangeToast.innerHTML = value
  }

  var changed = false

  changed = this.element.value !== value
  // 确保计算出的value和this.element.value同步，否则更新this.element.value并触发相应的change事件
  this.element.value = value
  this.options.callback(value) // 同步到currentValue
  if (changed) this.changeEvent() // 需要更新this.element.value时自动触发onchange
}
// 保证max不会小于min，同时给定的值在min和max范围内
Horizontal.prototype.checkValues = function (start) {
  if (start < this.options.min) this.options.start = this.options.min
  if (start > this.options.max) this.options.start = this.options.max
  if (this.options.min >= this.options.max) this.options.min = this.options.max
}
// sliderSize整个宽度，handleSize圆球直径
// step被设置时，确定每一step的位置放入数组
Horizontal.prototype.step = function (sliderSize, handleSize) {
  // var dimension = sliderSize - handleSize // 进度条总宽度
  var dimension = sliderSize // 进度条总宽度 rafer
  // console.log(sliderSize); // 800
  // console.log(handleSize); // 30
  // console.log(this.checkStep(this.options.step)); // 19
  // console.log(this.options.max - this.options.min); // 99
  // 计算step占进度条最大最小值的百分比
  var part = percentage.from(this.checkStep(this.options.step), this.options.max - this.options.min)
  // console.log('part', part); // 19.19191919191919
  // 计算step的宽度大小, 这里确定了dimension是interval的整数倍
  var interval = percentage.of(part, dimension)
  // console.log('interval', interval); // 147.77777777777777
  var steps = []
  var mystep = []
  // 将所有step步数对应的宽度都保存在steps数组中
  // 如每一step走100px，那么steps存的是[100, 200, 300, ...]
  for (let i = 0; i <= dimension; i += interval) {
    steps.push(i)
    mystep.push(i)
  }
  // console.log('mystep');
  // console.log(mystep); // [0, 147.77777777777777, 295.55555555555554, 443.3333333333333, 591.1111111111111, 738.8888888888889]
  
  this.steps = steps
  for (let i = 10; i >= 0; i--) {
    this.steps[steps.length - i] = dimension - interval * i
    if (steps.length - i === 2) {
      // console.log('i', i);
      // console.log('interval', interval);
      // console.log('dimension', dimension);
      // console.log('interval * i', interval * i);
      // console.log('dimension - interval * i', dimension - interval * i);
    }
  }
  // console.log('this.steps');
  // console.log(this.steps); // [-116.66666666666663, 31.111111111111086, 178.8888888888889, 326.6666666666667, 474.44444444444446, 622.2222222222222, 770, -4: -707.7777777777778, -3: -560, -2: -412.2222222222222, -1: -264.44444444444434]

  return this.steps
}
// 创建元素并指定类名
Horizontal.prototype.create = function (type, name) {
  var elem = document.createElement(type)
  elem.className = name

  return elem
}
// insertBefore 第一个参数插入的节点对象，第二参数可选，在其之前插入子节点，如果不传，则在结尾插入。
Horizontal.prototype.insertAfter = function (reference, target) {
  reference.parentNode.insertBefore(target, reference.nextSibling)
}
// min和max都是数字而且文字不隐藏时，显示最大最小值
Horizontal.prototype.setRange = function (min, max) {
  if (typeof min === 'number' && typeof max === 'number' && !this.options.hideRange) {
    this.slider.querySelector('.range-min').innerHTML = this.options.minHTML || min
    this.slider.querySelector('.range-max').innerHTML = this.options.maxHTML || max
  }
}
// 生成所需的dom元素，包括滚动圆球，当前进度条，最大最小值
Horizontal.prototype.generate = function () {
  var elems = {
    'handle': {
      'type': 'span',
      'selector': 'range-handle'
    },
    'min': {
      'type': 'span',
      'selector': 'range-min'
    },
    'max': {
      'type': 'span',
      'selector': 'range-max'
    },
    'quantity': {
      'type': 'span',
      'selector': 'range-quantity'
    }
  }

  var handleElems = {
    'toast': {
      'type': 'span',
      'selector': 'range-handle-toast range-handle-toast-none'
    },
    'dot': {
      'type': 'span',
      'selector': 'range-handle-dot'
    }
  }

  for (var key in elems) {
    if (elems.hasOwnProperty(key)) {
      var temp = this.create(elems[key].type, elems[key].selector)
      if (key === 'handle') {
        if (this.options.isShowCurValue) {
          var mytemp = this.create(handleElems['toast'].type, handleElems['toast'].selector)
          temp.appendChild(mytemp)
          if (this.options.isCircleActive) {
            var mytemp2 = this.create(handleElems['dot'].type, handleElems['dot'].selector)
            temp.appendChild(mytemp2)
          }
        }
      }
      this.slider.appendChild(temp)
      
      if (this.options.isShowCurValue && !this.rangeHandle) {
        this.rangeHandle = this.slider.querySelector('.range-handle')
        this.rangeToast = this.slider.querySelector('.range-handle-toast')
        if (this.options.isCircleActive) {
          // range-handle-none this.rangeHandle
          classes(this.rangeHandle).add('range-handle-none')
          this.rangeDot = this.slider.querySelector('.range-handle-dot')
        }
      }
      
    }
  }

  console.log('this.slider');
  console.log(this.slider); // raferxu

  return this.slider
}
// 动态生成必须的元素，并把他们插入到this.element后面
Horizontal.prototype.append = function () {
  if (!this.hasAppend) {
    var slider = this.generate()
    this.insertAfter(this.element, slider)
  }
  this.hasAppend = true
}
// 隐藏元素
Horizontal.prototype.hide = function () {
  this.element.style.display = 'none'
}
// 添加事件绑定
Horizontal.prototype.bindEvents = function () {
  this.handle = this.slider.querySelector('.range-handle')
  this.touch = events(this.handle, this)
  // 给this挂载触摸事件
  this.touch.bind('touchstart', 'onmousedown')
  this.touch.bind('touchmove', 'onmousemove')
  this.touch.bind('touchend', 'onmouseup')
  // mouse()执行后会执行如下操作：
  // mousedown事件触发时，会执行down函数，它会执行onmousedown方法，也就是会触发onmousedown并emit出down，然后给mousemove和mouseup绑定事件,如只要mousemove触发，就会执行onmousemove方法，并emit出move；
  this.mouse = mouse(this.handle, this)
  this.mouse.bind()
}

var defaults = {
  callback () {},
  decimal: false,
  disable: false,
  disableOpacity: null,
  hideRange: false, // 是否显示最大最小值文字
  min: 0,
  max: 100,
  start: null,
  step: null,
  vertical: false
}

export default function (element, options) {
  options = options || {}

  for (let i in defaults) {
    if (options[i] == null) {
      options[i] = defaults[i]
    }
  }

  return new Horizontal(element, options)
}
