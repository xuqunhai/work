// 内置selfduixiang,,代表子线程本身, worker内部要加载其他脚本,可通过importScripts()方法
onmessage = function(e) {
    console.log("message received from main script");
    var workerResult = "Result: " + (e.data[0] * e.data[1]);
    console.log("posting message\back to main script");
    postMessage(workerResult);
}
