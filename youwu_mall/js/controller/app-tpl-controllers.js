/**
 * Created by zhoubing on 2014/12/24.
 */
var templateCtrl = angular.module("templateCtrl",[]);
/* $scope.imgsrc="http://youwu.b0.upaiyun.com/Wap_1419419772951_0";8*/
templateCtrl.controller("tplCtrl",function($scope,$window){
    $scope.goBack=function(){      //返回前一页
        $window.location.href="../page/publish.html?g="+goods_id;
    }
    $scope.goShare=function(){
        //localStorage["share_url"]="";//分享链接
        $window.location.href="../page/share.html";
    }
})
/*templateCtrl.controller("t2Ctrl",function($scope,$window){
    /*setTimeout(function(){
        if($window.location.href.indexOf("?")==-1){
            $window.location.href=$window.location.href+"?g="+goods_id+"&p=1";
        }
    },200);
    alert(goods_id)
    $(".tpl-nav,.tpl-logo-box").removeClass("hide");
})*/
templateCtrl.controller("t1Ctrl",function($scope,$http,$location,$document,$window){
    setTimeout(function(){
        if($window.location.href.indexOf("?")==-1){
            $window.location.href=$window.location.href+"?g="+goods_id+"&p=1";
        }
    },200)
    var imgSrcPrev="http://youwu.b0.upaiyun.com/";
    var imgSrcNext="!fix500";
    $http.get("/goods?goods_id="+goods_id).success(function(data){
        if(data.error==0){
            var imgList = data.data.goods_imgs;
            if(data.data.shop_name!=""){
                $(".item9").removeClass("hide");
            }
            $scope.goods_name=data.data.goods_name;
            $scope.goods_detail=data.data.goods_detail;
            $scope.goods_contact=data.data.goods_contact;
            if(data.data.goods_price=="价格再议"){
                $scope.goods_price="价格再议，请直接联系";
            }else{
                $scope.goods_price="￥"+data.data.goods_price;
            }

            var length = 0;
            switch(imgList.length){
                case 1:
                    length=3;
                    $scope["imgSrc4"]=imgSrcPrev+imgList[0]+imgSrcNext;
                    if(isRotate(imgList[0])==1) {
                        $("#imgSrc4").addClass("rotate-img");
                    }
                    for(var i=1;i<9;i++){
                        if(i<4){
                            if(isRotate(imgList[0])==1){
                                $("#imgSrc"+i).addClass("rotate-img");
                            }
                            $scope["imgSrc"+i]=imgSrcPrev+imgList[0]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 2:
                    length=4;
                    $scope["imgSrc1"]=imgSrcPrev+imgList[0]+imgSrcNext;
                    $scope["imgSrc4"]=imgSrcPrev+imgList[0]+imgSrcNext;
                    $scope["imgSrc5"]=imgSrcPrev+imgList[1]+imgSrcNext;
                    if(isRotate(imgList[0])==1){
                       $("#imgSrc1,#imgSrc4").addClass("rotate-img");
                    }
                    if(isRotate(imgList[1])==1){
                        $("#imgSrc5").addClass("rotate-img");
                    }
                    for(var i=2;i<9;i++){
                        if(i<5){
                            if(i<4){
                                if(isRotate(imgList[1])==1){
                                    $("#imgSrc"+i).addClass("rotate-img");
                                }
                                $scope["imgSrc"+i]=imgSrcPrev+imgList[1]+imgSrcNext;

                            }
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 3:
                    length=5;
                    for(var i=1;i<9;i++){
                        if(i<6){
                            if(i<4){
                                if(isRotate(imgList[i-1])==1){
                                    $("#imgSrc"+i).addClass("rotate-img");
                                    $("#imgSrc"+(i+3)).addClass("rotate-img");
                                }
                                $scope["imgSrc"+i]=imgSrcPrev+imgList[i-1]+imgSrcNext;
                                $scope["imgSrc"+(i+3)]=imgSrcPrev+imgList[i-1]+imgSrcNext;
                            }
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 4:
                    length=3;
                    for(var i=0;i<9;i++){
                        if(i<4){
                            if(isRotate(imgList[i])==1){
                                $("#imgSrc"+(i+1)).addClass("rotate-img");
                            }
                            $scope["imgSrc"+(i+1)]=imgSrcPrev+imgList[i]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 5:
                    length=4;
                    for(var i=0;i<9;i++){
                        if(i<5){
                            if(isRotate(imgList[i])==1){
                                $("#imgSrc"+(i+1)).addClass("rotate-img");
                            }
                            $scope["imgSrc"+(i+1)]=imgSrcPrev+imgList[i]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 6:
                    length=5;
                    for(var i=0;i<9;i++){
                        if(i<6){
                            if(isRotate(imgList[i])==1){
                                $("#imgSrc"+(i+1)).addClass("rotate-img");
                            }
                            $scope["imgSrc"+(i+1)]=imgSrcPrev+imgList[i]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 7:
                    length=6;
                    for(var i=0;i<9;i++){
                        if(i<7){
                            if(isRotate(imgList[i])==1){
                                $("#imgSrc"+(i+1)).addClass("rotate-img");
                            }
                            $scope["imgSrc"+(i+1)]=imgSrcPrev+imgList[i]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 8:
                    length=7;
                    for(var i=0;i<9;i++){
                        if(i<8){
                            if(isRotate(imgList[i])==1){
                                $("#imgSrc"+(i+1)).addClass("rotate-img");
                            }
                            $scope["imgSrc"+(i+1)]=imgSrcPrev+imgList[i]+imgSrcNext;
                        }else{
                            $(".item"+i).addClass("hide");
                        }
                    }
                    break;
                case 9:
                    length=8;
                    for(var i=1;i<10;i++){
                        if(isRotate(imgList[i-1])==1){
                            $("#imgSrc"+i).addClass("rotate-img");
                        }
                        $scope["imgSrc"+i]=imgSrcPrev+imgList[i-1]+imgSrcNext;
                    }
                    break;
            }
            //$document.ready(function (){
                draw3Img($scope.imgSrc3);
                init();
                var clientHeight = $(window).height();
                var index = 1;
                var $items = $("#wrap").find(".item");
                function itemShow($obj){
                    if($obj[0].getBoundingClientRect().top<clientHeight){
                        $obj.removeClass("hidden").addClass("box-slide-up");
                        index++;
                    }
                };
                itemShow($(".item2"));
                $(window).on("scroll",function(){
                    if(index <=length){
                        itemShow($items.eq(index),$items);
                        if(index == length){
                            index++;
                        }
                    }
                });
           // })
        }else{
            alert(data.msg);
        }
    })
})
$(document).ready(function(){
    $(window).on("scroll",function(){
        $(".tpl-nav").css("bottom","0");
    })
});

function init() {
    $(".item1 .img-one").addClass("box-slide-right");
    $(".item1 .img-two").addClass("box-slide-down");
    $(".item1 .img-three").addClass("box-slide-left");
}

function draw3Img(url){
    var cas3b =  document.getElementById("mock-3b");
    var ctx = cas3b.getContext("2d");
    ctx.strokeStyle="#fff";
    ctx.moveTo(300,0);
    ctx.lineTo(300,150);
    ctx.lineTo(0,75);
    ctx.closePath();
    ctx.clip();
    ctx.save();
    var img = new Image();
    img.onload=function(){
        if(img.complete){
            ctx.beginPath();
            ctx.strokeStyle="#222";
            ctx.lineWidth=8;
            ctx.moveTo(300,150);
            ctx.lineTo(0,75);
            ctx.drawImage(img,0,0,300,150);
            ctx.stroke();
        }
    }
    img.src=url;
}