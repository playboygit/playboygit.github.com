var isLogin = false;
$(document).ready(function(){
    if(getCookie("is_login")!=''){
        isLogin = true;
    }else{
        isLogin = false;
    }
    if(!isLogin){     //如果未登录就放cookie
        var guid = Guid.NewGuid();
        if(getCookie("user_source_id")==""){
            setCookie("user_source_id",guid.ToString());
        }
    }
    $(window).on("scroll",function(){
        if($(window).scrollTop()>=44 && !$(".nav").hasClass("fix-nav")){
            $(".nav").addClass("fix-nav");
        }else if($(window).scrollTop()<44){
            $(".nav").removeClass("fix-nav");
        }
    })
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?e5d4a774c0734588e9400de76096a008";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}).on("click",".nav-lst li",function(){
    var oldIndex = $(".nav-lst .active").index();
	var index = $(this).index();
    if(index>oldIndex){
        $(".nav-line li").removeClass("active box-slide-left box-slide-right").eq(index).addClass("active box-slide-right");
    }else if(index<oldIndex){
        $(".nav-line li").removeClass("active box-slide-left box-slide-right").eq(index).addClass("active box-slide-left");
    }else{
        $(".nav-line li").removeClass("active").eq(index).addClass("active");
    }
	$(".nav-lst li").removeClass("active").eq(index).addClass("active");
    return false;
}).on("click","#login-out",function(){
    removeCookie("is_login,user_source_id,user_id");
    window.location.reload(true);
});

//屏蔽右键菜单
/*document.oncontextmenu = function (event){
    if(window.event){
        event = window.event;
    }try{
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
            return false;
        }
        return true;
    }catch (e){
        return false;
    }
}

//屏蔽粘贴
document.onpaste = function (event){
    if(window.event){
        event = window.event;
    }try{
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
            return false;
        }
        return true;
    }catch (e){
        return false;
    }
}

//屏蔽复制
document.oncopy = function (event){
    if(window.event){
        event = window.event;
    }try{
        var the = event.srcElement;
        if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
            return false;
        }
        return true;
    }catch (e){
        return false;
    }
}

//屏蔽剪切
document.oncut = function (event){
    if(window.event){
        event = window.event;
    }try{
        var the = event.srcElement;
        if(!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
            return false;
        }
        return true;
    }catch (e){
        return false;
    }
}

//屏蔽选中
document.onselectstart = function (event){
    if(window.event){
        event = window.event;
    }try{
        var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
*/