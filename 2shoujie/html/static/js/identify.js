/**
 * Created by zhoubing on 2015/3/13.
 */
/**
 * Created by zhoubing on 2015/2/5.
 */
$(document).ready(function(){
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'upload',
        container: 'photo_area',
        drop_element: 'photo_area',
        max_file_size: '4mb',
        filters : {
            max_file_size : '4mb',//限制图片大小
            mime_types: [
                {title : "image type", extensions : "jpg,jpeg,gif,png"}
            ]
        },
        flash_swf_url: 'static/js/plupload/Moxie.swf',
        dragdrop: false,
        chunk_size: '4mb',
        domain: "http://ershou.u.qiniudn.com/",
        // uptoken: 'hyA3Svs21nO-wJsXWMdpZMkRz9NrzYZOKRx76Pwm:I7ApftP8cYB3k3cWqKFCItgbuZU=:eyJzY29wZSI6ImVyc2hvdSIsImRlYWRsaW5lIjoxNDI2MjI0OTE5fQ==',
        // downtoken_url: '/downtoken',
        uptoken: decodeURIComponent(zb_cookie.getCookie("token")),
        unique_names: false,
        save_key: false,
        auto_start: true,
        init: {
            'FilesAdded': function (up, files) {
                $(".upload-target .uploading").removeClass("hidden");
            },
            'UploadProgress': function (up, file) {
            },
            'FileUploaded': function (up, file, info) {
                var image = new Image();
                image.onload=function(){
                    $(".upload-target .uploading").addClass("hidden");
                    $(".moxie-shim").addClass("hidden");
                }
                image.src="http://ershou.u.qiniudn.com/"+$.parseJSON(info).key;
                $("#photo").attr("src","http://ershou.u.qiniudn.com/"+$.parseJSON(info).key);
                $(".upload-target").addClass("hidden");
                $("#unique_img").removeClass("hidden");
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
                $(".upload-target .uploading").addClass("hidden");
                $(".moxie-shim").css({left: $("#upload").position().left, top: $("#upload").position().top});//调整按钮的位置
            },
            'Key': function (up, file) {
                var key = "Web_" + new Date().getTime() + "_" + file.id;
                return key;
            }
        }
    });
    setTimeout(function(){
        $(".moxie-shim").children("input").attr("capture","camera").attr("accept","image/*").removeAttr("multiple");
    },500);
}).on("click",".delete-photo",function(){
    $("#unique_img").addClass("hidden");
    $(".upload-target").removeClass("hidden");
    $("#photo").attr("src","");
    $(".moxie-shim").css({width:$("#upload").width(),height:$("#upload").height(),left:$("#upload").closest("div").position().left,top:$("#upload").closest("div").position().top});
}).on("click","#identify-btn",function(){
    var name = $("#name").val();
    var stuno = $("#stuno").val();
    var imgSrc = $("#photo").attr("src");
    if(name==""){
        alert("姓名不能为空！")
        return false;
    }
    if(stuno==""){
        alert("学号不能为空！")
        return false;
    }
    if(imgSrc==""){
        alert("还未上传图片哦！");
        return false;
    }
    var param = {name:name,stuno:stuno,stuphoto:imgSrc};
    $.ajax({
        url:"/student/cert",
        data:param,
        type:"post",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                $(".succeed-container").removeClass("hidden");
                setTimeout(function(){
                    $(".succeed-container").addClass("hidden");
                    window.location.href="/user/cert";
                },2000);
            }else{
                alert(data.msg);
            }
        }
    })
});
