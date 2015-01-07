$(document).ready(function(){
    var height = screen.height;
    var size = $(".swiper-wrapper .item").size();
    $("#swiper-container .swiper-wrapper").height(size*height);
    $("#swiper-container .item").height(height);
    var tpSwiper = new Swiper('#swiper-container',{
        mode: 'vertical',
        loop:false,
        grabCursor: true
    })
}).on("click",".cyli-lst li",function(){
    var $niu = $('<div class="z-niu"><img src="img/z_niu.png"></div>');
	var prevImg = $(".cyli-lst").children(".active").children("img");
	prevImg.attr("src",prevImg.attr("data-nsrc"));
	var index = $(this).index();
	$(this).children("img").attr("src",$(this).children("img").attr("data-asrc"));
    $(".cyli-lst").find(".z-niu").remove(); 
	$(".cyli-lst li").removeClass("active").eq(index).addClass("active").append($niu);

});