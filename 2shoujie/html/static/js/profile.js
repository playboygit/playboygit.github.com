/**
 * Created by zhoubing on 2015/2/5.
 */
var imgX = 0, imgY = 0, imgW = 0,imgH = 0;
$(document).ready(function(){
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'upload-person-img',
        container: 'wrap-img',
        drop_element: 'wrap-img',
        max_file_size: '5mb',
        filters : {
            max_file_size : '5mb',//限制图片大小
            mime_types: [
                {title : "image type", extensions : "jpg,jpeg,gif,png"}
            ]
        },
        flash_swf_url: 'static/js/plupload/Moxie.swf',
        dragdrop: false,
        chunk_size: '5mb',
        domain: "http://ershou.u.qiniudn.com/",
        //uptoken: 'hyA3Svs21nO-wJsXWMdpZMkRz9NrzYZOKRx76Pwm:dgJ7VSv32wS8DUVhFP-ltSKHoss=:eyJzY29wZSI6ImVyc2hvdSIsImRlYWRsaW5lIjoxNDIzNTQ4NTk1fQ==',
        // downtoken_url: '/downtoken',
        uptoken: decodeURIComponent(getCookie("token")),
        unique_names: false,
        save_key: false,
        auto_start: true,
        init: {
            'FilesAdded': function (up, files) {
                var file = files[0];
                $(".img-attr").addClass("hide");

                $(".loading").removeClass("hide");
            },
            'UploadProgress': function (up, file) {
                //$("#" + file.id).css("width", file.percent + "%");
            },
            'FileUploaded': function (up, file, info) {
                var image = new Image();
                image.onload=function(){
                    $(".loading").addClass("hide");
                    $(".moxie-shim").addClass("hide");
                }
                image.src="http://ershou.u.qiniudn.com/"+$.parseJSON(info).key;
                $("#person-img").attr("src","http://ershou.u.qiniudn.com/"+$.parseJSON(info).key);
                $.ajax({
                    url:"http://ershou.u.qiniudn.com/"+$.parseJSON(info).key+"?imageInfo",
                    type:"get",
                    success:function(data){
                        var width = data.width,height=data.height;
                        if(width>=height){
                            var h = (508*height/width).toFixed(0);
                            var mt = (418-h)/2;
                            $("#person-img").addClass("w100").css("marginTop",mt+"px");
                        }else{
                            $("#person-img").addClass("h100");
                        }
                        $("#person-img").removeClass("hide");
                        var jcrop_api;
                        $('#person-img').Jcrop({
                            onChange:showCoords,
                            aspectRatio:1,
                            minSize:[150,150]

                        },function(){
                            jcrop_api = this;
                            var arr = jcrop_api.getWidgetSize();
                            var x = (arr[0]-150)>0?(arr[0]-150)/2>150?(arr[0]-150)/2+150:(arr[0]-150)/2:0;
                            var y = (arr[1]-150)>0?(arr[1]-150)/2:0;
                            jcrop_api.setSelect([x,y,150,150]);
                        });
                        function showCoords(c)
                        {
                            imgX = c.x;
                            imgY = c.y;
                            imgW = c.w;
                            imgH = c.h;
                        };
                    }
                });
            },
            'Error': function (up, err, errTip) {
                if (err.code == -600) {
                    alert("图片大小不能超过5M哦");
                } else if (err.code == -601) {
                    alert("图片格式不对哦");
                } else if (err.code == -200) {
                    alert("上传出错");
                } else {
                    alert(err.code + ": " + err.message);
                }
                up.removeFile(err.file.id);
                $(".loading").addClass("hide");
                $(".img-attr").removeClass("hide");
                $(".moxie-shim").css({left: $("#upload-person-img").position().left, top: $("#upload-person-img").position().top});//调整按钮的位置
            },
            'Key': function (up, file) {
                var key = "Web_" + new Date().getTime() + "_" + file.id;
                return key
            }
        }
    });
    setTimeout(function(){
        $(".moxie-shim").children("input").attr("capture","camera").attr("accept","image/*").removeAttr("multiple");
    },500);
}).on("click","#user_photo",function(){
    $("#head-img-box").removeClass("hide");
    $(".wrap-img").append('<img id="person-img" class="person-img hide" src="" />');
}).on("click","#close-head-img,#cancel-img-box",function(){
    $("#head-img-box").addClass("hide");
    $(".loading").addClass("hide");
    $(".img-attr").removeClass("hide");
    $("#person-img").remove();
    $(".jcrop-holder").remove();
}).on("click","#upload-ok",function(){
    var w = $(".jcrop-tracker").width(),h = $(".jcrop-tracker").height();
    var imgSrc = $("#person-img").attr("src");
    var imgUrl = imgSrc+"?imageMogr2/thumbnail/508x418/crop/!"+imgW+"x"+imgH+"a"+imgX+"a"+imgY;
    $("#origin_ph").attr("src",imgUrl);
    $("#head-img-box").addClass("hide");
    $(".loading").addClass("hide");
    $(".img-attr").removeClass("hide");
    $("#person-img").remove();
    $(".jcrop-holder").remove();
    /*$.ajax({   //设置头像
        url:"",
        data:imgUrl,
        type:"post",
        success:function(data){
            if(data.code==0){
                $(".pop-tip").removeClass("hide");
                setTimeout(function(){
                    $(".pop-tip").addClass("hide");
                },2000);
            }
        }
    });*/
    $.post(
        '/user/avatar',
        {user_avatar: imgUrl},
        function(res) {
            res = $.parseJSON(res);
            if (res.code == 0) {
                $(".pop-tip").removeClass("hide");
                setTimeout(function(){
                    $(".pop-tip").addClass("hide");
                },2000);
            } else {
                alert(res.msg);
            }
        }
    );
    $(".avatar").attr('src', imgUrl);
}).on("click",".want-cont",function(){
    $(this).children("span").css("display","inline-block");
}).on("mouseenter",".want-cont",function(){
    if($(this).children("span").css("display")=="none"){
        $(this).addClass("want-cont-hover");
    }
}).on("mouseleave",".want-cont",function(){
    $(this).removeClass("want-cont-hover");
});
//获取cookie
function getCookie(name){
    //cookie中的数据都是以分号加空格区分开
    var arr = document.cookie.split("; ");
    for(var i=0; i<arr.length; i++){
        if(arr[i].split("=")[0] == name){
            return arr[i].split("=")[1];
        }
    }
    //未找到对应的cookie则返回空字符串
    return '';
}