$(document).ready(function(){
	$(".container").css("min-height",$(window).height()+"px");
    $(".pop-win").on("click",function(e){/*关闭模态框*/
        if($(e.target).closest(".pop-content").length==0){
            $(".pop-win").addClass("hide");
        }
    });
    $(".close").on("click",function(){/*关闭模态框*/
         $(".pop-win").addClass("hide");
    });
    $(".goback").on("click",function(){
        history.go(-1);
    });
    if($("#order-success").size()>0){
        if(location.href!=parent.location.href){
            parent.location.href = location.href;
        }
    }
}).on("click",".developing",function(){
    return Tip("该功能正在开发中，客官不要急～");
}).on("click","#scrollUp",function(){
    $('html,body').animate({scrollTop: '0px'}, 300);
});
function getExpress(id, order_num){
    $.ajax({
        url:"/getexpress?com="+id+"&num="+order_num,
        type:"get",
        success:function(res){
            if(res.success){
                
            }else{ 
            	

            }
        }
    });
}