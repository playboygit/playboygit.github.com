/**
 * Created by zhoubing on 2015/3/2.
 */
$(document).ready(function(){
    $.ajax({
        url:"/mobile/user/goods_list",
        type:"get",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                var goods_list = data.data.goods_list;
                var on_shelf = goods_list.on_shelf;
                var off_shelf = goods_list.off_shelf;
                var sold = goods_list.sold;
                if(on_shelf.length==0 && off_shelf.length==0 && sold.length==0){
                    $(".no-goods").removeClass("hide");
                }else{
                    if(on_shelf.length!=0){
                        var onHtml = template('on_shelf', goods_list);
                        $("#main").append($(onHtml));
                    }
                    if(off_shelf.length!=0){
                        var offHtml = template('off_shelf', goods_list);
                        $("#main").append($(offHtml));
                    }
                    if(sold.length!=0){
                        var soldHtml = template('sold', goods_list);
                        $("#main").append($(soldHtml));
                    }
                }
            }else{
                alert(data.msg);
            }
            if($(".page").height()<$(window).height()){
                $(".page").height($(window).height());
            }
        }
    });
}).on("click",".down-goods",function(){     //下架
    var _this = $(this);
    if(confirm("下架后商品无法被其他用户看到，确认下架？")){
        var goods_id = _this.closest(".wrap-listview").attr("data-id");
        $.ajax({
            url:" /goods/off_shelf",
            data:{goods_id:goods_id},
            type:"post",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    window.location.reload(true);
                }else{
                    alert(data.msg);
                }
            }
        });
    }
}).on("click",".up-goods",function(){     //上架
    var _this = $(this);
    var goods_id = _this.closest(".wrap-listview").attr("data-id");
    $.ajax({
        url:"/goods/on_shelf",
        data:{goods_id:goods_id},
        type:"post",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                window.location.reload(true);
            }else{
                alert(data.msg);
            }
        }
    });
}).on("click",".old-goods",function(){     //确认出售
    var _this = $(this);
    if(confirm("商品售出后，其他用户将不再看到，也不能再上架，确认售出？")){
        var goods_id = _this.closest(".wrap-listview").attr("data-id");
        $.ajax({
            url:"/goods/sold",
            data:{goods_id:goods_id},
            type:"post",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    window.location.reload(true);
                }else{
                    alert(data.msg);
                }
            }
        });
    }

});
