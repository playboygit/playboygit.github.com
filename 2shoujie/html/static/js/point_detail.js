/**
 * Created by zhoubing on 2015/3/4.
 */
$(document).ready(function(){
    var isLoad = true;
    var pn = 1;
    $.ajax({
        url:"/user/point/"+pn,
        type:"get",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                var goods_list = data.data.point_list;
                var lis = "";
                for(var i=0; i<goods_list.length;i++){
                    lis += '<tr><td>'+goods_list[i].time+'</td><td>积分+'+goods_list[i].point+'</td><td>'+goods_list[i].reason+'</td></tr>';
                }
                $("#rules-list").append($(lis));
                pn++;
                $(window).scroll(function(){
                    var winHeight = $(window).height()+$(window).scrollTop();
                    if(winHeight>=$("body").height() && isLoad){
                        isLoad=false;
                        $.ajax({
                            url:"/user/point/"+pn,
                            type:"get",
                            success:function(data){
                                var data = $.parseJSON(data);
                                if(data.code==0){
                                    var goods_list = data.data.point_list;
                                    pn++;
                                    isLoad=true;
                                    if(goods_list.length==0){
                                        isLoad=false;
                                    }else{
                                        var lis = "";
                                        for(var i=0; i<goods_list.length;i++){
                                            lis += '<tr><td>'+goods_list[i].time+'</td><td>积分+'+goods_list[i].point+'</td><td>'+goods_list[i].reason+'</td></tr>';
                                        }
                                        $("#rules-list").append($(lis));
                                    }
                                }else{
                                    alert(data.msg);
                                }
                            }
                        });
                    }
                });
            }else{
                alert(data.msg);
            }
        }
    });
});
