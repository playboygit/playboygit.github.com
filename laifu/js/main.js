var e_flag = true;
var enrmArr = ["单人病房","单人病房","360°展厅","单人病房","单人病房"];
var e_index = 0;
var e_aflag = false;
var t_flag = true;
var teamArr = {
    title:["圣弗朗西斯科1","圣弗朗西斯科2","圣弗朗西斯科3","圣弗朗西斯科4","圣弗朗西斯科5"],
    cont:["1美国匹兹堡大学医疗中心美容教授，国际脂肪干细胞治疗与科学联合会创立者之一，董事会成员",
        "2美国匹兹堡大学医疗中心美容教授，国际脂肪干细胞治疗与科学联合会创立者之一，董事会成员",
        "3美国匹兹堡大学医疗中心美容教授，国际脂肪干细胞治疗与科学联合会创立者之一，董事会成员",
        "4美国匹兹堡大学医疗中心美容教授，国际脂肪干细胞治疗与科学联合会创立者之一，董事会成员",
        "5美国匹兹堡大学医疗中心美容教授，国际脂肪干细胞治疗与科学联合会创立者之一，董事会成员"]
}
$(document).ready(function(){

}).on("click","#team-next",function(){
    if(!t_flag) return false;
    var curIndex = parseInt($("#cur-num").html(),10);
    var counts = parseInt($("#team-nums").html(),10);
    curIndex++;
    if(curIndex>counts){
        curIndex=1;
    }
	var iImg = $('<img class="team-temp" src="images/team/t'+curIndex+'.png">');
    $(".l-team").append(iImg);
    $("#cur-num").html(curIndex);
    $("#team-title").html(teamArr.title[curIndex-1]);
    $("#team-cont").html(teamArr.cont[curIndex-1]);
    curIndex++;
    if(curIndex>counts){
        curIndex=1;
    }
    $("#team-sal-img").attr("src","images/team/t"+curIndex+".png");
    imgBig($(".team-temp"));
}).on("click","#team-prev",function(){
    if(!t_flag) return false;
    var curIndex = parseInt($("#cur-num").html(),10);
    var counts = parseInt($("#team-nums").html(),10);
    curIndex--;
    if(curIndex<1){
        curIndex=counts;
    }
    var iImg = $('<img class="team-temp" src="images/team/t'+curIndex+'.png">');
    $(".l-team").append(iImg);
    $("#cur-num").html(curIndex);
    $("#team-title").html(teamArr.title[curIndex-1]);
    $("#team-cont").html(teamArr.cont[curIndex-1]);
    curIndex--;
    if(curIndex<1){
        curIndex=counts;
    }
    $("#team-sal-img").attr("src","images/team/t"+curIndex+".png");
    imgBig($(".team-temp"));
}).on("click","#enrm-next",function(e){
    e.stopPropagation();
    if(!e_flag) return false;
    e_flag = false;
    e_index++;
    if(e_index>4){
        e_index=0;
    }
    var temp1 = $('<img class="enrm-temp1 enrm-item1" src="'+$("#roll1").attr("src")+'">');
    var temp2 = $('<img class="enrm-temp1 enrm-item2" src="'+$("#roll2").attr("src")+'">');
    var temp3 = $('<img class="enrm-temp2" src="'+$("#roll3").attr("src")+'">');
    var temp4 = $('<img class="enrm-temp1 enrm-item3" src="'+$("#roll4").attr("src")+'">');
    $(".enrm").append(temp1).append(temp2).append(temp3).append(temp4);
    temp1.animate({left: $("#enrm-item2").position().left+"px", top: $("#enrm-item2").position().top+"px"}, 1500 );
    temp2.animate({width:"380px",height:"380px",marginLeft:"-190px",marginTop:"-190px",left: $("#enrm-item3").position().left+"px", top: $("#enrm-item3").position().top+"px"}, 1500 );
    temp3.animate({width:"200px",height:"200px",marginLeft:"0px",marginTop:"0px",left: $("#enrm-item4").position().left+"px", top: $("#enrm-item4").position().top+"px"}, 1500 );
    temp4.animate({left: $("#enrm-item5").position().left+"px", top: $("#enrm-item5").position().top+"px"}, 1500 );
    setTimeout(function(){
        temp1.remove();
        temp2.remove();
        temp3.remove();
        temp4.remove();
        e_flag = true;
    },1500);
    for(var i=1; i<6; i++){
        if(i==1){
            $("#roll1").attr("url",$("#roll5").attr("src"));
            $("#roll1").prev(".enrm-txt").attr("pk",$("#roll5").prev(".enrm-txt").html());
        }else{           
            $("#roll"+i).attr("url",$("#roll"+(i-1)).attr("src"));
            $("#roll"+i).prev(".enrm-txt").attr("pk",$("#roll"+(i-1)).prev(".enrm-txt").html());
        }      
    }
    for(var o=1; o<6; o++){
        $("#roll"+i).attr("src",$("#roll"+i).attr("url"));
        $("#roll"+o).prev(".enrm-txt").html($("#roll"+o).prev(".enrm-txt").attr("pk"));
    }
    $("#enrm-pro").css("left",(119.5*e_index)+"px");
}).on("click","#enrm-prev",function(e){
    e.stopPropagation();
    if(!e_flag) return false;
    e_flag = false;
    e_index--;
    if(e_index<0){
        e_index=4;
    }
    var temp5 = $('<img class="enrm-temp1 enrm-item4" src="'+$("#roll5").attr("src")+'">');
    var temp4 = $('<img class="enrm-temp1 enrm-item3" src="'+$("#roll4").attr("src")+'">');
    var temp3 = $('<img class="enrm-temp2" src="'+$("#roll3").attr("src")+'">');
    var temp2 = $('<img class="enrm-temp1 enrm-item2" src="'+$("#roll2").attr("src")+'">');
    $(".enrm").append(temp5).append(temp4).append(temp3).append(temp2);
    temp5.animate({left: $("#enrm-item4").position().left+"px", top: $("#enrm-item4").position().top+"px"}, 1500 );
    temp4.animate({width:"380px",height:"380px",marginLeft:"-190px",marginTop:"-190px",left: $("#enrm-item3").position().left+"px", top: $("#enrm-item3").position().top+"px"}, 1500 );
    temp3.animate({width:"200px",height:"200px",marginLeft:"0px",marginTop:"0px",left: $("#enrm-item2").position().left+"px", top: $("#enrm-item2").position().top+"px"}, 1500 );
    temp2.animate({left: $("#enrm-item1").position().left+"px", top: $("#enrm-item1").position().top+"px"}, 1500 );
    setTimeout(function(){
        temp5.remove();
        temp4.remove();
        temp3.remove();
        temp2.remove();
        e_flag = true;
    },1500);
    for(var i=1; i<6; i++){
        if(i==5){
            $("#roll5").attr("url",$("#roll1").attr("src"));
            $("#roll5").prev(".enrm-txt").attr("pk",$("#roll1").prev(".enrm-txt").html());
        }else{           
            $("#roll"+i).attr("url",$("#roll"+(i+1)).attr("src"));
            $("#roll"+i).prev(".enrm-txt").attr("pk",$("#roll"+(i+1)).prev(".enrm-txt").html());
        }      
    }
    for(var o=1; o<6; o++){
        $("#roll"+i).attr("src",$("#roll"+i).attr("url"));
        $("#roll"+o).prev(".enrm-txt").html($("#roll"+o).prev(".enrm-txt").attr("pk"));
    }
    $("#enrm-pro").css("left",(119.5*e_index)+"px");
}).on("mousedown","#enrm-pro",function(ev){
    var $this = $(this);
    e_aflag = true;
    var oEvent = ev;
    var disX = oEvent.clientX-$this.position().left;
    var sl = $this.position().left;
    $("#enrm-probg").on("mousemove",function(ev){
        if(e_aflag){
            var oEvent = ev;
            var left = oEvent.clientX-disX;
            var cWidth = $("#enrm-probg").width();
            if(left<0){left=0;}
            if(left>cWidth-$this.width()){left=cWidth-$this.width();}
            $this.css({left:left});
        }    
    })
    if($this[0].setCapture){
        $this[0].setCapture();
    }
    $("#enrm-probg").on("mouseup",function(){
        e_aflag = false;
        var el = $this.position().left;
        if(el>sl){
            $("#enrm-next").click();
        }else if(el<sl){
            $("#enrm-prev").click();
        }
        $("#enrm-pro").css("left",(119.5*e_index)+"px");
        if($this[0].releaseCapture){
            $this[0].releaseCapture();
        }
        $("#enrm-probg").unbind("mousemove");
        $("#enrm-probg").unbind("mouseup");
    })
    return false;
}).on("click",".pop-close",function(){
    $(".pop-window").hide();
}).on("click",".enrm-item,.enrm-main",function(){
    $(".pop-window").show();
});




function imgBig($img){
    t_flag = false;
    var _this = $img;
    var index = 0;
    var timer = setInterval(function(){
        _this.css({width:(_this.width()+20)+"px",height:(_this.height()+20)+"px",left:(_this.position().left+10)+"px",top:(_this.position().top-8)+"px"});
        index++;
        if(index==14){
            clearInterval(timer);
            _this.css({width:"560px",height:"430px",left:"195px",top:"-110px"});
            $("#team-img").attr("src",_this.attr("src"));
            _this.remove();
            t_flag = true;
        }
    },50);
}