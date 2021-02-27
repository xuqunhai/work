/**
 * Created by raferxu on 17/3/27.
 */
$(function () {

    // 计算图片最终大小和移动的坐标
    function calc(config) {

        // 获取图片原始大小
        var initImgW = config.imgInitW || 0;
        var initImgH = config.imgInitH || 0;

        // 获取图片展示框大小
        var imgWrapW = config.imgWrapW || 0;
        var imgWrapH = config.imgWrapH || 0;

        // 确定水平还是垂直方向占满
        var direct = (imgWrapW / initImgW * initImgH < imgWrapH) ? 'h' : 'v';
        var scale = 1, scaleImgH, scaleImgW,pdt,pdl;

        // 确定缩放比、缩放后的宽高及留白大小
        if(direct == 'h'){
            scale = imgWrapW / initImgW;
            scaleImgW = imgWrapW;
            scaleImgH = initImgH * scale;
            pdt = (imgWrapH - scaleImgH) / 2;
            pdl = 0;
        }else{
            scale = imgWrapH / initImgH;
            scaleImgH = imgWrapH;
            scaleImgW = initImgW * scale;
            pdl = (imgWrapW - scaleImgW) / 2;
            pdt = 0;
        }

        // 返回显示在屏幕的图片的宽高和左边及上边的留白
        return {
            'fw' : scaleImgW,
            'fh' : scaleImgH,
            'pl' : pdl,
            'pt' : pdt
        };
    }

    // 获取展示区域宽高
    var imgBoxW = $('.billImgBox').width();
    var imgBoxH = $('.billImgBox').height();

    // 判断图片是否加载完成
    function imgLoaded(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    // 确保图片加载完成及执行的回调
    var imgLoadTimer = setInterval(function () {
        if(imgLoaded($('.billImg')[0])){
            clearInterval(imgLoadTimer);
            imgCallback($('.billImg')[0]);
        }
    },500);

    // 定义图片加载后的回调
    function imgCallback(img) {

        // 获取图片原始宽高
        var imgInitH = img.naturalHeight;
        var imgInitW = img.naturalWidth;

        //计算图片最终显示的大小及留白
        var result = calc({
            'imgInitW' : imgInitW,
            'imgInitH' : imgInitH,
            'imgWrapW' : imgBoxW,
            'imgWrapH' : imgBoxH
        });
        // console.log(result);

        // billImg
        $('.billImg').css({
            'width' : result.fw +'px',
            'height' : result.fh + 'px',
            // 'paddingTop' : result.pt +'px',
            // 'paddingLeft' : result.pl +'px',
            // 'transform':'rotate(90deg)',
            'marginTop' : result.pt +'px',
            'marginLeft' : result.pl +'px',
            'display' : 'inline-block'
        });
    }

    // 获取task_id
    var task_id = 1;

    // 调用Android或iOS方法获取token
    var getToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEwMDAwMDAwMDAxIiwidGltZSI6IjIwMTctMDQtMDUgMTc6MjA6NDcifQ.7qxuXOwELdwTiXuQ09QIBrF4Fd7lbvLTdfnb3ib_VsU';

/*
    var getToken;
    function callback(token){
        getToken = token;
    }
     function jobTask.receiveToken(){
        callback('12345');
     }
    jobTask.receiveToken();
*/

    // 发送图片获取识别字符串，并放入input中
    var str = "1404021205";
    $('.showInfo').val(str);
    $('.reviseInfo').val(str);

    // 软键盘控制底部input的显示
    var winH = window.innerHeight;
    $('.showInfo')[0].addEventListener('focus',function (e) {
        var timeA = setInterval(function () {
            if(window.innerHeight < winH){
                $('footer').show().children().focus();
            }else{
                $('footer').hide();
                $('.showInfo').val($('.reviseInfo').val());
            }
        },300);
    });

/*
    http://192.168.0.88:5001/ocr_api/crowd_rec
        输入:{"url":"xxx","type":xxx}
        输出:{"str":"xxx"}
*/
/*
    var picData = {'url':'http://192.168.0.162:8000/piaoju01.jpg','type':1};
    picData = JSON.stringify(userData);
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.88:5001/ocr_api/crowd_rec',
        data : picData,
        dataType : 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
            xhr.setRequestHeader('Accept','application/json,text/plain');
        },
        success : function (data) {
            console.log(data);
            $('.showInfo').val(data.str);
        },
        error : function (err) {
            console.log('error: '+err);
        }
    });
*/


    // 任务统计接口
/*
    http://192.168.0.162:5000/token/statistics/userInfo
    {"token":
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MDE3OTgwMDI1IiwidGltZSI6IjIwMTctMDMtMjkgMTg6MDc6MDAifQ.iftWXK1bxmeKjnpnWnMBmigcdgt_x8EoPo55pLIxrrI",
     "task_id":
             199
    }

    返回数据格式
     {
         "body": {
             "current_score": 0,
             "current_day_tasks": 0,
             "task_rand_score": 100,
             "total_order_num": 0
         },
         "message": "operate successfully",
         "code": 200
     }
*/

    //发起ajax请求获取任务统计数据userInfo插入页面中
    // 天元接口 http://192.168.0.162:5000/token/statistics/userInfo
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MDE3OTgwMDI1IiwidGltZSI6IjIwMTctMDMtMjkgMTg6MDc6MDAifQ.iftWXK1bxmeKjnpnWnMBmigcdgt_x8EoPo55pLIxrrI
    // 199
    // 赵怡接口 http://192.168.0.182:5000/token/statistics/userInfo
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEwMDAwMDAwMDAxIiwidGltZSI6IjIwMTctMDQtMDEgMTE6NDE6MDkifQ.qnWdm7_3AbzFNHn5FCuzbuyeO-hq05PXLH59hHqDF8c
    // 1

     var userData = {'token': getToken,'task_id':task_id};
     console.log(userData);
     userData = JSON.stringify(userData);
     $.ajax({
         type : 'POST',
         url : 'http://192.168.0.182:5000/token/statistics/userInfo',
         data : userData,
         dataType : 'json',
         beforeSend: function (xhr) {
             xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
             xhr.setRequestHeader('Accept','application/json,text/plain');
         },
         success : function (userInfo) {
             console.log('userInfo: '+userInfo);
             $('.task_rand_score span').html(userInfo.body.task_rand_score);
             $('.total .num').html(userInfo.body.total_order_num);
             $('.today_order .num').html(userInfo.body.current_day_tasks);
         },
         error : function (err) {
             console.log('error: '+err);
         }
     });

    // 模拟任务统计ajax获取的数据
/*
     var userInfo = {
         "body": {
             "current_score": 0,
             "current_day_tasks": 10,
             "task_rand_score": 200,
             "total_order_num": 110
         },
         "message": "operate successfully",
         "code": 200
     };
     $('.task_rand_score span').html(userInfo.body.task_rand_score);
     $('.total .num').html(userInfo.body.total_order_num);
     $('.today_order .num').html(userInfo.body.current_day_tasks);
*/

    // 判断是否需要跳到抽奖页面的接口数据
/*

    http://192.168.0.182:5000/token/lottery/getchanceconfig
    {"body":
        {"chance_config":
            [{"lottery_id": 1, "updated": "17.5", "created": "17.4", "interval": 20, "times": 1}]
        },
     "message": "operate successfully",
     "code": 200
    }

     method: GET/POST
     输入:
     输出:
     private Integer interval;//抽奖阈值
     private Integer times;//抽奖次数
     private Integer lottery_id;//对应转盘id
*/
/*
    $.ajax({
        type : 'GET',
        url : 'http://192.168.0.182:5000/token/lottery/getchanceconfig',
        dataType : 'json',
        success : function (lotteryInfo) {
            console.log(lotteryInfo);
            var interval = lotteryInfo['body']['chance_configs']['interval'];
            var times = lotteryInfo['body']['chance_configs']['times'];
            var lottery_id = lotteryInfo['body']['chance_configs']['lottery_id'];
        },
        error : function (err) {
            console.log('error: '+err);
        }
    });
*/

    // 任务完成后
/*

    http://192.168.0.182:5000/token/task/notTask
    // method: GET/POST
    输入:token; //token
     {"token":0}
    输出:
    {"body":
        {
         "plan_score": 0,
         "current_day_tasks": 0
        },
     "message": "operate successfully",
     "code": 200
    }
*/

/*
    var noTaskData = {'token': getToken};
    noTaskData = JSON.stringify(userData);
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.182:5000/token/task/notTask',
        data : noTaskData,
        dataType : 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
            xhr.setRequestHeader('Accept','application/json,text/plain');
        },
        success : function (data) {
            console.log('noTaskData: ' + data);
            sessionStorage.setItem('current_day_tasks',data['body']['current_day_tasks']);
            sessionStorage.setItem('plan_score',data['body']['plan_score']);
        },
        error : function (err) {
            console.log('error: '+err);
        }
    });
*/
    var current_day_tasks = 80;
    var plan_score = 8000;
    sessionStorage.setItem('current_day_tasks',current_day_tasks);
    sessionStorage.setItem('plan_score',plan_score);

    // 任务指引
    $('.taskGuide').on('touchstart',function () {
        location.href = 'https://www.baidu.com/';
    });
});
