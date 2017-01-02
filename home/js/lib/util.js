/**
 * Created by zhoubing on 2014/12/22.
 */
//表示全局唯一标识符 (GUID)。
function Guid(g){
    var arr = new Array(); //存放32位数值的数组
    if (typeof(g) == "string"){ //如果构造函数的参数为字符串
        InitByString(arr, g);
    }
    else{
        InitByOther(arr);
    }
    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function(o){
        if (o && o.IsGuid){
            return this.ToString() == o.ToString();
        }
        else{
            return false;
        }
    }
    //Guid对象的标记
    this.IsGuid = function(){}
    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function(format){
        if(typeof(format) == "string"){
            if (format == "N" || format == "D" || format == "B" || format == "P"){
                return ToStringWithFormat(arr, format);
            }
            else{
                return ToStringWithFormat(arr, "D");
            }
        }
        else{
            return ToStringWithFormat(arr, "D");
        }
    }
    //由字符串加载
    function InitByString(arr, g){
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
            InitByOther(arr);
        }
        else{
            for (var i = 0; i < g.length; i++){
                arr.push(g[i]);
            }
        }
    }
    //由其他类型加载
    function InitByOther(arr){
        var i = 32;
        while(i--){
            arr.push("0");
        }
    }
    function ToStringWithFormat(arr, format){
        switch(format){
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);
                str = str.replace(/,/g, "");
                return str;
            case "B":
                var str = ToStringWithFormat(arr, "D");
                str = "{" + str + "}";
                return str;
            case "P":
                var str = ToStringWithFormat(arr, "D");
                str = "(" + str + ")";
                return str;
            default:
                return new Guid();
        }
    }
}
//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function(){
    var g = "";
    var i = 32;
    while(i--){
        g += Math.floor(Math.random()*16.0).toString(16);
    }
    return new Guid(g);
}
//解析异步返回值
function analyData(data){
    if(data.error==0){
        return true;
    }else{
        return false;
    }
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
//判断图片是否旋转
function isRotate(url){
    return parseInt(url.charAt(url.length-1),10);
}