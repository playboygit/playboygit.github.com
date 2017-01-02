/**
 * Created by zhoubing on 2014/12/6.
 */
$(document).ready(function(){
    var lineW = $(".content-slide").width();
    var swiperW = $(".home-swiper-container").width();
    var startX = 0;
    var endX = lineW/2+"px";
    var startIndex = 0;
    var homeSwiper = new Swiper('.home-swiper-container',{
        loop:false,
        grabCursor: true,
        paginationClickable: false,
        onTouchStart:function(swiper){
            startX = homeSwiper.getWrapperTranslate("x");
            startIndex = $(".swiper-wrapper .swiper-slide-active").index();
        },
        onTouchMove:function(swiper){
            var offsetX = homeSwiper.getWrapperTranslate("x");
            var lineX = -offsetX*lineW/swiperW/2+"px";
            if(offsetX<0 && offsetX > -swiperW){
                $(".content-slide .swiper-active-switch").css("transform","translate3d("+lineX+", 0, 0)").css("-webkit-transform","translate3d("+lineX+", 0, 0)");
            }
        },
        onTouchEnd:function(swiper){
            var endIndex = $(".swiper-wrapper .swiper-slide-active").index();
            var offsetX = homeSwiper.getWrapperTranslate("x");
            if(offsetX<0  && offsetX > -swiperW){
                if(Math.abs(offsetX-startX)<=swiperW/2){
                    if(offsetX<startX){
                        $(".content-slide .swiper-active-switch").css("transform","translate3d(0, 0, 0)").css("-webkit-transform","translate3d(0, 0, 0)");
                    }else{
                        $(".content-slide .swiper-active-switch").css("transform","translate3d("+endX+", 0, 0)").css("-webkit-transform","translate3d("+endX+", 0, 0)");
                    }
                }else{
                    if(offsetX<startX){  //左
                        $(".content-slide .swiper-active-switch").css("transform","translate3d("+endX+", 0, 0)").css("-webkit-transform","translate3d("+endX+", 0, 0)");
                    }else{
                        $(".content-slide .swiper-active-switch").css("transform","translate3d(0, 0, 0)").css("-webkit-transform","translate3d(0, 0, 0)");
                    }
                }
            }
            if(endIndex!=startIndex){
                if(offsetX<startX){  //左
                    $(".content-slide .swiper-active-switch").css("transform","translate3d("+endX+", 0, 0)").css("-webkit-transform","translate3d("+endX+", 0, 0)");
                }else{
                    $(".content-slide .swiper-active-switch").css("transform","translate3d(0, 0, 0)").css("-webkit-transform","translate3d(0, 0, 0)");
                }
            }
        }
    });
    //console.log($(window).height()+"---"+document.documentElement.clientHeight);
   /*var preventBehavior = function(e) {
        e.preventDefault();
    };
// Enable fixed positioning
    document.addEventListener("touchmove", preventBehavior, false);*/
    if($(".container").height()<$(window).height()){
        $(".footer").addClass("fix-footer");
    }
    $(window).resize(function(){
        if($(".container").height()<$(window).height()){
            $(".footer").addClass("fix-footer");
        }
    });
});

/*document.addEventListener('touchstart', function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
}, false);
document.addEventListener('touchmove', function (ev) {
    var moveX = ev.changedTouches[0].pageX-startX;
    var moveY = ev.changedTouches[0].pageY-startY;
    //$(".fix-footer").css("bottom",0);
}, false);
document.addEventListener('touchend', function (ev) {
    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
        case 0:

            break;
        case 1:

            break;
        case 2:

            break;
        case 3:  //左
            if(curIndex==iLength) {
                curIndex=0;
            }else{
                curIndex++;
            }
            $(".slide-roll li").removeClass("active").eq(curIndex).addClass("active");
            startMove($this, {left:-(curIndex*settings.width)});
            break;
        case 4:

            break;
        default:
    }
}, false);


//返回角度
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}*/