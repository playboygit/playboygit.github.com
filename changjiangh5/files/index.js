/*-------------------选择图片组件内容开始-------------------*/
var my_canvas1=document.getElementById('canvas1'),
	canvas_hide=document.getElementById('canvashide'),
	ctx=canvas_hide.getContext('2d'),
	imgStage_1 = new createjs.Stage(my_canvas1),
	my_file=document.getElementById('my_file'),
	WH=$('.work_place').height(),
	WW=$('.work_place').width(),
	scal=1,rate=1,x,y,rx,ry,
	canFinishedPic=false,
	canFinishedName=false,
	canFinishedEMBA=false,
	facility="",ua = navigator.userAgent.toLowerCase(),
	waiHeight=parseInt($("body").css("height"));
if (/iphone|ipad|ipod/.test(ua)) {
	facility="iphone";
} else if (/android/.test(ua)) {
	facility="android";
	//键盘出现时整体移动时需要解开注释
	$("body>div").css("height",waiHeight+"px");
}
function moveBody(sel){//键盘出现时整体移动函数
	if(facility=="android"){
		$(sel).on("focus",function (){
			if(!$("body>div").hasClass("alreadyMove")){
				$("body>div").addClass("alreadyMove");
			}
		});
		$(sel).on("blur",function (){
			$("body>div").removeClass("alreadyMove");
		});
	}
}
function get_pic () {
	// 清除 然后上传的图片画出来
	$('img').attr('src','').hide();
	imgStage_1.removeAllChildren();
	imgStage_1.clear();
	var this_file=my_file.files[0];
	if(this_file){
		canFinishedPic=true;
		$(".pic_btn").addClass("hid");
		$("#bgHuman").addClass("hid");
		$("#selectPicBox").addClass("hid");
		var file_name=this_file.name;
		var extStart=file_name.lastIndexOf('.');
		var ext=file_name.substring(extStart,file_name.length).toUpperCase();
		if(ext!='.BMP'&&ext!='.PNG'&&ext!='.GIF'&&ext!='.JPG'&&ext!='.JPEG'){
			alert('请选择图片文件');
		}else{
			EXIF.getData(this_file, function() {
				var orientation = EXIF.getTag(this, "Orientation");
				if(orientation == 6) {
					rate = 6;
				} else if(orientation == 8) {
					rate = 8;
				}
				var mpImg = new MegaPixImage(this_file);
				mpImg.render(canvas_hide, {maxWidth:WW, maxHeight:WH, quality:0.5, orientation:rate}, function(){
					var url = canvas_hide.toDataURL('jpg');
					var img = new Image();
					img.src = url;
					ctx.clearRect(0,0,WW,WH);
					img.onload = function(){
						if(!(img.width>=WW&&img.height>=WH)){
							var saclW=WW/img.width;
							var saclH=WH/img.height;
							scal=saclW<=saclH?saclW:saclH;
							if(!(img.width*scal>=WW&&img.height*scal>=WH)){
								scal=saclW+saclH-scal;
							}
						}
						my_canvas1.width=WW;
						my_canvas1.height=WH;

						beginx = -img.width*2;
						beginy = -img.height*2;

						x = WW/2;
						y =	WH/2;

						rx = img.width/2;
						ry = img.height/2;
						var bitmap = new createjs.Bitmap(url);

						bitmap.set({
							x:beginx,
							y:beginy,
							regX:rx,
							regY:ry,
							scaleX:scal,
							scaleY:scal
						});
						imgStage_1.addChild(bitmap);
						imgStage_1.update();
						setTimeout(function() {
							bitmap.x = x;
							bitmap.y = y;
							imgStage_1.update();
						},500);

						touch.on('#cover', 'touchstart', function(ev){
							ev.preventDefault();
						});

						var initialScale = scal;
						var currentScale;
						var angle = 0;
						var dx=x,dy=y;

						touch.on('#cover', 'drag', function(ev){
							dx = dx || 0;
							dy = dy || 0;
							var offx = dx + ev.x;
							var offy = dy + ev.y;
							bitmap.x = offx;
							bitmap.y = offy;
							imgStage_1.update();
						});

						touch.on('#cover', 'dragend', function(ev){
							dx += ev.x;
							dy += ev.y;
						});

						touch.on('#cover', 'pinch', function(ev){
							currentScale = ev.scale - 1;
							currentScale = initialScale + currentScale;
							currentScale = currentScale < 0.1 ? 0.1 : currentScale;
							bitmap.scaleX = currentScale;
							bitmap.scaleY = currentScale;
							imgStage_1.update();
						});

						touch.on('#cover', 'pinchend', function(ev){
							initialScale = currentScale;
						});

						touch.on('#cover', 'rotate', function(ev){
							var totalAngle = angle + ev.rotation;
							if(ev.fingerStatus === 'end'){
								angle = angle + ev.rotation;
							}
							bitmap.rotation = totalAngle;
							imgStage_1.update();
						});
					}
				})
			})
		}
		$("#select_pic .mask").removeClass("hid");
		$("#select_pic .mask").on("touchstart",function (){
			$(this).addClass("hid");
		})
	}
}
/*-------------------选择图片组件内容结束-------------------*/
function MakeHuman(){
	this.uname="";
	this.EMBA="";
	this.src="";
	this.cas=document.createElement("canvas");
	this.cas.width=WW;
	this.cas.height=WH;
	this.ctx=this.cas.getContext("2d");
	this.unameWidth=parseInt($("#name_show").css("min-width"));
	this.unameFirstFontSize=parseInt($("#name_show").css("font-size"));
}
MakeHuman.prototype.draw=function (img1,img2){
	this.ctx.drawImage(img1,0,0,this.cas.width,this.cas.height);
	this.ctx.drawImage(img2,0,0,this.cas.width,this.cas.height);
	var fontSize1=parseInt($("#name_show").css("font-size"));
	var fontSize2=parseInt($("#EMBA_show").css("font-size"));
	var x1=parseInt($("#name_show").css("left"));
	var x2=parseInt($("#EMBA_show").css("left"));
	var w1=parseInt($("#name_show").css("min-width"));
	var w2=parseInt($("#EMBA_show").css("min-width"));
	var y1=parseInt($("#name_show").css("top"))+fontSize1;
	var y2=parseInt($("#EMBA_show").css("top"))+fontSize2-3;
	this.ctx.fillStyle="#fff";
	this.ctx.font="normal normal bold "+fontSize1+"px SimHei";
	x1+=(w1-this.ctx.measureText(this.uname).width)/2;
	x2+=(w2-this.ctx.measureText(this.EMBA).width)/2;
	this.ctx.fillText(this.uname,x1,y1);
	this.ctx.font="normal normal bold "+fontSize2+"px SimHei";
	this.ctx.fillText(this.EMBA,x2,y2);
	this.src=this.cas.toDataURL("image/png",1);
};
MakeHuman.prototype.makeName=function (){//待定
	var _me=this,val="";
	//键盘出现时整体移动时需要解开注释
	//moveBody("#uname");
	$("#uname")[0].addEventListener("input",function (){
		var me=this,fs,
			fontArr=me.value.match(/[\u4e00-\u9fa5]/ig),
			len=me.value.length;
		if(fontArr!=null){
			len=me.value.length+fontArr.length;
			if(len>12){
				me.value=val;
				len=12;
			}
		}
		var realHan=me.value.match(/[\u4e00-\u9fa5]/ig);
		realHan!=null&&(len=me.value.length+realHan.length);
		if(len==0){
			fs=_me.unameFirstFontSize;
		}else{
			fs=(_me.unameWidth/len)*2>>0;
			fs=fs<=_me.unameFirstFontSize?fs:_me.unameFirstFontSize;
		}
		_me.uname=me.value;
		$("#name_show").css("font-size",fs+"px");
		$("#name_show").text(me.value);
		if(!(this.value=="")){
			canFinishedName=true;
		}else{
			canFinishedName=false;
		}
		val=me.value;
	},false);
};
MakeHuman.prototype.makeEMBA=function (){
	var _me=this,val="";
	//键盘出现时整体移动时需要解开注释
	//moveBody("#uEMBA");
	$("#uEMBA")[0].addEventListener("input",function (){
		var me=this;
		var bool=me.value.search(/[a-zA-Z\u4e00-\u9fa5`~!@#$%^&*\(\)_\-+=\{\}\[\]:;"'?\/<>,. ]/);
		if(bool==-1){
			if(me.value.search(/\d{3,}/)!=-1){
				_me.EMBA=me.value.slice(0,2);
				me.value=_me.EMBA;
			}else{
				_me.EMBA=me.value;
			}
		}else{
			me.value=val;
		}
		$("#EMBA_show").text(me.value);
		if(!(this.value=="")){
			canFinishedEMBA=true;
		}else{
			canFinishedEMBA=false;
		}
		val=me.value;
	},false);
};
MakeHuman.prototype.reset=function (){
	$(".reset_btn").on("touchstart",function (){
		if(canFinishedPic||canFinishedName||canFinishedEMBA){
			canFinishedPic=false;
			canFinishedName=false;
			canFinishedEMBA=false;
			$("#selectPicBox").removeClass("hid");
			$("#uname").attr("readonly",false);
			$("#uEMBA").attr("readonly",false);
			$("#shade").addClass("hid");
			$("#bgHuman").removeClass("hid");
			$(".pic_btn").removeClass("hid");
			$("#uname")[0].value="";
			$("#uEMBA")[0].value="";
			$("#name_show").text("");
			$("#EMBA_show").text("");
			$("#my_file")[0].value="";
		}
	})
};
MakeHuman.prototype.init=function (){
	this.makeName();
	this.makeEMBA();
	this.reset();
};
function MackFinal(){
    this.data="";
	this.canShare=false;
	this.finalSrc="";
	this.ajaxData="";
}
MackFinal.prototype.makeFinalSrc=function (){
	var me=this,
		name=$("#uname")[0].value;
	$.ajax({
		type:"POST",
		url:"http://www.hyhmk.com/cjsxytime/index.php?control=Api&action=upload",
		data:{imageStr:me.data},
		dataType:"json",
		success:function (data){
			$("#ma").attr("src","img/ma.jpg");
			me.canShare=true;
			me.finalSrc=data.data.src;
			var shareNum=me.finalSrc.search(/.jpg/),
				shareImg=me.finalSrc.slice(0,shareNum)+"_cut.jpg";
			var img=$("#final_img")[0];
			img.src=me.finalSrc;
			img.onload=function (){
				$("#ma").css("display","block");
				$("#wait_box").addClass("hid");
				$(this).css("display","block");
			};
			var src,srcI=location.href.lastIndexOf("index");
			if(srcI>0){
				src=location.href.slice(0,srcI);
			}else{
				src=location.href;
			}
			src=src+"share.html?k=";
			function wshare(){
				if(me.canShare){
					//通过config接口注入权限验证配置
					wx.config({
						debug:false,
						appId: me.ajaxData.appId,
						timestamp: me.ajaxData.timestamp,
						nonceStr: me.ajaxData.nonceStr,
						signature: me.ajaxData.signature,
						jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
					});
					// 分享后标题
					var otitle = "因为向往大海，所以汇入长江。";
					// 分享朋友圈后描述
					var desc ="我是"+name+"，不是新面孔。今日荣登长江时代，这是不一样的我。";
					// 分享个人后描述
					var descSingle ="我是"+name+"今天登上长江时代，这是你没见过的我。";
					// 分享后B用户打开的地址
					var olink =src+me.finalSrc;
					// 分享图片
					var oimgUrl =shareImg;
					wx.ready(function (){
						wx.onMenuShareTimeline({
							title: desc,
							link:  olink,
							imgUrl: oimgUrl
						});
						wx.onMenuShareAppMessage({
							title: otitle,
							desc:  descSingle,
							link: olink,
							imgUrl: oimgUrl
						});
					});
				}else{
					setTimeout(arguments.callee,500);
				}
			}
			wshare();
		}
	});
};
MackFinal.prototype.init=function (src){
	var me=this;
	this.data=src;
	me.makeFinalSrc();
};
MackFinal.prototype.share=function (){
	_utaq.push(['trackEvent','btn-fenxiang']);
	$("#share_mask").removeClass("hid");
};
$(function (){
	var human=new MakeHuman();
	var final=new MackFinal();
	function rectPosition(){
		var fontTop=parseInt($("#share").css("top")),
			imgHeight=parseInt($("#final_img").css("height")),
			h=parseInt($("#decorate_rect").css("height")),
			space=((fontTop-imgHeight-h)/3)>>0;
		$("#decorate_rect").css("top",space*2+imgHeight+"px");
		$("#picInputBox").css("bottom",innerHeight-(space+809+16)-1+"px");
		$("#ma").css("top",space+644-5+"px");
		$("#final_img").css("top",space+"px");
		$("#work_place_border").css("top",space+"px");
		$("#wait_box").css("top",space+"px");
	}
	rectPosition();
	$.ajax({
		type:"POST",
		url:"http://www.hyhmk.com/cjsxytime/index.php?control=Api&action=wxShare",
		data:{url:window.location.href},
		dataType:"json",
		success:function (data){
			final.ajaxData=data;
			wx.config({
				debug:false,
				appId: final.ajaxData.appId,
				timestamp: final.ajaxData.timestamp,
				nonceStr: final.ajaxData.nonceStr,
				signature: final.ajaxData.signature,
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
			});
			// 分享后标题
			var otitle = "因为向往大海，所以汇入长江。";
			// 分享朋友圈后描述
			var desc ="长江时代周刊封面空缺，等待不同的你登上首页。";
			// 分享个人后描述
			var descSingle ="长江时代周刊封面空缺，等待不同的你登上首页。";
			// 分享后B用户打开的地址
			var olink ="http://www.hyhmk.com/cjsxytime";
			// 分享图片
			var oimgUrl ="http://www.hyhmk.com/cjsxytime/static/wshare.png";
			wx.ready(function (){
				wx.onMenuShareTimeline({
					title: desc,
					link:  olink,
					imgUrl: oimgUrl
				});
				wx.onMenuShareAppMessage({
					title: otitle,
					desc:  descSingle,
					link: olink,
					imgUrl: oimgUrl
				});
			})
		}
	});
	//------------laoding开始-------------
	var srcArr=[
		{src:"img/adjust_pic.png"},
		{src:"img/bg.png"},
		{src:"img/bg2.png"},
		{src:"img/bghuman.png"},
		{src:"img/border.png"},
		{src:"img/btn_save.png"},
		{src:"img/cover.png"},
		{src:"img/decorate_line.png"},
		{src:"img/decorate_rect.png"},
		{src:"img/font1.png"},
		{src:"img/font2.png"},
		{src:"img/font3.png"},
		{src:"img/font4.png"},
		{src:"img/font5.png"},
		{src:"img/font6.png"},
		{src:"img/input_bg.png"},
		{src:"img/join.png"},
		{src:"img/light.png"},
		{src:"img/light2.png"},
		{src:"img/loading.png"},
		{src:"img/loading2.png"},
		{src:"img/logo.png"},
		{src:"img/ma.jpg"},
		{src:"img/name_mask.png"},
		{src:"img/next_step.png"},
		{src:"img/reset_btn.png"},
		{src:"img/select_mask.png"},
		{src:"img/select_pic.png"},
		{src:"img/share_btn.png"},
		{src:"img/share_mask.png"},
		{src:"img/touch_show_pic.png"},
		{src:"img/wait1.png"},
		{src:"img/wait2.png"},
		{src:"img/wait3.png"},
		{src:"img/wshare.png"}
	];
	var len=srcArr.length;
	var num=0;
	var numFirst=0;
	function loadFirstImage(str,foo){
		var img=new Image();
		img.src=str;
		img.onload=function (){
			foo();
		}
	}
	function loadImage(str){
		var img=new Image();
		img.src=str;
		img.onload=function (){
			num++;
			var precent=(num*100/len)>>0;
			$("#load_txt").text(precent+"%");
			if(num>=len){
				$("#loading").addClass("hid");
				inaugurate();
			}
		}
	}
	loadFirstImage("img/bg.png",function (){
		loadFirstImage("img/loading.png",function (){
			numFirst++;
			if(numFirst>=2){
				for(var i=0;i<len;i++){
					loadImage(srcArr[i].src)
				}
			}
		});
		loadFirstImage("img/loading2.png",function (){
			numFirst++;
			if(numFirst>=2){
				for(var i=0;i<len;i++){
					loadImage(srcArr[i].src)
				}
			}
		});
	});
	//------------loading结束-------------
	//------------第一屏动画开始-------------
	function inaugurate(){
		function lightMove(){
			$("#allPage").addClass("remove1");
			$("#light_top").removeClass("light_move_top");
			$("#light_bottom").removeClass("light_move_bottom");
			$("#light_left").removeClass("light_move_left");
			$("#light_right").removeClass("light_move_right");
			$("#logo").addClass("hid");
			setTimeout(function (){
				$("#selectPicBox .font").addClass("pulse");
				$("#selectPicBox .font").addClass("animated");
			},500)
		}
		$("#font_box").addClass("show");
		$("#font1").addClass("canSee1");
		$("#font2").addClass("canSee2");
		$("#font3").addClass("canSee3");
		$("#font4").addClass("canSee4");
		$("#font5").addClass("canSee5");
		$("#font6").addClass("canSee6");
		setTimeout(function (){
			$("#btn_start").removeClass("hid");
			$("#light_top").addClass("light_move_top");
			$("#light_bottom").addClass("light_move_bottom");
			$("#light_left").addClass("light_move_left");
			$("#light_right").addClass("light_move_right");
			var timer=setTimeout(function (){
				lightMove();
			},3000);
			$("#btn_start").on("touchstart",function (){
				lightMove();
				clearTimeout(timer);
				timer=null;
			});
		},1000);
	}
	//------------第一屏动画结束-------------
	//-------------选择照片开始--------------
	human.init();
	$("#select_pic .name_mask").on("touchstart",function(){
		$(this).addClass("hid");
	});
	$(".done_btn").on("touchstart",function () {
		if(!canFinishedPic){
			alert("请选择照片");
		}else if(!canFinishedName){
			$("#select_pic .name_mask").removeClass("hid");
		}else if(!canFinishedEMBA){
			$("#select_pic .name_mask").removeClass("hid");
		}else{
			$("#uname").attr("readonly",true);
			$("#uEMBA").attr("readonly",true);
			$("#shade").removeClass("hid");
			$("#allPage").addClass("remove2");
			var i=0;
			var src = my_canvas1.toDataURL('png');
			var img1=new Image();
			img1.src=src;
			var img2=new Image();
			img2.src="img/cover.png";
			img1.onload=function (){
				i++;
				if(i>=2){
					human.draw(img1,img2);
					final.init(human.src);
				}
			};
			img2.onload=function (){
				i++;
				if(i>=2){
					human.draw(img1,img2);
					final.init(human.src);
				}
			};
		}
	});
	//-------------选择照片结束--------------
	//-------------合成图片开始--------------
	$("#share").on("touchstart",final.share.bind(final));
	$("#save").on("touchstart",function (){
		location.reload();
	});
	$("#share_mask").on("touchstart",function (){
		$(this).addClass("hid");
	});
	//-------------合成图片结束--------------
});
document.addEventListener('touchmove',function(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
});