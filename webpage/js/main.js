$(document).ready(function(){
	$(window).load(function() {
        if($("#slider").size()==0) return false;
        $('#slider').nivoSlider({
             slices: 0, //effect为切片效果时的数量  
            boxCols: 0, //effect为格子效果时的列  
            boxRows: 0 //effect为格子效果时的行
        });
    });
}).on("mouseenter",".wrap-nav .nav-item",function(){
	$(this).children(".child-list").slideDown(200);
}).on("mouseleave",".wrap-nav .nav-item",function(){
	$(this).children(".child-list").slideUp(200);
}).on("click",".left-list .item a",function(){
	if($(this).next(".child-lst").size()>0){
		$(this).next(".child-lst").slideToggle(200);
	}	
});
//收藏
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页
function SetHome(obj,vrl){
    try{
            obj.style.behavior='url(#default#homepage)';
            obj.setHomePage(vrl);
    }
    catch(e){
        if(window.netscape) {
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                    alert("此操作被浏览器拒绝！请手动设置");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vrl);
         }else{
         	alert("改浏览器不支持，请手动设置！");
         }
    }
}