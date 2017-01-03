(function(){
    if($("#want-list").size()==1) return;
    var Comment = function() {
        var isRpl = 0,
            inputPrefix = 0,
            contentBox = $(".comment-input").get(0),
            rplName,
            content;

        function rpl(value, name) {
            isRpl = value;
            rplName = name;
            inputPrefix = "回复 " + name + " ：";
            $(contentBox).val(inputPrefix);
            moveEnd(contentBox);
        }

        function moveEnd(obj){
            obj.focus();
            var len = obj.value.length;
            if (document.selection) {
                var sel = obj.createTextRange();
                sel.moveStart('character',len);
                sel.collapse();
                sel.select();
            } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
                obj.selectionStart = obj.selectionEnd = len;
            }
        }

        function _submit() {
            $(".comment-cover").show();
            var goodsId = $("#goods_id").val(),
                comId = isRpl;
            content = $(contentBox).val();
            if(content.indexOf(inputPrefix) != 0) {
                comId = 0;
            } else {
                content =  content.replace(inputPrefix, "");
            }
            $.post("/comment/index",
                {
                    reply_comment_id: comId,
                    goods_id: goodsId,
                    comment:  content
                },
                _success
            );
        }

        function _addComment(data) {
            var wr = $(".comment-wr"),
                str = "";
            str = '<div class="comment"><div class="avatar"><img src="';
            str += data.data.user_avatar;
            str += '" alt="头像"/></div><div class="commentator">';
            str += data.data.user_nickname;
//            console.log(data.code == 0)
            if(isRpl != 0) {
                str += '<span class="rpy-to">';
                str += rplName;
                str += '</span>';
            }
            str += '</div><p class="comment">';
            str += content;
            str += '</p><div class="man"><a class="rpl" href="javascript:void(0);" onclick=\'reply('
                + data.data.comment_id + ',"' + data.data.user_nickname
                + '")\'>回复</a></div></div>';
            //$(str).appendTo(wr);
            $(str).insertBefore($(".post-comment"));
            $(contentBox).val("");
        }

        function _success(data, status) {
            var res = $.parseJSON(data);
            $(".comment-cover").hide();
            if(res.code != 0) {
                alert(res.msg);
            } else {
                // alert("评论成功！");
                _addComment(res);
            }
            isRpl = 0;
        }

        function _bind() {
            $(".sub-comment").on("click", _submit);
        }

        window.reply = rpl;

        return {
            bind: _bind
        };

    }();
    Comment.bind();
    /*为登录用户显示不全的手机号*/
    var user_id = zb_cookie.getCookie("user_id");
    if(user_id==''){
        $(".user-login-tip").css("display","inline-block");
    }
})();
function report()
{
    var goods_id = $("#goods_id").val();
    $.post('/goods/report', {goods_id:goods_id}, function(res){
        res = $.parseJSON(res);
        if (res.code != 0) {
            alert(res.msg);
        } else {
            alert('收到你的举报，我们会审查这件商品，非常感谢！');
        }
    });
}
var index = 0,isLogin=false;
$(document).ready(function(){
    $("a[rel=img_group]").fancybox({
        'transitionIn'      : 'fade',
        'transitionOut'     : 'fade',
        'cyclic': true,
        'titlePosition': 'over',
        'titleFormat'  : function(title, currentArray, currentIndex, currentOpts) {
            return '<span id="fancybox-title-over"> ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
        }
    });
    if($("#want-list").size()==1){
        if(zb_cookie.getCookie("user_id")){
            isLogin=true;
        }
        var isLoad = true;
        var pn = 1;
        $.ajax({
            url:"/want/timeline/"+pn,
            type:"get",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    var goods_list = data.data.want_list;
                    var lis = "";
                    if(goods_list.length==0){
                        isLoad=false;
                        return ;
                    }
                    $(".want-no").addClass("hide");
                    $("#want-list").removeClass("hide");
                    for(var i=0; i<goods_list.length;i++){
                        var comment_num = goods_list[i].comment_num=="0"?"":"("+goods_list[i].comment_num+")";
                        var phone = goods_list[i].phone?"手机："+goods_list[i].phone:"";
                        var qq = goods_list[i].qq?"QQ："+goods_list[i].qq:"";
                        var user_ope = "";
                        if(zb_cookie.getCookie("user_id")==goods_list[i].user_id){
                            user_ope='<div class="want-user-ope"><a href="/want/edit/'+goods_list[i].id+'">编辑</a><a href="javascript:;" class="del" data-pk="'+goods_list[i].id+'">删除</a></div>';
                        }else{
                            user_ope="";
                        }
                        lis += '<li class="want-item"><div class="want-li clearfix"><div class="left">'+
                            '<a href="/profile/'+goods_list[i].user_id+'"><img src="'+goods_list[i].avatar+'" alt="头像"/></a></div>'+
                            '<div class="right"><h4 class="want-name">[求购] <span>'+goods_list[i].name+'</span>'+user_ope+'</h4><p class="want-detail">'+goods_list[i].detail+'</p>'+
                            '<p class="want-attr"><span>期望价格</span><span class="want-price">¥'+goods_list[i].price+'</span><span>交易地点：</span><span class="want-add">'+goods_list[i].place+'</span><span>'+goods_list[i].time+'</span></p>'+
                            '<p class="want-contact"><a href="/profile/'+goods_list[i].user_id+'" class="want-person">'+goods_list[i].nickname+'</a><span class="want-cont">'+
                            '<span class="want-tel"><span class="mr10">'+phone+'</span><span>'+qq+'</span></span></span>'+
                            '</p><a href="javascript:;" class="want-com"  data-load="0" data-goods-id="'+goods_list[i].id+'"><span class="want-com-txt">评论<span>'+comment_num+'</span></span></a></div></div></li>';
                    }
                    $("#want-list").append($(lis));
                    pn++;
                    $(window).scroll(function(){
                        var winHeight = $(window).height()+$(window).scrollTop();
                        if(winHeight>=$("body").height() && isLoad){
                            isLoad=false;
                            $.ajax({
                                url:"/want/timeline/"+pn,
                                type:"get",
                                success:function(data){
                                    var data = $.parseJSON(data);
                                    if(data.code==0){
                                        var goods_list = data.data.want_list;
                                        pn++;
                                        isLoad=true;
                                        if(goods_list.length==0){
                                            isLoad=false;
                                        }else{
                                            var lis = "";
                                            for(var i=0; i<goods_list.length;i++){
                                                var comment_num = goods_list[i].comment_num=="0"?"":"("+goods_list[i].comment_num+")";
                                                var phone = goods_list[i].phone?"手机："+goods_list[i].phone:"";
                                                var qq = goods_list[i].qq?"QQ："+goods_list[i].qq:"";
                                                var user_ope = "";
                                                if(zb_cookie.getCookie("user_id")==goods_list[i].user_id){
                                                    user_ope='<div class="want-user-ope"><a href="/want/edit/'+goods_list[i].id+'">编辑</a><a href="javascript:;" class="del" data-pk="'+goods_list[i].id+'">删除</a></div>';
                                                }else{
                                                    user_ope="";
                                                }
                                                lis += '<li class="want-item"><div class="want-li clearfix"><div class="left">'+
                                                    '<a href="/profile/'+goods_list[i].user_id+'"><img src="'+goods_list[i].avatar+'" alt="头像"/></a></div>'+
                                                    '<div class="right"><h4 class="want-name"><span>'+goods_list[i].name+'</span>'+user_ope+'</h4><p class="want-detail">'+goods_list[i].detail+'</p>'+
                                                    '<p class="want-attr"><span>期望价格</span><span class="want-price">¥'+goods_list[i].price+'</span><span>交易地点：</span><span class="want-add">'+goods_list[i].place+'</span><span>'+goods_list[i].time+'</span></p>'+
                                                    '<p class="want-contact"><a href="/profile/'+goods_list[i].user_id+'" class="want-person">'+goods_list[i].nickname+'</a><span class="want-cont">'+
                                                    '<span class="want-tel"><span class="mr10">'+phone+'</span><span>'+qq+'</span></span></span>'+
                                                    '</p><a href="javascript:;" class="want-com"  data-load="0" data-goods-id="'+goods_list[i].id+'"><span class="want-com-txt">评论<span>'+comment_num+'</span></span></a></div></div></li>';
                                            }
                                            $("#want-list").append($(lis));
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
    }
}).on("mouseover",".ershou-photo-slide .ershou-small-photos",function(){
    index = $(this).index();
    $(".ershou-photo-slide").find(".small").removeClass("cur");
    $(this).children("img").addClass("cur");
    $(".bigger-photo-box .bigger-photo").removeClass("show").eq(index).addClass("show");
}).on("click",".want-com",function(){
    var _this = $(this);
    if($(this).closest(".want-li").next(".want-comments").css("display")=="block"){
        $(this).closest(".want-li").next(".want-comments").slideToggle(300);
    }else{
        if($(this).attr("data-load")=="0"){
            $(this).attr("data-load","1");
        }else{
            $(this).closest(".want-li").next(".want-comments").slideToggle(300);
            return false;
        }
        var id = $(this).attr("data-goods-id");
        $.ajax({
            url:"/want/comment_list/"+id,
            type:"get",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    var goods_list = data.data.comment_list;
                    var comment ="",imgSrc="";
                    if(isLogin){
                        imgSrc=data.data.user_avatar;
                        comment = '<div class="commenting want-commenting clearfix"><div class="comment-input-wr-wr"><div class="comment-input-wr"><textarea class="comment-input" name="comment-input" id=""></textarea></div></div><button class="sub-comment" type="button" data-reply="0" data-isreply="0">评论</button></div>';
                    }else{
                        imgSrc="http://hust.2shoujie.com/resource/image/avatar-unlogin.png";
                        comment = '<div class="commenting-unlogin want-commenting clearfix"><div class="comment-input-wr-wr"><div class="comment-input-wr"><span class="tips">评论总要登录留个名吧</span></div></div><button class="comment-login" data-type="l">登录</button></div>';
                    }
                    var lis = "";
                    if(goods_list.length==0){
                        lis = '<div class="comments want-comments"><div class="comments-wr"><div class="comment-wr"><div class="post-comment clearfix"><img class="avatar" src="'+imgSrc+'" alt="头像"/>'+comment+'</div></div></div></div>';
                    }else{
                        lis ='<div class="comments want-comments"><div class="comments-wr"><div class="comment-wr">';
                        for(var i=0; i<goods_list.length;i++){
                            var reply_name = goods_list[i].reply_nickname==""?"":'<span class="rpy-to">'+goods_list[i].reply_nickname+'</span>';
                            lis += '<div class="comment"><img class="avatar" src="'+goods_list[i].avatar+'" alt="头像"/><div class="commentator">'+goods_list[i].nickname+reply_name+'</div>'+
                                '<p class="comment">'+goods_list[i].comment+'</p><div class="man"><a class="rpl" href="javascript:void(0);" data-reply="'+goods_list[i].id+'" data-name="'+goods_list[i].nickname+'">回复</a></div></div>';
                        }
                        lis+='<div class="post-comment clearfix"><div class="comment-cover right-comment-cover"><span class="loader loader-quart"></span></div><img class="avatar" src="'+imgSrc+'" alt="头像"/>'+comment+'</div></div></div></div>';
                    }
                    _this.closest(".want-item").append($(lis));
                    _this.closest(".want-li").next(".want-comments").slideToggle(300);
                }else{
                    alert(data.msg);
                }
            }
        })
    }
}).on("click",".want-cont",function(){
    $(this).children("span").css("display","inline-block");
}).on("mouseenter",".want-cont",function(){
    if($(this).children("span").css("display")=="none"){
        $(this).addClass("want-cont-hover");
    }
}).on("mouseleave",".want-cont",function(){
    $(this).removeClass("want-cont-hover");
}).on("focus",".want-commenting .comment-input",function(){
    $(this).css("color","rgb(51, 51, 51)");
}).on("blur",".want-commenting .comment-input",function(){
    $(this).css("color","rgb(133, 141, 142)");
}).on("click",".want-comments .rpl",function(){
    if(isLogin){
        var reply = "回复 "+$(this).attr("data-name")+" ：";
        $(this).closest(".want-comments").find(".want-commenting").find(".comment-input").val(reply);
        $(this).closest(".want-comments").find(".want-commenting").find(".sub-comment").attr("data-reply",$(this).attr("data-reply")).attr("data-name",$(this).attr("data-name")).attr("data-isreply","1");
    }
}).on("click",".want-commenting .sub-comment",function(){
    var _this = $(this);
    var comment = "";
    if(_this.attr("data-isreply")=="1"){
        var reply = "回复 "+$(this).attr("data-name")+" ：";
        comment = $(this).closest(".want-commenting").find(".comment-input").val().replace(reply,"");
    }else{
        comment = $(this).closest(".want-commenting").find(".comment-input").val();
    }
    if(comment==""){
        alert("评论内容不能为空");
        return false;
    }
    $(".comment-cover").show();
    var id = $(this).closest(".want-item").find(".want-com").attr("data-goods-id");
    var parma={
        want_id:id,
        comment:comment,
        reply_id:_this.attr("data-reply")
    };
    $.ajax({
        url:"/want/comment",
        type:"post",
        data:parma,
        success:function(data){
            var data = $.parseJSON(data);
            $(".comment-cover").hide();
            if(data.code==0){
                var res = data.data.comment;
                var reply_name = res.reply_nickname==""?"":'<span class="rpy-to">'+res.reply_nickname+'</span>';
                var item = '<div class="comment"><img class="avatar" alt="头像" src="'+res.avatar+'"/><div class="commentator">'+res.nickname+reply_name+'</div><p class="comment">'+res.comment+'</p>'+
                    '<div class="man"><a class="rpl" href="javascript:void(0);" data-reply="'+res.id+'" data-name="'+res.nickname+'">回复</a></div></div>';
                _this.closest(".post-comment").before($(item));
                _this.closest(".want-commenting").find(".comment-input").val("");
            }else{
                alert(data.msg);
            }
        }
    })
}).on("click",".user-login-tip",function(){
    $(".log-reg").children().eq(0).click();
    zb_cookie.setCookie("cur_url",window.location.href);
}).on("click",".want-user-ope .del",function(){
    if(confirm("确认删除？删除后商品将永远消失哦！")){
        var _this = $(this);
        var id=$(this).attr("data-pk");
        $.ajax({
            url:"/want/delete/"+id,
            type:"post",
            success:function(data){
                var data = $.parseJSON(data);
                if(data.code==0){
                    _this.closest(".want-item").remove();
                    $(".pop-tip").removeClass("hide");
                    setTimeout(function(){
                        $(".pop-tip").addClass("hide");
                    },2000);
                }else{
                    alert(data.msg);
                }
            }
        });
    }
})

