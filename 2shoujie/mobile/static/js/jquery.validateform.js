//表单验证实现
/*
 1、必填项 require    OK
 2、长度限制 length    OK
 3、类型限制 number\email\汉字\英文  OK
 ----逻辑-----
 1.页面初始化时对表单元素初始化  OK
 2.在表单提交之前验证            OK
 3.单个文本框失焦时验证          OK
 初始化时必填项后加*，然后验证不通过的元素在文本框下方给出提示
 */
(function($){
    //var formFlag = true;
    $.fn.validateform=function(){
        var $form = $(this);
        iptRequired($form);
        iptLengthLimit($form);
        iptValueType($form);
    }
    $.fn.validateTel=function(){
        var $form = $(this);
        iptRequired($form);
        iptValueType($form);
    }
    //验证非空
    function iptRequired($form){
        $form.find(":input[require]").each(function(){
            var $this = $(this);
            $this.on("blur",function(){
                if($this.closest("tr").find(".error-tip").size()!=0){
                    $this.closest("tr").find(".error-tip").remove();
                }
                if($.trim($this.val())==""){
                    var sText = "这里要填的";
                    showError($this, sText);
                   // $this.focus();
                }else{
                    $this.closest("tr").find(".error-tip").remove();
                    $this.closest("tr").children("td").removeClass("error-td");
                }
            });
        });
    }
    //验证字符长度
    function iptLengthLimit($form){
        $form.find(":input[maxLengths]").each(function(){
            var $this = $(this);
            $this.on("blur",function(){
                var maxLengths = $this.attr("maxLengths");
                if($this.closest("tr").find(".error-tip").size()==0){
                    if($.trim($this.val()).length>maxLengths){
                        var sText = "请删除超出文字";
                        showError($this, sText);
                       // $this.focus();
                    }else{
                        $this.closest("tr").find(".error-tip").remove();
                        $this.closest("tr").children("td").removeClass("error-td");
                    }
                }
            });
        });

        $form.find(":input[minLengths]").each(function(){
            var $this = $(this);
            $this.on("blur",function(){
                var minLengths = $this.attr("minLengths");
                if($this.closest("tr").find(".error-tip").size()==0){
                    if($.trim($this.val()).length<minLengths && $.trim($this.val()).length>0){
                        var sText = "长度至少"+minLengths+"位";
                        showError($this, sText);
                       // $this.focus();
                    }else{
                        $this.closest("tr").find(".error-tip").remove();
                        $this.closest("tr").children("td").removeClass("error-td");
                    }
                }
            });
        });
    }
    //验证值类型
    function iptValueType($form){
        var numRegxp = /^\d+$/;
        var emailRegxp = /^([a-z0-9_\.-]+)@([\da-z]+)\.([a-z]+)$/;
        var zhRegxp = /^[\u2E80-\u9FFF]+$/;
        var enRegxp = /^[a-zA-Z]+$/;
        var telRegxp = /^1[3|4|5|7|8][0-9]\d{8}$/;
        $form.find(":input[data-type]").each(function(){
            var $this = $(this);
            $this.on("blur",function(){
                var dataType = $(this).attr("data-type");
                var value = $.trim($this.val());
                var valueType = "";
                if($this.closest("tr").find(".error-tip").size()==0){
                    if(value.length>0){
                        switch(dataType){
                            case 'number':
                                if(!numRegxp.test(value)){
                                    valueType="格式不正确";
                                    //$this.focus();
                                }else{
                                    $this.closest("tr").find(".error-tip").remove();
                                    $this.closest("tr").children("td").removeClass("error-td");
                                }
                                break;
                            case 'email':
                                if(!emailRegxp.test(value)){
                                    valueType="请输入正确的邮箱";
                                    //$this.focus();
                                }else{
                                    $this.closest("tr").find(".error-tip").remove();
                                    $this.closest("tr").children("td").removeClass("error-td");
                                }
                                break;
                            case 'zh':
                                if(!zhRegxp.test(value)){
                                    valueType="汉字";
                                   /// $this.focus();
                                }else{
                                    $this.closest("tr").find(".error-tip").remove();
                                    $this.closest("tr").children("td").removeClass("error-td");
                                }
                                break;
                            case 'en':
                                if(!enRegxp.test(value)){
                                    valueType="英文";
                                    //$this.focus();
                                }else{
                                    $this.closest("tr").find(".error-tip").remove();
                                    $this.closest("tr").children("td").removeClass("error-td");
                                }
                                break;
                            case 'tel':
                                if(!telRegxp.test(value)){
                                    valueType="格式不正确";
                                    //$this.focus();
                                }else{
                                    $this.closest("tr").find(".error-tip").remove();
                                    $this.closest("tr").children("td").removeClass("error-td");
                                }
                                break;
                        }
                    }
                    if(valueType!=""){
                        var sText = valueType;
                        showError($this, sText);
                    }
                }
            });
        });
    }
    //信息提示
    function showError($this, sText){
        var $error = $("<span class='error-tip'>"+sText+"</span>");
        $this.closest("tr").find(".error-tip").remove();
        $this.closest("tr").children("td").removeClass("error-td");
        //$this.closest("tr").find(".wrap-td-txt").after($error);
        $this.closest("tr").children("td").eq(0).append($error);
        $this.closest("tr").children("td").addClass("error-td");
    }

})(jQuery);
//验证手机号
function validateTel($tr){
    $tr.validateTel();
    var flag = false;
    $tr.find(".error-tip").remove();
    $tr.find(":input").blur();
    if($tr.find(".error-tip").size() == 0){
        flag =  true;
    }else{
        flag = false;
    }
    return flag;
}
//表单提交验证
function beforeSubmit($form){
    $form.validateform();
    var flag = false;
    //$form.find(".error-tip").remove();
    $form.find(":input").blur();
    if($form.find(".error-tip").size() == 0){
        flag =  true;
    }else{
        flag = false;
    }
    return flag;
}