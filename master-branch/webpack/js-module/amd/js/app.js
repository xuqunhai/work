(function(){
    require.config({
        paths:{
            m2:'../module/m2',
            m1:'../module/m1',
            jquery:'../libs/jquery-3.3.1'
        }
    })
    require(['m2','jquery'],function(m2,$){
        m2.show();
        $('body').css('backgroundColor','#000');
    });
})()