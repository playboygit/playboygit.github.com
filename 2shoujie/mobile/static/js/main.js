$(document).ready(function(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        //微信平台内
        $(".login-list .weixin").removeClass("hide");
    }
    $(".login-foot .forgot-pass").click(function(){
        window.location.href="/login/forget";
    })
    $(".login-foot .register-now").click(function(){
        window.location.href="/mobile/register";
    })
}).on("click","#login-txt-box",function(){       //登录提交验证
    var flag = beforeSubmit($("#login-form"));
    if(flag){
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url:"/login",
            data:{username : username, password : password},
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href="/mobile";
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}).on("click","#register-txt-box",function(){       //注册提交验证
    var flag = beforeSubmit($("#register-form"));
    if(flag){
        var email = $("#email").val();
        var nickname = $("#nickname").val();
        var password = $("#password").val();
        $.ajax({
            url:"/login/register",
            data:{email : email, nickname : nickname, password : password,
                password_repeat : password},
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href="/mobile";
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}).on("click","#reset-txt-box",function(){       //修改密码提交验证
    var flag = beforeSubmit($("#reset-form"));
    if(flag){
        var email = $("#email").val();
        /*$.ajax({
            url:"",
            data:{email : email},
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href="";
                } else {
                    alert(res.msg);
                }
            }
        });*/
    }
}).on("click","#edit-profile",function(){
    var flag = beforeSubmit($("#edit-form"));
    if(flag){
        var nickname = $("#nickname").val();
        var qq = $("#qq").val();
        var tel = $("#tel").val();
        $.ajax({
            url:"/user/modify",
            data:{user_nickname:nickname,user_qq:qq,user_phone_number:tel},
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href="/mobile/user";
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}).on("click","#go-prev",function(){
    window.history.go(-1);
});
