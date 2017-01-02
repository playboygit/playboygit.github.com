var iSelects = 0;
var sWords = "纷繁俗世，宁静为怀";
var lWords = "月光如流水一般，静静地泻在这一片叶子和花上。薄薄的青雾浮起在荷塘里。叶子和花仿佛在牛乳中洗过一样；又像笼着轻纱的梦。虽然是满月，天上却有一层淡淡的云，所以不能朗照；但我以为这恰是到了好处－－酣眠固不可少，小睡也别有风味的。月光是隔了树照过来的，高处丛生的灌木，落下参差的斑驳的黑影，却又像是画在荷叶上。塘中的月色并不均匀 ，但光与影有着和谐的旋律，如梵婀玲上奏着的名曲。";
$(document).ready(function(){
	$(".container").css("min-height",$(window).height()+"px");
	$(window).on("scroll",function(){
		if($(window).scrollTop()>300){
			$("#scrollUp").fadeIn(300);
		}else{
			$("#scrollUp").fadeOut(300);
		}
	});
	if($(".jd-btn").size()>0){
		changeFonts($(".jd-btn"));
	}
}).on("click","#scrollUp",function(){
    $('html,body').animate({scrollTop: '0px'}, 300);
}).on("click",".goback",function(){ 
	window.history.back();
}).on("mouseup",document,function(){
	if($(".fonts-change-box").size()>0){ 
		$(".fonts-change-box").unbind("mousemove");
    	$(".fonts-change-box").unbind("mouseup");
	}
}).on("click",".tabs-words>li",function(){ 
	var index = $(this).index();
	$(".tabs-words>li").removeClass("active").eq(index).addClass("active");
}).on("click",".tabs_types>li",function(){ 
	var index = $(this).index();
	if(index==0){
		$(".search-words-area").addClass("hide");
		$(".search-words-ipt").removeClass("hide");
	}else{
		$(".search-words-ipt").addClass("hide");
		$(".search-words-area").removeClass("hide");
	}
	$(".priview_types_list>li").addClass("hide").eq(index).removeClass("hide");
}).on("click",".reset_tj",function(){//重置条件
	$(".wrap-tj").find(".radio-btn").removeClass("radio-btn-checked");
	$(".wrap-tj").find(".sw-btn").removeClass("sw-btn-selected");
	$(".search-words-ipt").val("");
	$(".search-words-area").val("");
	$(".select_fontcl").find(".select-cl").removeClass($(".select_fontcl").find(".select-cl").attr("data-color"));
	$(".select_fontcl").find(".select-cl").attr("data-color","bg333").addClass("bg333");
	$(".select_fontbg").find(".select-cl").removeClass($(".select_fontbg").find(".select-cl").attr("data-color"));
	$(".select_fontbg").find(".select-cl").attr("data-color","bgfff").addClass("bgfff");
	$(".select_fontsize").find(".select-txt").text(28);
	$(".line-text").css({"fontSize":"28px","fontWeight":"normal","fontStyle":"normal","color":"#333","backgroundColor":"#fff"}).html(sWords);
	$(".area-text").css({"fontSize":"16px","fontWeight":"normal","fontStyle":"normal","color":"#333","backgroundColor":"#fff"}).html(lWords);
}).on("click","#get_rights",function(){
	$(".pop-tips").removeClass("hide");
}).on("click","#sure_close",function(){
	$(".pop-tips").addClass("hide");
}).on("click",".close-pop,.close_types",function(){
	$(".pop-factor").addClass("hide");
}).on("click","#more_select",function(){
	$(".pop-factor").removeClass("hide");
}).on("click",".select_fontsize",function(){//调整字体大小
	$(this).next(".fsize-lst").toggleClass("hide");
}).on("click",".fsize-lst>li",function(){
	var $span = $(this).closest(".wrap-slibtn").find(".select_fontsize");
	$span.children(".select-txt").text($(this).text());
	$(this).closest(".fsize-lst").addClass("hide");
}).on("click",".select_fontcl",function(){//调整字体颜色
	$(this).next(".fcolor-lst").toggleClass("hide");
}).on("click",".fcolor-lst>li",function(){
	var sclolor = $(this).attr("class");
	var $em = $(this).closest(".wrap-slibtn").find(".select_fontcl").children(".select-cl");
	$em.removeClass($em.attr("data-color"));
	$em.addClass(sclolor).attr("data-color",sclolor);
	$(this).closest(".fcolor-lst").addClass("hide");
}).on("click",".select_fontbg",function(){//调整背景颜色
	$(this).next(".fcolor-lst").toggleClass("hide");
}).on("click",".fcolor-lst>li",function(){
	var sclolor = $(this).attr("class");
	var $em = $(this).closest(".wrap-slibtn").find(".select_fontbg").children(".select-cl");
	$em.removeClass($em.attr("data-color"));
	$em.addClass(sclolor).attr("data-color",sclolor);
	$(this).closest(".fcolor-lst").addClass("hide");
}).on("click",".sw-btn",function(){
	$(this).toggleClass("sw-btn-selected");
}).on("click",".types-list a",function(){//选择类型
	if($(this).hasClass("active")){
		$(this).removeClass("active");
		var text = $(this).text();
		iSelects--;
		$list = $(this).closest(".result-type-box").find(".select-list");
		$list.children("li").each(function(){
			if($(this).children(".s-name").text()==text){
				$(this).remove();
				return false;
			}
		});
	}else{
		if(iSelects>9){
			$(".error-tip").show();
			setTimeout(function(){
				$(".error-tip").fadeOut(300);
			},2000);
		}else{
			iSelects++;
			$(this).addClass("active");
			var $slist = $(this).closest(".result-type-box").find(".select-list");
			var type = $(this).closest(".wrap-select-item").find(".title-left").text();
			$slist.append('<li><span class="s-type">'+type+'</span> <a class="s-name">'+$(this).text()+'</a></li>');
		}
	}	
}).on("click",".s-name",function(){
	$(this).closest("li").remove();
	iSelects--;
	var text = $(this).text();
	var $content = $(this).closest(".result-type-box");
	$content.find(".select-item").each(function(){
		if($(this).text()==text){
			$(this).removeClass("active");
			return false;
		}
	});
}).on("click",".clear-select",function(){
	$(this).siblings(".select-list").children("li").remove();
	iSelects=0;
	var $content = $(this).closest(".result-type-box");
	$content.find(".select-item").each(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}
	});
}).on("click",".wrap-select-item .slide-btn",function(){
	$(this).closest(".wrap-select-item").toggleClass("close-slist");
}).on("click",".radio-btn",function(){
	$(".radio-btn").removeClass("radio-btn-checked");
	$(this).addClass("radio-btn-checked");
}).on("click",".download-btn",function(){
	$(".pop-down").removeClass("hide");
}).on("click",".cancel-btn",function(){
	$(".pop-down").addClass("hide");
}).on("click",".preview-btn",function(){
	var index = $(".tabs_types").children(".active").index();
	var text = "";
	var type = 0;
	var fz = $(".select_fontsize").children(".select-txt").text();
	var fstyle = $(".font-bold").hasClass("sw-btn-selected")?"bold":"normal";
	var fitalic = $(".font-qx").hasClass("sw-btn-selected")?"italic":"normal";
	var fcolor = "#"+$(".select_fontcl").find(".select-cl").attr("data-color").split("bg")[1];
	var fbgcolor = "#"+$(".select_fontbg").find(".select-cl").attr("data-color").split("bg")[1];
	//繁体or简体
	if($(".radio_fan").hasClass("radio-btn-checked")){ 
		type = 1;
	}else{ 
		type = 0;
	}
	if(index==0){
		text = $(".search-words-ipt").val();
		var str = convert(type, text);
		$(".line-text").css({"fontSize":fz+"px","fontWeight":fstyle,"fontStyle":fitalic,"color":fcolor,"backgroundColor":fbgcolor}).html(str);
	}else{
		text = $(".search-words-area").val();
		var str = convert(type, text);
		$(".area-text").css({"fontSize":fz+"px","fontWeight":fstyle,"fontStyle":fitalic,"color":fcolor,"backgroundColor":fbgcolor}).html(str);
	}
});

//获取授权
function getRight(tel){
	var url = "";
	var args = {
		tel:tel
	}
	$.postJson(url, args, function(res){
		if(res.success){

		}else{
			alert("服务器出错了，请联系管理员");
		}
	});
}
//调正字体大小
function changeFonts($obj){ 
	$obj.on("mousedown",function(ev){
	        var percent = 0;
	        var oMove = $(this);
	        var left =  oMove.position().left;
	        var disX = ev.clientX-oMove.position().left;
	        var _this = oMove.closest(".fonts-change-box");
	        var width = oMove.closest(".fonts-change-box").width()-12;
	        _this.on("mousemove",function(ev){
	            drag = true;
	            var left = ev.clientX-disX;
	            if(left<0){left=0;}
	            if(left>width){left=width;}
	            oMove.css({left:left});
	            percent = (left/width).toFixed(2);
	            oMove.attr("data-num",parseInt(percent*100));
	            $(".fonts-vbox").css("font-size",(12+parseInt(percent*100)*0.24)+"px");
	        });
	        if(oMove[0].setCapture){
	            oMove[0].setCapture();
	        }
	        _this.on("mouseup",function(ev){
	            if(oMove[0].releaseCapture){
	                oMove[0].releaseCapture();
	            }
	            _this.unbind("mousemove");
	            _this.unbind("mouseup");
	        });
	        return false;
    	});
}
//封装get/post请求
(function(){ 
	$.getJson = function(url, func){ 
		$.ajax({ 
			url:url,
			type:"get",
			success:func,
			error:function(res){ 
				console.log("服务器出错了！！");
			}
		});
	}
	$.postJson = function(url, args, func){ 
		$.ajax({ 
			url:url,
			type:"post",
			data:args,
			success:func,
			error:function(){ 
				console.log("服务器出错了！！");
			}
		});
	}
})(jQuery);