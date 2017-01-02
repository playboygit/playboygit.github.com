/**
 * Created by zhoubing on 2014/12/28.
 */
var shareApp = angular.module("shareApp",["ui.router","shareCtrl"]);
var shareCtrl = angular.module("shareCtrl",[]);
shareCtrl.controller("shareCtrl",function($scope,$window){
    /*if(localStorage["firstShare"]==null){
        $(".share-tip-box").removeClass("hide");
    }*/
    $scope.firstShare=true;
    $scope.goBack=function(){      //返回前一页
        $window.history.go(-1);
    }
    $scope.finishShare=function(){
        $window.location.href="/home/index.html";
    }
})
/*
 $(".share-tip-box").on("click",function(){
 localStorage["firstShare"]="1";
 $(".share-tip-box").addClass("hide");
 })*/
