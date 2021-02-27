// js 移动端获取当前用户的经纬度
// https://www.cnblogs.com/xuey/p/10664875.html
/*
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
    alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
}
//定位数据获取成功响应
function onSuccess(position) {
    alert('纬度: ' + position.coords.latitude + '\n' +
        '经度: ' + position.coords.longitude + '\n' +
        '海拔: ' + position.coords.altitude + '\n' +
        '水平精度: ' + position.coords.accuracy + '\n' +
        '垂直精度: ' + position.coords.altitudeAccura)
}
//定位数据获取失败响应
function onError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("您拒绝对获取地理位置的请求");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("位置信息是不可用的");
            break;
        case error.TIMEOUT:
            alert("请求您的地理位置超时");
            break;
        case error.UNKNOWN_ERROR:
            alert("未知错误");
            break;
    }
}
*/

