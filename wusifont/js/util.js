//获取参数
(function ($) {
    $.getUrlParam = function (name, default_value) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return '';
    }
})(jQuery);
//封装get/post请求
(function(){ 
	$.getJson = function(url, func){ 
		$.ajax({ 
			url:url,
			type:"get",
			success:func,
			error:function(res){ 
				console.log("服务器出错了！！");
			}
		});
	}
	$.postJson = function(url, args, func){ 
		$.ajax({ 
			url:url,
			type:"post",
			data:args,
			success:func,
			error:function(){ 
				console.log("服务器出错了！！");
			}
		});
	}
})(jQuery);
