var catSelect=function(){
        var curUlId=null,
        $mainCat=$('.goods-cat .form-value'),
        $viceCat=$('.goods-cat .form-value-l');
        $mainCat.children('.form-input-wr').click(function(){
            $mainCat.children('.select').css('display','block');
        })
        $mainCat.children('.select').children('li').click(function(){
            var val=$(this).text(),
            $this = $(this),
            pk=$this.attr('pk');
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
            $viceCat.children(".select").children().removeClass("show");
            if($viceCat.children(".select").children("."+pk).size()>0){               
               $viceCat.children(".select").children("."+pk).addClass("show");
               $viceCat.addClass("show");
            }else{
                $viceCat.removeClass("show");
            }
            $mainCat.children('.form-input-wr').children('span').text(val);
            $('#cat_l').val('');
            $viceCat.children('.form-input-l-wr').children('span').text('未选择');
            $('#cat').val($this.attr("value"));
            $mainCat.children('.select').css('display','none');
        })
        $viceCat.children('.form-input-l-wr').click(function(){
            $viceCat.children('.select').addClass("show");
        })
        $viceCat.children('.select').children('li').click(function(){
            var val=$(this).text();
            $('#cat_l').val(val);
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
            $viceCat.children('.form-input-l-wr').children('span').text(val);
            $viceCat.children('.select').removeClass("show");
            $('#cat_l').val($(this).attr("value"));
        })
        $(document).click(function(){ if ($(event.srcElement).is(".goods-cat .form-value,.goods-cat .form-value *,goods-cat form-value-l,.goods-cat .form-value-l *")) {  return false; } else { $mainCat.children('.select').css('display','none');$viceCat.children('.select').removeClass("show"); } });
    }
var addrSelect=function(){
    var $addr=$('.goods-place .form-value');
    $addr.children('.form-input-wr').click(function(){
        $addr.children('ul').css('display','block');
    })
    $addr.children('ul').children('li').click(function(){
        var val=$(this).text();
            if(val!='其他'){
                $(this).parent('ul').parent('div').children('div').css({
                    'background-color': 'rgb(255,255,255)',
                    'border-color':'rgb(68,193,165)'
                });
            }
            else{
                $(this).parent('ul').parent('div').children('div').css({
                    'border': '1px solid rgb(208,224,226)',
                    'background-color': 'rgb(246,249,249)'
                });
            }
        $addr.children('.form-input-wr').children('span').text(val);
        $('#place').val(val);
        $addr.children('ul').css('display','none');
    })
    $(document).click(function(){ if ($(event.srcElement).is(".goods-place .form-value,.goods-place .form-value *")) {  return false; } else { $addr.children('.select').css('display','none'); } });
}
 var discount=function(){
    $('.goods-discount .form-value .form-input-wr span').click(function(){
        var val=$(this).attr('data-value');
        $('.goods-discount .form-value .form-input-wr span').removeClass('sel');
        $(this).addClass('sel');
        $('#discount').val(val);
    })
 }
var act=function(){
    $('.form-value input,.form-value textarea').focus(function(){
        $(this).parent('div').css({
            'background-color': 'rgb(255,255,255)',
            'border-color':'rgb(68,193,165)'
        });
        $(this).parent('div').removeClass('form-alert');
        if($(this).attr("placeholder")==""){
            $(this).attr("placeholder",$(this).attr("place"));
        }
    });
    $('.form-value input,.form-value textarea').blur(function(){
       if($(this).val()==''){
        $(this).parent('div').css({
            'border': '1px solid rgb(208,224,226)',
            'background-color': 'rgb(246,249,249)'
        });
       } 
       else{
        $(this).parent('div').css({
            'background-color': 'rgb(255,255,255)',
            'border-color':'rgb(68,193,165)'
        });
       }
    });
}
function submitCaution(elem){
    $('#'+elem).parent('div').css({
        'background-color': 'rgb(255,233,236)',
        'border-color':'rgb(235,80,83)'
    });
    $('#'+elem).parent('div').addClass('form-alert');
    if(!$('#'+elem).attr("placeholder")==""){
        $('#'+elem).attr("place",$('#'+elem).attr("placeholder"));
    }
    $('#'+elem).attr("placeholder","");
}
var submitAct=function(){
    $('.form-wr form').submit(function(){
        var tel=$('#tel').val(),
            price=$('#price').val(),
            title=$('#title').val(),
            qq=$('#qq').val(),
            desc=$('#desc').val();
        var i=1;
        if(price==''){
            submitCaution('price');
            i=0;
        }
        if(title==''){
            submitCaution('title');
            i=0;
        }
        if(desc==''){
            submitCaution('desc');
            i=0;
        }
        if(i==0) return false;
        else return true;
    })
}
var selectPhoto=function(){
    $('.camera-button').click(function(){
        $(this).parent('div').css('display','none');
        $('.gallery').css('display','block');
    })
}
//设置cookie
//name是cookie中的名，value是对应的值，iTime是多久过期（单位为天）,path:设置cookie作用域
function setCookie(name,value,iTime){
    if(arguments.length==2){
        var iTime = 300;
    }
    var oDate = new Date();
    //设置cookie过期时间
    oDate.setTime(oDate.getTime()+iTime*24*3600*1000);
    document.cookie = name+'='+value+';path=/;domain=.uwu.im;expires='+oDate.toGMTString();
}
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
//删除cookie
function removeCookie(name){
    //调用setCookie方法，把时间设置为-1
    if(name.indexOf(",")==-1){
        setCookie(name,1,-1);
    }else{
        var arr = name.split(",");
        for(var i=0; i<arr.length; i++){
            setCookie(arr[i],1,-1);
        }
    }
}
$(document).ready(function(){
    act();
    selectPhoto();
    catSelect();
    addrSelect();
    discount();
    submitAct();
    if($(".upload-area").children(".photo").size()!=0){
        $('.photo-area').removeClass('init-up').addClass('over-up');
        $("#upload").children("span").eq(0).removeClass("up-bg").addClass("upload-img");
        $(".up-img-bg").addClass("hide");
        if ($(".upload-area").children(".photo").size() == 4) {
            $("#upload").closest("div").addClass("hide");
            $(".moxie-shim").addClass("hide");
        }
    }
}).on("click",".photo .close",function(){    //删除图片
    $(this).parent("div").remove();
    if($("#upload").closest("div").hasClass("hide")){
        $("#upload").closest("div").removeClass("hide");
        $(".moxie-shim").removeClass("hide");
    }
    $(".moxie-shim").css({width:$("#upload").width(),height:$("#upload").height(),left:$("#upload").closest("div").position().left,top:$("#upload").closest("div").position().top});//调整按钮的位置
    if($(".upload-area").children(".photo").size()==0){
        $('.photo-area').removeClass('over-up').addClass('init-up');
        $("#upload").children("span").eq(0).removeClass("upload-img").addClass("up-bg");
        $(".up-img-bg").removeClass("hide");
    }
}).on("click",".download_guide .close,.download_guide .btn_continue",function(){
    $(".download_guide").remove();
}).on("mouseover",".moxie-shim input",function(){
    $(".upload-area .upload-img").addClass("upload-img-hover");
}).on("mouseout",".moxie-shim input",function(){
    $(".upload-area .upload-img").removeClass("upload-img-hover");
}).on("click","#apply-in",function(){
    var school = $("#school").val();
    var code = $("#code").val();
    var fen = $("#fen").val();
    var email = $("#email").val();
    var i = 1;
    if (school == '') {
        submitCaution('school');
        i = 0;
    }
    if (code == '') {
        submitCaution('code');
        i = 0;
    }
    if (fen == '') {
        submitCaution('fen');
        i = 0;
    }
    if(email == ''){
        submitCaution('email');
        i = 0;
    }
    if (!i) {
        return false;
    }
    $.ajax({
        url:"/index/add_weixin_apply",
        data:{school_name:school,weixin_name:code,fans_num:fen,email:email},
        type:"post",
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                alert("提交成功");
                window.location.href="/open";
            }else{
                alert(data.msg);
            }
        }
    });
});

$(function() {
    if($("#upload").size()==0) return false;
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'upload',
        container: 'upload-area',
        drop_element: 'upload-area',
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
        // downtoken_url: '/downtoken',
        unique_names: false,
        save_key: false,
        auto_start: true,
        init: {
            'FilesAdded': function (up, files) {
                var file = files[0];
                if($(".upload-area").children(".photo").size()==0){
                    $('.photo-area').removeClass('init-up').addClass('over-up');
                    $("#upload").children("span").eq(0).removeClass("up-bg").addClass("upload-img");
                    $(".up-img-bg").addClass("hide");
                }
                var $item = $('<div class="photo"><div><img width="140" height="140" src="" alt="" class="image"></div><span class="close"></span><div class="processbar" id="' + file.id + '" style="width: 0%;"></div></div>');
                $("#upload").closest("div").before($item);
                if ($(".upload-area").children(".photo").size() == 4) {
                    $("#upload").closest("div").addClass("hide");
                    $(".moxie-shim").addClass("hide");
                }
                $(".moxie-shim").css({left: $("#upload").closest("div").position().left, top: $("#upload").closest("div").position().top});//调整按钮的位置
                !function(){
                    previewImage(file,function(imgsrc){
                        $("#"+file.id).closest(".photo").find("img").attr("src",imgsrc);
                    })
                }();
            },
            'UploadProgress': function (up, file) {
                $("#" + file.id).css("width", file.percent + "%");
            },
            'FileUploaded': function (up, file, info) {
                $("#" + file.id).addClass("hide");
                $("#"+file.id).closest(".photo").find("img").attr("url","http://ershou.u.qiniudn.com/"+$.parseJSON(info).key);
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
                $("#" + err.file.id).closest(".photo").remove();
                if ($(".upload-area").children(".photo").size()==3) {
                    $("#upload").closest("div").removeClass("hide");
                    $(".moxie-shim").removeClass("hide");
                }
                if($(".upload-area").children(".photo").size()==0){
                    $('.photo-area').removeClass('over-up').addClass('init-up');
                    $("#upload").children("span").eq(0).removeClass("upload-img").addClass("up-bg");
                    $(".up-img-bg").removeClass("hide");
                }
                $(".moxie-shim").css({left: $("#upload").closest("div").position().left, top: $("#upload").closest("div").position().top});//调整按钮的位置
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
});
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

var zb_t,iszb_t = true;
function pre_release()
{
    iszb_t = false;
    school_id = $('#school_id').val();
    user_school_id = $('#user_school_id').val();
    if (user_school_id != 0 && school_id != user_school_id) {
        $('#sel_school').removeClass('hidden');
        return;
    }
    release(school_id);
}

function release(school_id) {
    $(".close-container").addClass("hidden");
    var tel = $('#tel').val(),
        price = $('#price').val(),
        name = $('#title').val(),
        qq = $('#qq').val(),
        desc = $('#desc').val();
    //获取图片
    var images = new Array();
    var j = 0;
    var upload_success = 1;
    $('.image').each(function (index, img) {
        if (index != 0) {
            var url = $(img).attr('url');
            if (url.indexOf('qiniu') == -1 &&
                url.indexOf('goods_image') == -1) {
                upload_success = 0;
            } else {
                images[j++] = url;
            }
        }
    });
    if (!upload_success) {
        alert('有图片上传失败，请删除重试哦，亲！');
        return;
    }
    if (images.length == 0) {
        alert('正所谓没图没真相，补上图片吧，亲！');
        return;
    }
    var i = 1;
    if (price == '' || price < 0) {
        submitCaution('price');
        i = 0;
    }
    if (name == '') {
        submitCaution('title');
        i = 0;
    }
    if (desc == '') {
        submitCaution('desc');
        i = 0;
    }
    if (!i) {
        return;
    }
    var trade_place = $("#trade_place").val();
    var discount = $("#discount").val();
    if ($("#cat").val() == 4) {
        var goods_class_id = $("#cat").val();
    }else if($("#cat").val() ==999){
        var goods_class_id = $("#cat").val();
    } else {
        var goods_class_id = $("#cat_l").val();
    }
    $('.form-submit').attr('disabled', true);
    $(".form-submit").attr("data-flag","1");
    //提交表单
    $.post(
        '/goods/release',
        {
            goods_name : name,
            goods_detail : desc,
            goods_price : price,
            goods_trade_place : trade_place,
            goods_is_discount : discount,
            goods_class_id : goods_class_id,
            goods_image : images.join(','),
            goods_school_id : school_id,
            user_qq : qq,
            user_phone_number : tel
        },
        function(res) {
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
                $('.form-submit').removeAttr('disabled', false);
            } else {
                window.location.href = res.data.goods_url;
            }
        }
    );
}

//编辑商品
function edit(goods_id) {
    iszb_t = false;
    $(".close-container").addClass("hidden");
    var tel = $('#tel').val(),
        price = $('#price').val(),
        name = $('#title').val(),
        qq = $('#qq').val(),
        desc = $('#desc').val();
    //获取图片
    var images = new Array();
    var j = 0;
    var upload_success = 1;
    $('.image').each(function (index, img) {
        if (index != 0) {
            var url = $(img).attr('url');
            if (url.indexOf('qiniu') == -1 &&
                url.indexOf('goods_image') == -1) {
                upload_success = 0;
            } else {
                images[j++] = url;
            }
        }
    });
    if (!upload_success) {
        alert('有图片上传失败，请删除重试哦，亲！');
        return;
    }
    if (images.length == 0) {
        alert('正所谓没图没真相，补上图片吧，亲！');
        return;
    }
    var i = 1;
    if (price == '' || price < 0) {
        submitCaution('price');
        i = 0;
    }
    if (name == '') {
        submitCaution('title');
        i = 0;
    }
    if (desc == '') {
        submitCaution('desc');
        i = 0;
    }
    if (!i) {
        return;
    }
    var trade_place = $("#trade_place").val();
    var discount = $("#discount").val();
    if ($("#cat").val() == 4) {
        var goods_class_id = $("#cat").val();
    }else if($("#cat").val() ==999){
        var goods_class_id = $("#cat").val();
    } else {
        var goods_class_id = $("#cat_l").val();
    }
    $('.form-submit').attr('disabled', true);
    $(".form-submit2").attr("data-flag","1");
    //提交表单
    $.post(
        '/goods/modify',
        {
            goods_id : goods_id,
            goods_name : name,
            goods_detail : desc,
            goods_price : price,
            goods_trade_place : trade_place,
            goods_is_discount : discount,
            goods_class_id : goods_class_id,
            goods_image : images.join(','),
            user_qq : qq,
            user_phone_number : tel
        },
        function(res) {
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
                $('.form-submit').removeAttr('disabled', false);
            } else {
                window.location.href = res.data.goods_url;
            }
        }
    );
}

/*编辑发布求购*/
function edit_want(want_id){
    iszb_t = false;
    var tel = $('#tel').val(),
        price = $('#price').val(),
        name = $('#title').val(),
        qq = $('#qq').val(),
        desc = $('#desc').val();

    var i = 1;
    if (price == '' || price < 0) {
        submitCaution('price');
        i = 0;
    }
    if (name == '') {
        submitCaution('title');
        i = 0;
    }
    if (desc == '') {
        submitCaution('desc');
        i = 0;
    }
    if (!i) {
        return;
    }
    var trade_place = $("#trade_place").val();
    $('.load-tip').text('正在发布');
    $('#circular-loading').removeClass('hidden');
    $('.form-submit').attr('disabled', true);
    $(".form-submit").attr("data-flag","1");
    //提交表单
    $.post(
        '/want/modify',
        {
            name : name,
            detail : desc,
            price : price,
            place : trade_place,
            qq : qq,
            phone : tel,
            want_id: want_id
        },
        function(res) {
            $('#circular-loading').addClass('hidden');
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
                $('.form-submit').removeAttr('disabled', false);
            } else {
                window.location.href = "/want";
            }
        }
    );
}

function wantRelease(){
    iszb_t = false;
    var tel = $('#tel').val(),
        price = $('#price').val(),
        name = $('#title').val(),
        qq = $('#qq').val(),
        desc = $('#desc').val();

    var i = 1;
    if (price == '' || price < 0) {
        submitCaution('price');
        i = 0;
    }
    if (name == '') {
        submitCaution('title');
        i = 0;
    }
    if (desc == '') {
        submitCaution('desc');
        i = 0;
    }
    /*if (!qq.match(/^\d{6,11}$/) && tel == '') {
        submitCaution('qq');
        i = 0;
    }*/
    if (!i) {
        return;
    }

    var trade_place = $("#trade_place").val();
    $('.load-tip').text('正在发布');
    $('#circular-loading').removeClass('hidden');
    $('.form-submit').attr('disabled', true);
    $(".form-submit").attr("data-flag","1");
    //提交表单
    $.post(
        '/want/publish',
        {
            name : name,
            detail : desc,
            price : price,
            place : trade_place,
            qq : qq,
            phone : tel
        },
        function(res) {
            $('#circular-loading').addClass('hidden');
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
                $('.form-submit').removeAttr('disabled', false);
            } else {
                window.location.href = "/want";
            }
        }
    );
}
window.onbeforeunload = function()
{
    if($("#upload").size()>0){
        if($(".upload-area .image").size()>0 || $("#title").val()!=""){
            iszb_t = true;
        }else{
            iszb_t = false;
        }
    }else{
        if($("#title").val()!=""){
            iszb_t = true;
        }else{
            iszb_t = false;
        }
    }
    if($("#apply-in").size()>0){
        iszb_t = false;
    }
    var flag = $(".form-submit").attr("data-flag");
    var flag1 = $(".form-submit2").attr("data-flag");
    if(iszb_t==true){
        if(flag=="1" || flag1=="1"){
        }else{
            setTimeout(function(){zb_t = setTimeout(onunloadcancel, 0)}, 0);
            return "确定离开此页？";
        }
    }
}
window.onunloadcancel = function()
{
    clearTimeout(zb_t);
}