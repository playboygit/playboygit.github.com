/**
 * Created by zhoubing on 2015/1/26.
 */
$(document).ready(function(){  
       
}).on("click","#tel-commit",function(){/*提交手机号*/
    var data = $(".tel-ipt").val();
    /*$.ajax({
            url:"",
            data:data,
            type:"post",
            success:function(data){
                
            }
        });*/
}).on("click","#opinion-commit",function(){/*提交选项*/
    var activeLis = $(".back-list").children(".active");
    var data=[0,0,0,0];
    for(var i=0; i<activeLis.size(); i++){
        data[activeLis.eq(i).index()]=1;
    }
    /*$.ajax({
            url:"",
            data:"",
            type:"post",
            success:function(data){
                
            }
        });*/
}).on("click",".back-list li",function(){
    $(this).toggleClass("active");
    if($(this).hasClass("active")){
        $(this).find("img").attr("src","../img/checked.png");
    }else{
        $(this).find("img").attr("src","../img/unchecked.png");
    }
})