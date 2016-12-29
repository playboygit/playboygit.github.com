
$(document).ready(function(){
	var htmlNode = "<div class='col-md-4'><div class='wrap-img'><img src='images/small01.png'></div>"+
          "<div class='bottom-content'><div class='content-title'><span class='content-person'>"+
          "<span class='wrap-per-img'><img src='images/person.png' class='per-img'></span>KDD</span>"+
          "+<h2><a href='javascript:;'>曲径通  \"悠\"，鹤薮村看海</a></h2><div class='operate-attr'>"+
           "<i class='hand'>3</i><i class='speak'>3</i><i class='spare'>2</i></div>"+
           "<a href='javascript:;' title='分类：团队活动' class='i-bottom'><img src='images/ux.png'></a></div></div></div>"; 
    var $loading = $("<div class='container loading'></div>");
	$(window).scroll(function(){
		var winHeight = $(window).height()+$(window).scrollTop();
		if($(window).scrollTop()>200) {
			$(".go-top").css("display","block");
		}else{
			$(".go-top").css("display","none");
		}
		if(winHeight>$("body").height() && $(".content-container").children(".row").size()<20){
			$(".content-container").append($loading);
			setTimeout(function(){
				$loading.remove();
				var nodes = htmlNode+htmlNode+htmlNode;
				var $row = $("<div class='row'></div>").append($(nodes));
				$(".content-container").append($row);
			},1500);
			
		}
	});
}).on("click",".go-top a",function(){
	//$(window).scrollTop(0);
	startMove($(window),{top:0});
}).on("mouseover",".col-md-4,.col-md-8",function(){
	$(this).children(".wrap-img").children("img").css("opacity",0.6);
}).on("mouseout",".col-md-4,.col-md-8",function(){
	$(this).children(".wrap-img").children("img").css("opacity",1);
});	

function startMove($obj, json){
		clearInterval($obj[0].timer);
		$obj[0].timer = setInterval(function(){
			var goalValue = json.top;
			var curValue = $obj.scrollTop();
			var speed = (goalValue-curValue)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(curValue!=goalValue){
				$obj.scrollTop(curValue+speed);
			}else{
				clearInterval($obj[0].timer);
			}
		},30);
	}