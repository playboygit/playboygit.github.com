var arrP2={
    sm:["国企改革试点扩大，混合所有制，薪酬改革，打破旧制度藩篱，催生市场热点",
        "上海自贸区珠玉在前，第二批自贸区牌照待发，津闽粤相关个股存在主题投资机会",
        "土地管理法与中央1号文件主题双重叠加效应",
        "体制改革加速，长期限制体育产业发展的政企不分因素，有望打破，催生新业态、新经济和新投资热点",
        "迪斯尼2015年底落成，利好周边消费、旅游等",
        "中国从韬光养晦走向资本输出，区域经济令人遐想",
        "新型城镇化规划出台第二年，政策细化催生相关概念",
        "智能化、信息化，中国经济长期依赖的制造业获得产业升级机会",
        "城市功能重新定位，河北经济提速，京津战略转型"],
    yp:["15年一季度看央企，二季度地方国企","15年一季度","15年年初","15年一季度","14年四季度起至迪斯尼落成前夕结束",
        "14年四季度——15年一季度","贯穿全年","贯穿全年","15年上半年"],
    gg:["百联股份、浦东金桥","北部湾港、浦东金桥、自仪股份","杭钢集团、浦东金桥、华西股份","中体产业、雷曼光电、探路者",
        "百联股份、浦东金桥、锦江股份","青松建化、八一钢铁、上港集团、宁波港","地产、基建、智慧城市","机器人、汇川技术、长荣股份、光韵达","荣盛发展、廊坊发展、华夏幸福"]
};
var flag1 = true;
var flagArr = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
$(document).ready(function(){
    var height = screen.height;
    var size = $(".swiper-wrapper .item").size();
    $("#swiper-container .swiper-wrapper").height(size*height);
    $("#swiper-container .item").height(height);
    var tpSwiper = new Swiper('#swiper-container',{
        mode: 'vertical',
        loop:true,
        grabCursor: true,
        onSlideChangeEnd:function(swiper){
            console.log(swiper.activeIndex);
            switch(swiper.activeIndex-1){
                case 0:
                    $(".last .slideUp").addClass("hidden").removeClass("box-mup");
                    $(".arrow-lst").removeClass("hidden").addClass("box-goup");
                    $(".b-txt .cfpl-txt").removeClass("hidden").addClass("box-slide-up");
                    $(".red-bg .md-box").addClass("hidden").removeClass("box-slide-mup");
                    setTimeout(function(){
                        $(".b-txt .dfzq-txt").removeClass("hidden").addClass("box-slide-up");
                        
                        setTimeout(function(){
                              $(".s-logo").removeClass("hidden").addClass("box-pop-in"); 
                        },200);
                    },800);
                break;
                case 26:
                    $(".last .slideUp").addClass("hidden").removeClass("box-mup");
                    $(".arrow-lst").removeClass("hidden").addClass("box-goup");
                    $(".b-txt .cfpl-txt").removeClass("hidden").addClass("box-slide-up");
                    $(".red-bg .md-box").addClass("hidden").removeClass("box-slide-mup");
                    setTimeout(function(){
                        $(".b-txt .dfzq-txt").removeClass("hidden").addClass("box-slide-up");
                        setTimeout(function(){
                              $(".s-logo").removeClass("hidden").addClass("box-pop-in"); 
                        },200);
                    },800);
                break;
                case 1:
                    $(".arrow-lst").addClass("hidden").removeClass("box-goup");
                    $(".b-txt .dfzq-txt").addClass("hidden").removeClass("box-slide-up");
                    $(".b-txt .cfpl-txt").addClass("hidden").removeClass("box-slide-up");
                    $(".s-logo").addClass("hidden").removeClass("box-pop-in"); 
                    $(".reda1 .slideDown1").addClass("hidden").removeClass("box-slide-down");
                $(".reda1 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".reda1 .slideDown3").addClass("hidden").removeClass("box-slide-mdown"); 
                setTimeout(function(){
                	$(".red-bg .md-box").removeClass("hidden").addClass("box-slide-mup");
                },200);
                break;
                case 2:
                $(".red-bg .md-box").addClass("hidden").removeClass("box-slide-mup");
                $(".reda2 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".reda2 .slideDown3").addClass("hidden").removeClass("box-slide-down");
                setTimeout(function(){
                    $(".reda1 .slideDown1").removeClass("hidden").addClass("box-slide-down");
                    setTimeout(function(){
                        $(".reda1 .slideDown2").removeClass("hidden").addClass("box-slide-down");
                        setTimeout(function(){
                            $(".reda1 .slideDown3").removeClass("hidden").addClass("box-slide-mdown");  
                        },800);
                    },800);
                },50);
                break;
                case 3:
                $(".reda1 .slideDown1").addClass("hidden").removeClass("box-slide-down");
                $(".reda1 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".reda1 .slideDown3").addClass("hidden").removeClass("box-slide-mdown");
                $(".redb1 .slideDown1").addClass("hidden").removeClass("box-slide-down");
                $(".redb1 .slideDown2").addClass("hidden").removeClass("box-slide-down"); 
                    setTimeout(function(){
                        $(".reda2 .slideDown2").removeClass("hidden").addClass("box-slide-down");
                        setTimeout(function(){
                            $(".reda2 .slideDown3").removeClass("hidden").addClass("box-slide-down");   
                        },600);
                    },200);
                break;
                case 4:
                $(".reda2 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".reda2 .slideDown3").addClass("hidden").removeClass("box-slide-down");
                $(".redb2 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                setTimeout(function(){
                    $(".redb1 .slideDown1").removeClass("hidden").addClass("box-slide-down");
                    setTimeout(function(){
                        $(".redb1 .slideDown2").removeClass("hidden").addClass("box-slide-down");
                    },800);
                },50);
                break;
                case 5:
                $(".redb1 .slideDown1").addClass("hidden").removeClass("box-slide-down");
                $(".redb1 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".blue02 .md-box").addClass("hidden").removeClass("box-slide-mup");
                    setTimeout(function(){
                        $(".redb2 .slideDown2").removeClass("hidden").addClass("box-slide-down");
                    },200);
                break;
                case 6:
                $(".redb2 .slideDown2").addClass("hidden").removeClass("box-slide-down");
                $(".part20 .tip-box-l").addClass("hidden").removeClass("box-slide-left");
                $(".part20 .tip-box-r").addClass("hidden").removeClass("box-slide-right");
                $(".part20 .popIn").addClass("hidden").removeClass("box-pop-in");
                $(".part20 .part20-title").addClass("hidden").removeClass("box-fadeIn");
                 $(".cyli-lst .z-niu").addClass("hidden").removeClass("box-mshake");
                //$(".cyli-lst").removeClass("reflect");
                setTimeout(function(){
                	$(".blue02 .md-box").removeClass("hidden").addClass("box-slide-mup");
                },200); 
                break;
                case 7:
                $(".blue02 .md-box").addClass("hidden").removeClass("box-slide-mup");
                $(".yellow03 .md-box").addClass("hidden").removeClass("box-slide-mup");
                //$(".cyli-lst").addClass("reflect");
                setTimeout(function(){
					$(".part20 .tip-box-l").removeClass("hidden").addClass("box-slide-left");
					$(".part20 .tip-box-r").removeClass("hidden").addClass("box-slide-right");
					setTimeout(function(){
						$(".part20 .popIn").removeClass("hidden").addClass("box-pop-in");
						setTimeout(function(){
		                    $(".part20 .part20-title").removeClass("hidden").addClass("box-fadeIn");
		                },400); 
					},800);
                },100);                                          
                $(".cyli-lst .z-niu").removeClass("hidden").addClass("box-mshake");
                if(flag1){
                    setTimeout(function(){
                        var i=0;
                        var timer = setInterval(function(){
                            if(i<9){
                                i++;
                            }else{

                                clearInterval(timer);
                            } 
                            if(i<9){
                                var $this = $(".cyli-lst li").eq(i);
                                var $niu = $('<div class="z-niu hidden"><img src="img/z_niu.png"></div>');
                                var prevImg = $(".cyli-lst").children(".active").children("img");
                                prevImg.attr("src",prevImg.attr("data-nsrc"));
                                var index = $(this).index();
                                $this.children("img").attr("src",$this.children("img").attr("data-asrc"));
                                $(".cyli-lst").find(".z-niu").remove(); 
                                $(".cyli-lst li").removeClass("active").eq(i).addClass("active").append($niu);
                                $("#tip1").html(arrP2.sm[i]);
                                $("#tip2").html(arrP2.yp[i]);
                                $("#tip3").html(arrP2.gg[i]);
                                $(".cyli-lst .z-niu").removeClass("hidden").addClass("box-mshake"); 
                                $(".cyli-lst li").removeClass("reflect");
                                setTimeout(function(){
                                    $(".cyli-lst li").addClass("reflect");
                                },200);
                            }             
                        },3000);
                    },1000);      
                    flag1=false;
                }
                break;
                case 8:
                $(".part20 .tip-box-l").addClass("hidden").removeClass("box-slide-left");
                $(".part20 .tip-box-r").addClass("hidden").removeClass("box-slide-right");
                $(".part20 .popIn").addClass("hidden").removeClass("box-pop-in");
                $(".part20 .part20-title").addClass("hidden").removeClass("box-fadeIn");
                 $(".cyli-lst .z-niu").addClass("hidden").removeClass("box-mshake"); 
                 //$(".cyli-lst").removeClass("reflect");
                setTimeout(function(){
                	$(".yellow03 .md-box").removeClass("hidden").addClass("box-slide-mup");
                },200);
                break;
                case 9:
                $(".yellow03 .md-box").addClass("hidden").removeClass("box-slide-mup");
                $(".part3-statu-img").addClass("box-shake");
                setTimeout(function(){
                    $(".part3-statu-img").removeClass("box-shake");
                },650);
                switchPart3(swiper.activeIndex-1);
                               
                break;  
                case 25:
                $(".arrow-lst").addClass("hidden").removeClass("box-goup");
                $(".b-txt .dfzq-txt").addClass("hidden").removeClass("box-slide-up");
                $(".b-txt .cfpl-txt").addClass("hidden").removeClass("box-slide-up");
                $(".s-logo").addClass("hidden").removeClass("box-pop-in"); 
                $(".last .slideUp").removeClass("hidden").addClass("box-mup");
                $(".last .goUp").removeClass("hidden").addClass("box-goUp");
                break; 
                case -1:
                $(".arrow-lst").addClass("hidden").removeClass("box-goup");
                $(".b-txt .dfzq-txt").addClass("hidden").removeClass("box-slide-up");
                $(".b-txt .cfpl-txt").addClass("hidden").removeClass("box-slide-up");
                $(".s-logo").addClass("hidden").removeClass("box-pop-in"); 
                $(".last .slideUp").removeClass("hidden").addClass("box-mup");
                $(".last .goUp").removeClass("hidden").addClass("box-goUp");
                break; 
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                switchPart3(swiper.activeIndex-1);
                break;         
            } 
        }
    });
    setTimeout(function(){
        var img = new Image();
        img.onload=function(){
            var timer = setInterval(function() {
                if (img.complete) {
                    $(".loading").addClass("hide");
                    $(".arrow-lst").removeClass("hidden").addClass("box-goup");
                    $(".b-txt .cfpl-txt").removeClass("hidden").addClass("box-slide-up");
                    setTimeout(function(){
                    $(".b-txt .dfzq-txt").removeClass("hidden").addClass("box-slide-up");
                        setTimeout(function(){
                              $(".s-logo").removeClass("hidden").addClass("box-pop-in"); 
                        },200);
                    },400);
                    setTimeout(function(){
                        $(".swiper-slide").addClass("visiable");
                    },400);
                    clearInterval(timer);
                }
            }, 50);
        }
        img.src="img/first_bg.jpg";  
    },3000); 
    
}).on("click",".cyli-lst li",function(){
    var $niu = $('<div class="z-niu hidden"><img src="img/z_niu.png"></div>');
	var prevImg = $(".cyli-lst").children(".active").children("img");
	prevImg.attr("src",prevImg.attr("data-nsrc"));
	var index = $(this).index();
	$(this).children("img").attr("src",$(this).children("img").attr("data-asrc"));
    $(".cyli-lst").find(".z-niu").remove(); 
	$(".cyli-lst li").removeClass("active").eq(index).addClass("active").append($niu);
    $("#tip1").html(arrP2.sm[index]);
    $("#tip2").html(arrP2.yp[index]);
    $("#tip3").html(arrP2.gg[index]);
    $(".cyli-lst .z-niu").removeClass("hidden").addClass("box-mshake"); 
}).on("click",".slide31 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node"+oldIndex).addClass("node"+index);
    $(this).removeClass("node"+index).addClass("node"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc1").attr("src","img/3/01"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide32 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc2").attr("src","img/3/02"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide33 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node-"+oldIndex).addClass("node-"+index);
    $(this).removeClass("node-"+index).addClass("node-"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc3").attr("src","img/3/03"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide34 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node-"+oldIndex).addClass("node-"+index);
    $(this).removeClass("node-"+index).addClass("node-"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc4").attr("src","img/3/04"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide35 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    $(".cont-35 p").html($(".cont-35").attr("p"+index));
    acNode.removeClass("node-"+oldIndex).addClass("node-"+index);
    $(this).removeClass("node-"+index).addClass("node-"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc5").attr("src","img/3/05"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide36 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node"+oldIndex).addClass("node"+index);
    $(this).removeClass("node"+index).addClass("node"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc6").attr("src","img/3/06"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide37 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node-"+oldIndex).addClass("node-"+index);
    $(this).removeClass("node-"+index).addClass("node-"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc7").attr("src","img/3/07"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide38 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node"+oldIndex).addClass("node"+index);
    $(this).removeClass("node"+index).addClass("node"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc8").attr("src","img/3/08"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide39 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc9").attr("src","img/3/09"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide310 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc10").attr("src","img/3/10"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide311 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc11").attr("src","img/3/11"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide312 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node"+oldIndex).addClass("node"+index);
    $(this).removeClass("node"+index).addClass("node"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
   $("#imgsrc12").attr("src","img/3/12"+index+".png");
   $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide313 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc13").attr("src","img/3/13"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide314 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node"+oldIndex).addClass("node"+index);
    $(this).removeClass("node"+index).addClass("node"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc14").attr("src","img/3/14"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide315 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("nodes"+oldIndex).addClass("nodes"+index);
    $(this).removeClass("nodes"+index).addClass("nodes"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc15").attr("src","img/3/15"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
}).on("click",".slide316 .node",function(){
    var acNode = $(this).closest("div").children(".node-ac");
    var oldIndex = $(this).closest("div").attr("data-index");
    var index = $(this).attr("data-index");
    acNode.children("h3").html(acNode.attr("p"+index));
    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
    $(this).removeClass("node_"+index).addClass("node_"+oldIndex);
    $(this).attr("data-index",oldIndex);
    acNode.attr("data-index",index);
    $(this).closest("div").attr("data-index",index);
    $("#imgsrc16").attr("src","img/3/16"+index+".png");
    $(".part3-statu-img").addClass("box-shake");
    setTimeout(function(){
        $(".part3-statu-img").removeClass("box-shake");
    },650);
});

function switchPart3(index){
    var tempIndex = index-9;
    var tempLindex = tempIndex+1;
    if(flagArr[tempIndex]){
        setTimeout(function(){
        var i=0;
        var length = $(".slide3"+tempLindex+" .node").size();
        var timer = setInterval(function(){
            if(i<length){
                i++;
                var $this = $(".slide3"+tempLindex+" .node").eq(i); 
                var acNode = $this.closest("div").children(".node-ac");
                var oldIndex = $this.closest("div").attr("data-index");
                var index = $this.attr("data-index");
                acNode.children("h3").html(acNode.attr("p"+index));
                if(length==4){
                    acNode.removeClass("node"+oldIndex).addClass("node"+index);
                    $this.removeClass("node"+index).addClass("node"+oldIndex);
                }else if(length==2){
                    acNode.removeClass("nodes"+oldIndex).addClass("nodes"+index);
                    $this.removeClass("nodes"+index).addClass("nodes"+oldIndex);
                }else if(length==3){
                    acNode.removeClass("node-"+oldIndex).addClass("node-"+index);
                    $this.removeClass("node-"+index).addClass("node-"+oldIndex);
                }else if(length==5){
                    acNode.removeClass("node_"+oldIndex).addClass("node_"+index);
                    $this.removeClass("node_"+index).addClass("node_"+oldIndex);
                }
                $this.attr("data-index",oldIndex);
                acNode.attr("data-index",index);
                $this.closest("div").attr("data-index",index);
                if(index){
                    if(tempLindex<10){
                        $("#imgsrc"+tempLindex).attr("src","img/3/0"+tempLindex+""+index+".png");
                    }else{
                        $("#imgsrc"+tempLindex).attr("src","img/3/"+tempLindex+""+index+".png");
                    }  
                }
            }else{
                clearInterval(timer);
            }
            },3000);
        },1000);
        $(".part3-statu-img").addClass("box-shake");
        setTimeout(function(){
            $(".part3-statu-img").removeClass("box-shake");
        },650); 
        flagArr[tempIndex]=false;
    }
}