/**
 * Created by zhoubing on 2014/12/22.
 */
var publishCtrl = angular.module("publishCtrl",[]);
publishCtrl.controller("publishProductCtrl",function($scope,$http,$window){
    $scope.goods={
        name:"",
        info:"",
        price:"",
        contact:""
    };
    var imgSrcPrev="http://youwu.b0.upaiyun.com/";
    var imgSrcNext="!fix500";
    var goods_id = "";
    if($window.location.href.indexOf("g=")!=-1) {  //编辑商品信息
        goods_id = $window.location.href.split("?")[1].split("=")[1];
        $http.get("/goods?goods_id=" + goods_id).success(function (data) {
            if (data.error == 0) {
                $scope.goods.name=data.data.goods_name;
                $scope.goods.info=data.data.goods_detail;
                $scope.goods.contact=data.data.goods_contact;
                imgNameArr=data.data.goods_imgs;
                var imgsArr = new Array();
                var lis = "";
                for(var i=0; i<imgNameArr.length;i++){
                    if(isRotate(imgNameArr[i])==1){
                        lis+='<li><img class="goods-img" src="'+(imgSrcPrev+imgNameArr[i]+imgSrcNext)+'" ><a href="javascript:;" class="icon-del"></a></li>';
                    }else{
                        lis+='<li><img src="'+(imgSrcPrev+imgNameArr[i]+imgSrcNext)+'" ><a href="javascript:;" class="icon-del"></a></li>';
                    }
                }
                $("#add-product-image").closest("li").before($(lis));
                $scope.goods.price=data.data.goods_price;
                if(data.data.goods_price=="价格再议"){
                    $(".price-box .price-head").addClass("hide");
                    $(".price-box .re-info").addClass("btn-active-tip");
                }else{
                    $(".price-head").addClass("black");
                }
                setTimeout(function() {
                    $(".moxie-shim").css({width: $("#add-product-image").width(), height: $("#add-product-image").closest("li").height(), left: $("#add-product-image").closest("li").position().left + 15, top: $("#add-product-image").closest("li").position().top + 15});//调整按钮的位置
                },100);
            }
        })
    }
    $scope.$watch("goods.name",function(){
        var num = $scope.goods.name.length-30;
        if(num>0){
            $(".product-name").closest("tr").find(".error-tip").remove();
            var $error = $("<span class='error-tip'>已超出"+num+"字</span>");
            $(".product-name").closest("tr").find(".wrap-td-txt").after($error);
            $(".product-name").closest("tr").children("td").addClass("error-td");
        }else if(num<=0){
            $(".product-name").closest("tr").find(".error-tip").remove();
            $(".product-name").closest("tr").children("td").removeClass("error-td");
            $(".product-name").closest("tr").children("td").removeClass("error-td");
        }
        if($scope.goods.name.length>=0){
            setTimeout(function(){
                $(".product-name").height($(".product-name").prev("span").height());
            },10)
        }
    })
    $scope.$watch("goods.info",function(){
        if($scope.goods.info.length>=0){
            setTimeout(function(){
                $(".product-info").height($(".product-info").prev("span").height());
            },10)
        }
    })
    $scope.goBack=function(){      //返回前一页
        $window.history.go(-1);
    }
    $scope.publishGoods=function(){   //发布商品
        if(imgNameArr.length==0) {
            alert("必须上传物品图片");
            return;
        }
        var flag = beforeSubmit($("#publish-form"));
        if(flag){
            var data = {
                "goods_name":$scope.goods.name,
                "goods_detail":$scope.goods.info,
                "goods_price":$scope.goods.price,
                "goods_contact":$scope.goods.contact,
                "goods_imgs":imgNameArr,
                "goods_id":goods_id
            };
            $http.post("/goods",data).success(function(data){
                if(data.error==0){
                    $window.location.href="../template/template.html#tpl/t1?g="+data.data.goods_id+"&p="+1;
                }else{
                    alert(data.msg);
                }
            })
        }else{
            //alert("msg");
        }
    }
    $scope.rePrice=function(e){    //再议
        $(e.target).toggleClass("btn-active-tip");
        if(!$(e.target).hasClass("btn-active-tip")){
            $(e.target).next("span").next("input").attr("type","number").val("");
            $(".price-head").removeClass("hide");
        }else{
            $scope.goods.price="价格再议";
            $(e.target).next("span").next("input").attr("type","text").val("价格再议");
            $(".price-head").addClass("hide");
        }

    }
    $scope.updateY=function(e){   //修改价格前缀样式
        $(e.target).prev("span").addClass("black");
        $(e.target).one("blur",function(){
            if($(e.target).val()==0){
                $(e.target).prev("span").removeClass("black");
            }
        })
    }
    $scope.showTip=function(){
        $("#demo-info-box").addClass("show");
    }
    $scope.showInfo=function(){
        if(getCookie("firstCome")==""){
            $("#demo-info-box").addClass("show");
            setCookie("firstCome","100");
        }
    }
});
$(document).ready(function(){

}).on("click","#iknow-txt",function(){
    $("#demo-info-box").removeClass("show");
 })