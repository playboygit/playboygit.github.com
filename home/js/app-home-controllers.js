/**
 * Created by zhoubing on 2014/12/14.
 */
var homeCtrl = angular.module("homeCtrl",[]);
homeCtrl.controller("loginCtrl",function($scope, $http, $window){
    $scope.weixin=false;
    $scope.weiboAndQQ=false;
    if(getCookie("application")=="weixin"){
        $scope.weixin = true;
    }else{
        $scope.weiboAndQQ = true;
    }
    $scope.login=function(){
        var flag = beforeSubmit($("#login-form"));
        if(flag) {
            var pass = CryptoJS.SHA1(md5($scope.userInfo.password + "benmiaolaizimiaoxing")).toString();
            var data = {"username": $scope.userInfo.username, "password": pass};
            $http.post("/account/login", data).success(function (data) {
                if (data.error == 0) {
                    isLogin = true;
                    $window.location.reload(true);
                } else {
                    alert(data.msg);
                }
            });
        }
    }
    $scope.forgotPass=function(){
        $window.location.href="/home/page/resetpass.html";
    }
    $scope.registerNow=function(){
        $window.location.href="/home/page/register.html";
    }
    /*第三方登录*/
    $scope.loginByQQ=function(){
        setCookie("callback_uwu",$window.location.href);
        $window.location.href="http://uwu.im/login_api?type=qq";
    }
    $scope.loginByWeixin=function(){
        setCookie("callback_uwu",$window.location.href);
        $window.location.href="http://uwu.im/login_api?type=weixin";
    }
    $scope.loginByWeibo=function(){
        setCookie("callback_uwu",$window.location.href);
        $window.location.href="http://uwu.im/login_api?type=weibo";
    }
});
homeCtrl.controller("indexCtrl",function($scope, $window){
    $scope.goPublish=function(){
        $window.location.href="/home/page/publish.html";
    }
});

























