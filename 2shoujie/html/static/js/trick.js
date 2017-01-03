/**
 * Created by zhoubing on 2015/2/26.
 */
$(document).ready(function(){

}).on("mouseenter",".rank-title-price .pri",function(){
    var next = $("#up_down").attr("order");
    if(next=="nor"){
        $("#up_down").removeClass().addClass("price-up");
    }else{
        $("#up_down").removeClass("rerotate").addClass("rotate");
    }
}).on("mouseout",".rank-title-price .pri",function(){
    var next = $("#up_down").attr("order");
    if(next=="nor"){
        $("#up_down").removeClass().addClass("price-nor");
    }else{
        $("#up_down").removeClass("rotate").addClass("rerotate");
    }
});