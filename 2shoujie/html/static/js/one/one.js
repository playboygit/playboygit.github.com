var topic_page = 1;
(function(){
    var Slider = function() {
        var cur,slideNum;
        var dots;
        var toClear = null;
        var current = null;
        var current_dot = null;

        function interval(){
            cur = cur % slideNum;
            for(var i=0;i<2;i++){
                current.removeClass("current");
                current_dot.removeClass("current");
            }
            current = $(".slide-pic").eq(cur);
            current_dot = $(".slide-count").eq(cur);
            current.addClass("current");
            current_dot.addClass("current");
            toClear = setTimeout(function(){
                interval();
            }, 4000);
            cur++;
        }

        function _init(){
            var lis;
            lis = photos[0].children;
            slideNum = lis.length;
            dots = document.createElement("ul");
            $(".slide-dots")[0].appendChild(dots);
            for(var i=0; i<slideNum; i++){
                if(slideNum > 1){
                    var li_tmp = document.createElement("li");
                    li_tmp.className = "slide-count";
                    dots.appendChild(li_tmp);
                }
            }
            $(".slide-count:first").addClass("current");
            cur=0;
            current = $(".slide-pic:first");
            current_dot = $(".slide-count:first");
            interval();
            _slideOnHand();
        }

        function _slideOnHand(){
            var odots = $(".slide-count");
            odots.each(function(){
                $(this).bind("mouseover",function(){
                    clearTimeout(toClear);
                    cur = $(".slide-count").index(this);
                    toClear = setTimeout(function(){
                        interval();
                    }, 500);
                })
            })
        }

        return {
            init: _init
        }
    }();

    function loadMoreTopics(){
        var totalheight= parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if ($(document).height() <= totalheight+$("footer").height()){
            console.log($(document).height());
            $(".topic-loading").removeClass("hidden");
            loadTopics();
            for(var i=0;i<3;i++);
            $(window).unbind("scroll");
        }
    }

    function loadTopics(){
        $.get(
            '/topic/more',
            {page: ++topic_page},
            function(res) {
                $(".topic-loading").addClass("hidden");
                if (res.length == 0) {
                    $(".topic-loading").addClass("hidden");
                } else {
                    $("#topics-wrapper").append(res);
                    $(window).bind("scroll",loadMoreTopics);
                }
            }
        );
        // $.ajax({
        //     url : 'test.php',
        //     dataType : 'text',
        //     success : function(){
        //         $(".topic-loading").addClass("hidden");

        //         $("#topics-wrapper").append('<div class=\"topic-item\"><div class="topic-title center"><\/div><\/div>');

        //         $(window).bind("scroll",loadMoreTopics);
        //     }
        // });
    }

    if($(".big-photos ul").length){
        var photos = $(".big-photos ul");
        Slider.init();
    }

    if($(".buy-btn").length){
        var buy_btn = $(".buy-btn a");
        var order = $("#order-wrapper");
        buy_btn.bind("click",function(event){
            event.preventDefault();
            order.removeClass("hidden");
        });

        order.bind("click",function(event){
            event.stopPropagation();
            if(event.target.id == "order-wrapper"){
                order.addClass("hidden");
            }
        });
    }

    if($("#topics-wrapper").length){
        $(window).bind("scroll",loadMoreTopics);
    }

    if($(".comment-btn").length){
        var comment_btn = $(".comment-btn");
        var comment_place = $(".comment-input");
        comment_btn.bind("click",function(event){
            event.preventDefault();
            $(this).addClass("hidden");
            comment_place.removeClass("hidden");
            $("#put-comment").focus();
        });
    }

})();

function buy()
{
    var name = $("#b-name").val(),
        school = $("#b-school").val(),
        contact = $("#b-contact").val(),
        add = $("#b-add").val(),
        one_id = $("#one_id").val();
    if (!name.trim())
    {
        alert('没有填写姓名哦');
        return;
    }
    if (!school.trim())
    {
        alert('没有填写交易学校哦');
        return;
    }
    if (!contact.trim())
    {
        alert('没有填写联系方式哦');
        return;
    }
    $.post(
        '/mobile/one/buy',
        {name:name, school:school, contact:contact, add:add, one_id:one_id},
        function(res) {
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
            } else {
                alert('下单成功，卖家之后会联系您的哦');
                window.location.reload();
            }
        }
    );
}

function discuss()
{
    var topic_id = $("#topic_id").val(),
        content  = $("#put-comment").val();
    $.post(
        '/topic/discuss',
        {discuss_topic_id: topic_id, discuss_content: content},
        function(res) {
            res = $.parseJSON(res);
            if (res.code == 0) {
                var li = '<li class="comment clearfix">';
                li += '<div class="t-avatar name">';
                li += '<div><img src="'+res.data.discuss.discuss_avatar+'" /></div>';
                li += '</div><div class="comm-content value"><p>'+res.data.discuss.discuss_content+'</p></div></li>';
                $('.comment_wrapper ul').append(li);
                $("#put-comment").val('');
            } else {
                alert(res.msg);
            }
        }
    );
}