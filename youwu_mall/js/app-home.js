/**
 * Created by zhoubing on 2014/12/6.
 */
var routerApp = angular.module("homeApp", ["ui.router","homeCtrl"]);
routerApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/page/home");
    $stateProvider.state("home",{
        url:"/page/home",
        templateUrl:"page/home.html",
        controller: function($scope) {
            navSwitch(0);
        }
    }).state("data",{
        url:"/page/data",
        templateUrl:"page/data.html",
        controller: function($scope) {
            navSwitch(1);
            if(!isLogin){
                $(".page-login").removeClass("hide");
            }else{
                $(".data-content").removeClass("hide");
            }
        }
    }).state("me",{
        url:"/page/me",
        templateUrl:"page/me.html",
        controller: function($scope) {
            navSwitch(2);
            if(!isLogin){
                $(".page-login").removeClass("hide");
            }else{
                $(".me-content").removeClass("hide");
            }
        }
    })
});

function navSwitch(index){
    $(".nav-line li").removeClass("active").eq(index).addClass("active");
    $(".nav-lst li").removeClass("active").eq(index).addClass("active");
    if(index==2){
        $("#login-out").removeClass("hide");
    }else{
        if(!$("#login-out").hasClass("hide")){
            $("#login-out").addClass("hide");
        }
    }
}