if(window.Worker) {
    var myWorker = new Worker('http://xxx.com/worker.js');
    // 发送消息
    first.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log("Message posted to worker");
    }
    second.onchange = function() {
      myWorker.postMessage([first.value,second.value]);
      console.log('Message posted to worker');
    }
    // 主线程 监听onmessage以响应worker回传的消息
    myWorker.onmessage = function (e) {
      var textContent = e.data;
      console.log("message received from worker");  
    }
}

/*
Web Worker的使用场景,用于收集埋点数据,
可以用于大量复杂的数据计算,复杂的图像处理,大数据的处理.
因为它不会阻碍主线程的正常执行和页面UI的渲染.

埋点数据采集下的使用: 
可在main.js中收集数据,将收集到的信息通过postMessage的方式发送给worker.js,
在woker.js中进行相关运算和整理并发送到服务器端;
当然,不使用Web Woker,
通过在单页面应用中的index.html中创建iframe也可以实现页面间切换,
页面停留时长等数据的采集,具体的实现我就不细讲了

*/