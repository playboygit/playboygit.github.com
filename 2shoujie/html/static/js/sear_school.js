/**
 * Created by zhoubing on 2015/3/11.
 */
$(document).ready(function(){
    $(window).keydown(function(event){
        if(event.keyCode==13) {
            searSchool();
        }
    });
}).on("focus",".search-ipt input",function(){
    $(this).addClass("search-active");
    $(".search-left").addClass("search-active");
}).on("blur",".search-ipt input",function(){
    $(this).removeClass("search-active");
    $(".search-left").removeClass("search-active");
}).on("click",".search-btn",function(){
    searSchool();
});
function searSchool(){
    var result = $(".search-ipt input").val();
    if(result==""){
        return false;
    }else{
        $.ajax({
            url:"/school/search?keyword="+result,
            type:"get",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    var schools = data.data.school_list;
                    var items = "";
                    if(schools.length==0){
                        items='<a href="javascript:;">未搜索到任何结果！</a>';
                    }else{
                        for(var i=0; i<schools.length; i++){
                            items+='<a href="'+schools[i].school_url+'">'+schools[i].school_name+'</a>';
                        }
                    }
                    if($(".sear-result").size()==0){
                        var item = '<div class="sear-result"><div class="school-item mt0"><div class="item-title"><div class="item-title-txt">搜索结果</div></div><p class="school-list sear-school-list">';
                        item+=items;
                        item+='</p></div></div>';
                        $(".wrap-school-list").before($(item));
                        $(".sear-result").slideToggle(200);
                    }else{
                        $(".sear-school-list").html("").append($(items));
                    }
                }else{
                    alert(data.msg);
                }
            }
        })
    }
}