/**
 * Created by zhoubing on 2014/12/24.
 */
var tplApp = angular.module("tplApp",["ui.router","templateCtrl"]);
var goods_id = "";
var isPrew = false;
tplApp.config(function($stateProvider, $urlRouterProvider){
    $(".tpl-lst").width($(".tpl-lst li").size()*84);//初始化模板列表宽度
    var param = window.location.href.split("?");
    var params = param[param.length-1];
    if(params.indexOf("p=1")==-1){
        goods_id=params.split("=")[1];
        isPrew=false;
    }else{
        goods_id=params.split("&")[0].split("=")[1];
        isPrew=true;
    }
    if(isPrew){   //预览
        $(".tpl-nav,.tpl-logo-box").removeClass("hide");
    }
    $urlRouterProvider.otherwise("/tpl/t1");
    $stateProvider.state("t1",{
        url:"/tpl/t1",
        templateUrl:"tpl/t1.html",
        controller: function($scope) {
            switchTpl(0);
        }
    }).state("t2",{
        url:"/tpl/t2",
        templateUrl:"tpl/t1.html",
        controller: function($scope) {
            switchTpl(1);
        }
    }).state("t3",{
        url:"/tpl/t3",
        templateUrl:"tpl/t1.html",
        controller: function($scope) {
            switchTpl(2);
        }
    }).state("t4",{
        url:"/tpl/t4",
        templateUrl:"tpl/t1.html",
        controller: function($scope) {
            switchTpl(3);
        }
    }).state("t5",{
        url:"/tpl/t5",
        templateUrl:"tpl/t1.html",
        controller: function($scope) {
            switchTpl(4);
        }
    })
});

function switchTpl(index){
    $(".tpl-lst li").removeClass("active").eq(index).addClass("active");
}