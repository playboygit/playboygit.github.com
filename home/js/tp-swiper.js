/**
 * Created by zhoubing on 2014/12/11.
 */
$("document").ready(function(){
    var height = screen.height;
    var size = $(".swiper-wrapper .item").size();
    $("#wrap .swiper-wrapper").height(size*height);
    $("#wrap .item").height(height);
    var tpSwiper = new Swiper('#wrap',{
        mode: 'vertical'
    })
});