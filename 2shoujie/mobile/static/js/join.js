window.onload=function(){
    var Scroller = function() {
        var loadCount=0;
        var itemsToLoad = 3;

        var img1 = document.createElement("img");
        img1.src="static/image/join-pic.png";
        img1.addEventListener("load",itemLoaded);
        var img2 = document.createElement("img");
        img2.src="static/image/join-pic-blur.png";
        img2.addEventListener("load",itemLoaded);
        var img3 = document.createElement("img");
        img3.src="static/image/join-title.png";
        img3.addEventListener("load",itemLoaded);

        function itemLoaded(event) {
            loadCount++;
            if (loadCount >= itemsToLoad) {
                img1.removeEventListener("load",itemLoaded);
                img2.removeEventListener("load",itemLoaded);
                img3.removeEventListener("load",itemLoaded);
                _init();
            }
        }

        function _init(){
            var viewHeight = getViewHeight();
            var scroll_target = selectorUtil(".scroll-container");
            var fixed = selectorUtil(".fixed-container");

            fixed.style.height = viewHeight + "px";
            window.addEventListener("resize",function(){
                selectorUtil(".fixed-container").style.height = getViewHeight() + "px";
            });
            scroll_target.style.webkitTransform = 'translateY('+ viewHeight +'px)';
            scroll_target.style.mozTransform = 'translateY('+ viewHeight +'px)';
            scroll_target.style.transform = 'translateY('+ viewHeight +'px)';
            setTimeout(function(){
                addClass(fixed,"blur");
                addClass(scroll_target,"scroll-up");
                scroll_target.style.webkitTransform = 'translateY('+ 0 +'px)';
                scroll_target.style.mozTransform = 'translateY('+ 0 +'px)';
                scroll_target.style.transform = 'translateY('+ 0 +'px)';
            },1000);
        }
    }();
};

