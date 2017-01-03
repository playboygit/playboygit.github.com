/**
 * Created by zhoubing on 2015/3/24.
 */
var editor;
$(document).ready(function(){
    KindEditor.ready(function(K) {
        editor = K.create('#kindEditor', {
            formatUploadUrl:false,
            resizeType:0,
            uploadJson:"picture",
            items:[
                'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                'table', 'hr', 'emoticons', 'anchor', 'link', 'unlink'
            ]
        });
    });
}).on("click","#publish-notice",function(){
    var title = $("#notice-title").val();
    var author = $("#notice-author").val();
    var text = editor.html();
    if(title==""){
        alert("标题不能为空");
        return false;
    }
    if(author==""){
        alert("作者不能为空");
        return false;
    }
    if(text==""){
        alert("内容不能为空");
        return false;
    }
    $.ajax({
        url:"/index/add_article",
        type:"post",
        data:{title:title,author:author,text:text},
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                alert("发布成功！");
                window.location.href=data.url;
            }else{
                alert(data.msg);
            }
        }
    });
}).on("click","#publish-affiche",function(){
    var text = editor.html();
    if(text==""){
        alert("内容不能为空");
        return false;
    }
    $.ajax({
        url:"/index/set_notice",
        type:"post",
        data:{text:text},
        success:function(data){
            var data = $.parseJSON(data);
            if(data.code==0){
                alert("发布成功！");
                window.location.href=data.url;
            }else{
                alert(data.msg);
            }
        }
    });
});