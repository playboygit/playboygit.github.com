/**
 * Created by zhoubing on 2014/12/11.
 */
var uploader = null;
var imgNameArr = [];
$(document).ready(function(){
    setTimeout(function(){
        $(".moxie-shim").height($(".upload-img-list .btn-add-img").outerWidth());
        $(".moxie-shim").children("input").attr("capture","camera").attr("accept","image/*").removeAttr("multiple");
    },200);
}).on("click","#upload-img-list .icon-del",function(){
    var index = $(this).attr("data-index");
    imgNameArr.splice(index,1);
    $(this).closest("li").remove();
    if($(this).attr("data-id")){
        uploader.removeFile($(this).attr("data-id"));
    }
    if($("#add-product-image").closest("li").hasClass("hide")){
        $("#add-product-image").closest("li").removeClass("hide");
        $(".moxie-shim").removeClass("hide");
    }
    $(".moxie-shim").css({width:$("#add-product-image").width(),height:$("#add-product-image").closest("li").height(),left:$("#add-product-image").closest("li").position().left+15,top:$("#add-product-image").closest("li").position().top+15});//调整按钮的位置
});

(function($){
    var imgWidth=$("#add-product-image").width()+2;
    var imgIndex = 0;
    var signature = "";
    var options = {
        'bucket': 'youwu',
        'save-key': 'Wap_'+new Date().getTime()+"_"+imgIndex,
        'expiration': Math.floor(new Date().getTime() / 1000) + 86400
    };
    var policy = window.btoa(JSON.stringify(options));
    var signature = initSaveKey(options);

    // 查看更多参数：http://docs.upyun.com/api/form_api/#表单API接口简介

    uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'add-product-image', // you can pass in id...
        container: document.getElementById('upload-img-list'), // ... or DOM Element itself
        flash_swf_url : 'lib/plupload/Moxie.swf',
        silverlight_xap_url : 'lib/plupload/Moxie.xap',

        url : 'http://v0.api.upyun.com/' + options.bucket,
        filters : {
            max_file_size : '5mb',//限制图片大小
            mime_types: [
                {title : "image type", extensions : "jpg,jpeg,gif,png"}
            ]
        },
        multipart_params: {
            'Filename': '${filename}', // adding this to keep consistency across the runtimes
            'Content-Type': '',
            'policy': policy,
            'signature': signature
        },
        init: {

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    var isOri = 0;
                    EXIF.getData(file.getNative(), function() {
                        if(file.getNative().exifdata.Orientation>1){
                            isOri = 1;
                        }
                    });
                    !function(){
                        previewImage(file,function(imgsrc){
                            imgIndex=$("#upload-img-list li").size()-1;
                            var $li = "";
                            if(isOri == 1){
                                $li = $('<li><div class="img-cover wrap-img-cover" style="width:'+imgWidth+'px;height:'+imgWidth+'px;"></div><span class="percent wrap-img-cover" style="width:'+imgWidth+'px;" id="'+file.id+'"><span class="percent-color"></span></span><img class="goods-img" height="'+imgWidth+'" src="'+imgsrc+'" ><a href="javascript:;" data-index="'+imgIndex+'" data-id="'+file.id+'" class="icon-del"></a></li>');
                            }else{
                                $li = $('<li><div class="img-cover wrap-img-cover" style="width:'+imgWidth+'px;height:'+imgWidth+'px;"></div><span class="percent wrap-img-cover" style="width:'+imgWidth+'px;" id="'+file.id+'"><span class="percent-color"></span></span><img height="'+imgWidth+'" src="'+imgsrc+'" ><a href="javascript:;" data-index="'+imgIndex+'" data-id="'+file.id+'" class="icon-del"></a></li>');
                            }
                            $("#add-product-image").closest("li").before($li);
                            options["save-key"] = 'Wap_'+new Date().getTime()+"_"+imgIndex+isOri;
                            imgNameArr.push(options["save-key"]);
                            uploader.settings.multipart_params.policy = window.btoa(JSON.stringify(options));
                            uploader.settings.multipart_params.signature = initSaveKey(options);
                            if($("#upload-img-list li").size()==10){
                                $("#add-product-image").closest("li").addClass("hide");
                                $(".moxie-shim").addClass("hide");
                            }
                            uploader.start();
                            $(".moxie-shim").css({left:$("#add-product-image").closest("li").position().left+15,top:$("#add-product-image").closest("li").position().top+15});//调整按钮的位置
                        })
                    }();
                });
            },

            UploadProgress: function(up, file) {
                $("#"+file.id).children("span").css({width:file.percent+"%"});
                if(file.percent==100){
                    $(".wrap-img-cover").addClass("hide");
                }
            },

            FileUploaded: function(up, file, info) {
                var response = JSON.parse(info.response);
                console.log(response.url);
            },

            Error: function(up, err) {
                if(err.code==-600){
                    alert("图片大小不能超过5M哦");
                }else if(err.code==-601){
                    alert("图片格式不对哦");
                }else if(err.code==-200){
                    alert("上传出错");
                }else{
                    alert( err.code + ": " + err.message);
                }
            }
        }
    });
    uploader.init();
    function initSaveKey(options){
        var policy = window.btoa(JSON.stringify(options));
        // 从 UPYUN 用户管理后台获取表单 API
        var form_api_secret = '0oac6eaSFYkw27X+keV8nckAOn0=';
        // 计算签名
        var signature = md5(policy + '&' + form_api_secret);
        return signature;
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
                preloader.downsize( 200, 200 ,true);//先压缩一下要预览的图片,宽，高
                var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',70) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
                callback && callback(imgsrc); //callback传入的参数为预览图片的url
                preloader.destroy();
                preloader = null;
            };
            preloader.load( file.getSource() );
        }
    }
})(jQuery)


