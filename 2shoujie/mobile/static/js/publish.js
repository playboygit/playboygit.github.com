/**
 * Created by zhoubing on 2015/2/5.
 */
$(document).ready(function(){
    var h = $("#add-product-image").width();
    if($("#upload-img-list").children("li").size()>1){//编辑
        $(".image").height(h);
        $("#goods_detail").height($("#temp-product-info").height());
    }
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'add-product-image',
        container: 'upload-img-list',
        drop_element: 'upload-img-list',
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
        uptoken: decodeURIComponent(getCookie("token")),
       // uptoken: "hyA3Svs21nO-wJsXWMdpZMkRz9NrzYZOKRx76Pwm:MBVMeCwiQ6pabRODEvCLtkWde34=:eyJzY29wZSI6ImVyc2hvdSIsImRlYWRsaW5lIjoxNDI2NTY2OTk2fQ==",
        unique_names: false,
        save_key: false,
        auto_start: true,
        init: {
            'FilesAdded': function (up, files) {
                var file = files[0];
                var isOri = "";
                EXIF.getData(file.getNative(), function() {
                    var orientation = file.getNative().exifdata.Orientation;
                    if(orientation && orientation>1){//ios 横拍为3，竖排为6
                        if(orientation==3){
                            isOri = "rotate-img2";
                        }else if(orientation == 6){
                            isOri = "rotate-img";
                        }
                    }
                });
                var $item = $('<li><div class="img-cover wrap-img-cover" style="height:'+h+'px;"><span class="loader loader-quart"></span></div><img id="'+file.id+'" src="" class="image '+isOri+'"/><a href="javascript:;" class="icon-del hide"></a></li>');
                $("#add-product-image").closest("li").before($item);
                if ($(".upload-img-list").children("li").size() == 5) {
                    $("#add-product-image").closest("li").addClass("hide");
                    $(".moxie-shim").addClass("hide");
                }
                $(".moxie-shim").css({left:$("#add-product-image").closest("li").position().left+15,top:$("#add-product-image").closest("li").position().top+15});//调整按钮的位置
                !function(){
                    previewImage(file,function(imgsrc){
                        $("#"+file.id).attr("src",imgsrc);
                    })
                }();
            },
            'UploadProgress': function (up, file) {
                //$("#" + file.id).css("width", file.percent + "%");
            },
            'FileUploaded': function (up, file, info) {
                $("#" + file.id).prev(".img-cover").addClass("hide");
                $("#" + file.id).next("a").removeClass("hide");
                $("#"+file.id).attr("url","http://ershou.u.qiniudn.com/"+$.parseJSON(info).key);
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
                $("#"+err.file.id).closest("li").remove();
                if($("#"+err.file.id).closest("li").index()==3){
                    $("#add-product-image").closest("li").removeClass("hide");
                    $(".moxie-shim").removeClass("hide");
                }
                $(".moxie-shim").css({left:$("#add-product-image").closest("li").position().left+15,top:$("#add-product-image").closest("li").position().top+15});//调整按钮的位置
            },
            'Key': function (up, file) {
                var key = "Wap_" + new Date().getTime() + "_" + file.id;
                return key
            }
        }
    });
    setTimeout(function(){
        $(".moxie-shim").children("input").attr("capture","camera").attr("accept","image/*").removeAttr("multiple");
    },500);
    $(".first-list").delegate("li","click",function(){
        $(".first-list li").removeClass("selected");
        $(this).addClass("selected");
        $("#first-id").val($(this).attr("value"));
        $("#second-id").val("");
        var cate = $(this).attr("pk");
        $(".category-ipt").val($(this).text());
        if($(".second-list").children("."+cate).size()>0){
            $(".first-list").addClass("hide");
            $(".second-list").children("."+cate).removeClass("hide");
            $(".second-list").removeClass("hide");
            $(".wrap-category .head-txt").html("选择二级分类");
        }else{
            $(".category-box").addClass("hide");
        }
    })
    $(".second-list").delegate("li","click",function(){
        $(".second-list li").removeClass("selected");
        $(this).addClass("selected");
        $("#second-id").val($(this).attr("value"));
        $(".category-ipt").val($(".category-ipt").val()+"-"+$(this).text());
        $(".category-box").addClass("hide");
    })
    $(".category-td").click(function(){
        $(".wrap-category .head-txt").html("选择分类");
        $(".first-list").removeClass("hide");
        $(".second-list li").addClass("hide");
        $(".second-list").addClass("hide");
        $(".category-box").removeClass("hide");
    })
}).on("click",".icon-del",function(){
    $(this).parent("li").remove();
    if($("#add-product-image").closest("li").hasClass("hide")){
        $("#add-product-image").closest("li").removeClass("hide");
        $(".moxie-shim").removeClass("hide");
    }
    $(".moxie-shim").css({width:$("#add-product-image").width(),height:$("#add-product-image").width(),left:$("#add-product-image").closest("li").position().left+15,top:$("#add-product-image").closest("li").position().top+15});//调整按钮的位置
}).on("click",".cate-close",function(){
    $(".category-box").addClass("hide");
}).on("keydown keyup",".product-info",function(){   //商品描述
    $(".temp-product-info").html($(this).val());
    if($(this).val()==""){
        $(".temp-product-info").html("");
    }
    $(".product-info").height($(".temp-product-info").height());
}).on("click","#publish-finish",function(){     //发布
    var imgArr = $(".upload-img-list").find(".image");
    if(imgArr.size()==0){
        alert("请至少上传一张图片");
        return;
    }
    var flag = beforeSubmit($("#publish-form"));
    if(flag){
        $(".wrap-loading").removeClass("hide");
        var goods_name = $("#goods_name").val();
        var goods_detail = $("#goods_detail").val();
        var goods_price = $("#goods_price").val();
        var goods_trade_place = $("#goods_trade_place").val();
        var goods_class_id = 0;
        if($("#second-id").val()==""){
            goods_class_id = $("#first-id").val();
        }else{
            goods_class_id = $("#second-id").val();
        }
        var school_id = getCookie("school_id");
        var qq = $("#qqnum").val();
        var tel = $("#tel").val();
        var images = new Array();
        imgArr.each(function(){
            images.push($(this).attr("url"));
        });
        var imagesUrls = images.toString();
        $.ajax({
            url:"/mobile/goods/release",
            data:{
                goods_name : goods_name,
                goods_detail : goods_detail,
                goods_price : goods_price,
                goods_trade_place : goods_trade_place,
                goods_is_discount : "1",
                goods_class_id : goods_class_id,
                goods_image : imagesUrls,
                goods_school_id : school_id,
                user_qq : qq,
                user_phone_number : tel
            },
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                $(".wrap-loading").addClass("hide");
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href=res.data.goods_url;
                } else {
                    alert(res.msg);
                }
            }
        });
    }
}).on("click","#go-prev",function(){    //返回上一页
    window.history.go(-1);
}).on("click","#edit-publish",function(){
    var imgArr = $(".upload-img-list").find(".image");
    if(imgArr.size()==0){
        alert("请至少上传一张图片");
        return;
    }
    var flag = beforeSubmit($("#publish-form"));
    if(flag){
        $(".wrap-loading").removeClass("hide");
        var goods_id = $("#goods_id").val();
        var goods_name = $("#goods_name").val();
        var goods_detail = $("#goods_detail").val();
        var goods_price = $("#goods_price").val();
        var goods_trade_place = $("#goods_trade_place").val();
        var goods_class_id = 0;
        if($("#second-id").val()==""){
            goods_class_id = $("#first-id").val();
        }else{
            goods_class_id = $("#second-id").val();
        }
        var school_id = getCookie("school_id");
        var qq = $("#qqnum").val();
        var tel = $("#tel").val();
        var images = new Array();
        imgArr.each(function(){
            images.push($(this).attr("url"));
        });
        var imagesUrls = images.toString();
        $.ajax({
            url:"/goods/modify",
            data:{
                goods_id:goods_id,
                goods_name : goods_name,
                goods_detail : goods_detail,
                goods_price : goods_price,
                goods_trade_place : goods_trade_place,
                goods_is_discount : "1",
                goods_class_id : goods_class_id,
                goods_image : imagesUrls,
                goods_school_id : school_id,
                user_qq : qq,
                user_phone_number : tel
            },
            type:"post",
            success:function(data){
                var res = $.parseJSON(data);
                $(".wrap-loading").addClass("hide");
                if (res.code == 0) {
                    //跳转到首页
                    window.location.href=res.data.goods_url;
                } else {
                    alert(res.msg);
                }
            }
        });
    }
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
/*转化图片为base64*/
function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
    if(!file || !/image\//.test(file.type)) return; //确保文件是图片
    if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function(){
            callback(fr.result);
            fr.destroy();
            fr = null;
        }
        fr.readAsDataURL(file.getSource());
    }else{
        var preloader = new mOxie.Image();
        preloader.onload = function() {
            preloader.downsize( 140, 140 ,true);//先压缩一下要预览的图片,宽，高
            var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',70) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
            callback && callback(imgsrc); //callback传入的参数为预览图片的url
            preloader.destroy();
            preloader = null;
        };
        preloader.load( file.getSource() );
    }
}
