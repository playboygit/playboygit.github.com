/**
 * Created by zhoubing on 2015/3/2.
 */
$(document).ready(function(){
    var isLoad = true;
    var pn = 1;
    $.ajax({
        url:"/goods/recent/"+pn,
        type:"get",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                var goods_list = data.data.goods_list;
                var lis = "";
                for(var i=0; i<goods_list.length;i++){
                    lis += '<li class="goods-box"><a href="/mobile/goods/'+goods_list[i].goods_id+'.html"><div class="wrap-img"><img src="'+goods_list[i].goods_image+'" alt="'+goods_list[i].goods_name+'"/></div>'+
                        '<div class="goods-attr"><p class="goods-name">'+goods_list[i].goods_name+'</p><span class="goods-price">¥'+goods_list[i].goods_price+'</span><span class="goods-address">'+goods_list[i].goods_trade_place+'</span></div></a></li>';
                }
                $("#goods_list").append($(lis));
                pn++;
                $(window).scroll(function(){
                    var winHeight = $(window).height()+$(window).scrollTop()+100;
                    if(winHeight>=$("body").height() && isLoad){
                        isLoad=false;
                        $.ajax({
                            url:"/goods/recent/"+pn,
                            type:"get",
                            success:function(data){
                                var data = $.parseJSON(data);
                                if(data.code==0){
                                    var goods_list = data.data.goods_list;
                                    pn++;
                                    isLoad=true;
                                    if(goods_list.length==0){
                                        //$(".add-more").addClass("hide");
                                        isLoad=false;
                                    }else{
                                        var lis = "";
                                        for(var i=0; i<goods_list.length;i++){
                                            lis += '<li class="goods-box"><a href="/mobile/goods/'+goods_list[i].goods_id+'.html"><div class="wrap-img"><img src="'+goods_list[i].goods_image+'" alt="'+goods_list[i].goods_name+'"/></div>'+
                                                '<div class="goods-attr"><p class="goods-name">'+goods_list[i].goods_name+'</p><span class="goods-price">¥'+goods_list[i].goods_price+'</span><span class="goods-address">'+goods_list[i].goods_trade_place+'</span></div></a></li>';
                                        }
                                        $("#goods_list").append($(lis));
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
