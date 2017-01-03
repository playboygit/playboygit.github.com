(function(){
    var ballFloat = function(){
        var scrollTop,viewHeight = getViewHeight();
        var idis = 1000,ddis = 700;
        var job_num = $(".job").length;
        var jpos = 0;

        $(window).bind("scroll",function() {
            var rown;
            scrollTop = _getScrollTop();
            rown = Math.floor((scrollTop + viewHeight - idis) / ddis);
            jpos = 2*rown+1;
            if (scrollTop + viewHeight > idis && jpos < job_num) {
                $(".job").eq(2*rown).addClass("ball-float");
                $(".job").eq(jpos).addClass("ball-float");
            }
        });

        function _getScrollTop(){
            return document.body.scrollTop || document.documentElement.scrollTop;
        }
    }

    function getViewHeight(){
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    function applyPop(){
        $("#mask-mail")[0].style.height = getViewHeight() + "px";
        $("#mask-mail").removeClass("hidden");
    }

    $(".apply-bt a").bind("click", function(){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        applyPop();
    });
    $("#mask-mail").bind("click",function(){
        $("#mask-mail").addClass("hidden");
    })
    ballFloat();
})();
