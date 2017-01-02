/**
 * Created by zhoubing on 2014/12/22.
 */
var resetCtrl = angular.module("resetCtrl",[]);
resetCtrl.controller("resetController",function($scope,$http,$location,$window){
    $scope.userInfo={username:"",password:"",random_code:""};
    var telFlag = false;
    $scope.goBack=function(){       //返回前一页
        $window.history.go(-1);
    }
    $scope.testTel=function(e){
        $(e.target).one("blur",function(){
            telFlag = validateTel($(".tel-tr"));
        })
    }
    $scope.getValicode=function(e){     //获取验证码
        ///var flag = validateTel($(".tel-tr"));
        if(telFlag){
            $http.get("/tel/exist?tel="+$scope.userInfo.username).success(function(data){
                if(data.error == 0){
                    if(data.data.exist==1){
                        $(e.target).attr("disabled","true");
                        var  index = 60,timer = null;
                        $(e.target).addClass("reget-valicode").val(index+"秒后重发");
                        var timer = setInterval(function(){
                            if(index>0){
                                index--;
                                $(e.target).val(index+"秒后重发");
                            }else{
                                $(e.target).removeClass("reget-valicode").val("获取验证码");
                                clearInterval(timer);
                                $(e.target).removeAttr("disabled");
                            }
                        },1000);
                        $http.get("/account/random_code?tel="+$scope.userInfo.username).success(function(data){
                        });
                    }else{      //手机号不存在
                        var $error = $("<span class='error-tip'>该手机号尚未注册</span>");
                        $(".tel-tr").find(".wrap-td-txt").after($error);
                        $(".tel-tr").children("td").addClass("error-td");
                    }
                }
            });
        }
    }
    $scope.resetPass=function(){       //重置密码
        var flag = beforeSubmit($("#register-form"));
        if(flag){
            var pass = CryptoJS.SHA1(md5($scope.userInfo.password+"benmiaolaizimiaoxing")).toString();
            var data = {"username":$scope.userInfo.username,"random_code":$scope.userInfo.random_code,"password":pass};
            $http.post("/account/newpassword",data).success(function(data){
                if(data.error==0){
                    isLogin = true;
                    alert("密码重置成功！充值后密码为"+$scope.userInfo.password);
                    $window.history.go(-1);
                }else{
                    alert(data.msg);
                }
            });
        }
    }
    $scope.showPass=function(e){     //显示密码
        if($(e.target).next("div").children("input").attr("type") == "password"){
            $(e.target).next("div").children("input").attr("type","text");
        }else{
            $(e.target).next("div").children("input").attr("type","password");
        }
        $(e.target).toggleClass("btn-active-tip");
    }

});