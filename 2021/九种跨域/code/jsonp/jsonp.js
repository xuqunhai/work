window[callbackName] = function () {};

script.onload = script.onreadystatechange = function () {
  if (!script.readyState || /loaded|complete/.test(script.readyState)) {
    script.onload = script.onreadystatechange = null;
    if (script.parentNode) {
      script.parentNode.removeChild(script); // 移除该script的DOM对象
    }
    window[callbackName] = null; // 删除函数
  }
};
script.onerror = function () {};
