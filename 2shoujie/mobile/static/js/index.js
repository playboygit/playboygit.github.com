(function(){
    var viewHeight = getViewHeight();
    var container = selectorUtil(".container");

    var Slider = function() {
        var cur,slideNum,slideWidth,posX,slidedx;
        var dots;
        var startT,endT,dureT,touchStartX,dir,mindt,mindx;
        var isMove=false;

        var n1,st;

        function computePosCur(){
            posX = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("-moz-transform") ||
                st.getPropertyValue("-ms-transform") ||
                st.getPropertyValue("-o-transform") ||
                st.getPropertyValue("transform") ||
                "fail...";
            var matrixValues = posX.split('(')[1];
            matrixValues = matrixValues.split(')')[0];
            matrixValues = matrixValues.split(',');
            posX = parseInt(matrixValues[4]);
            cur = parseInt(Math.abs(posX)/slideWidth)+1;
        }

        function touchStart(touch){
            var newDate = new Date();
            touchStartX = touch.pageX;
            startT = newDate.getTime();
            slidedx = 0;
            removeClass(photos,"sliding");
            removeClass(photos,"sliding2");
            computePosCur();
        }

        function touchMove(touch){
            slidedx = touch.pageX - touchStartX;
            var curpos = posX+slidedx;
            photos.style.webkitTransform = 'translateX('+ curpos +'px)';
            photos.style.mozTransform = 'translateX('+ curpos +'px)';
            photos.style.transform = 'translateX('+ curpos +'px)';
        }

        function touchEnd(){
            var newDate = new Date();
            endT = newDate.getTime();
            dureT = endT - startT;
            dir = (slidedx>0?-1:1);
            addClass(photos,"sliding");
            if(cur <= 1 && dir === -1){
                photos.style.webkitTransform = 'translateX(0px)';
                photos.style.mozTransform = 'translateX(0px)';
                photos.style.transform = 'translateX(0px)';
            } else if((cur >= slideNum && dir === 1) || dureT<mindt || ((Math.abs(slidedx)/slideWidth)<mindx)){
                photos.style.webkitTransform = 'translateX('+posX+'px)';
                photos.style.mozTransform = 'translateX('+posX+'px)';
                photos.style.transform = 'translateX('+posX+'px)';
            } else {
                cur += dir;
                var slideToPos = (-(cur-1)*slideWidth);
                photos.style.webkitTransform = 'translateX('+ slideToPos +'px)';
                photos.style.mozTransform = 'translateX('+ slideToPos +'px)';
                photos.style.transform = 'translateX('+ slideToPos +'px)';
                for(var i=0;i<slideNum;i++){
                    if(i == cur-1){
                        addClass(dots.children[i],"active");
                    }else{
                        removeClass(dots.children[i],"active");
                    }
                }
            }
            setTimeout(function(){
                removeClass(photos,"sliding");
            },500);
        }


        function handleTouchEvent(event){
            var touch;
            if(window.navigator.msPointerEnabled){
                touch = event;
                switch (event.type) {
                    case "MSPointerDown":
                    case "pointerdown":
                        isMove=true;
                        touchStart(touch);
                        break;
                    case "MSPointerUp":
                    case "pointerup":
                        isMove=false;
                        touchEnd();
                        break;
                    case "MSPointerMove":
                    case "pointermove":
                        event.preventDefault(); //prevent scrolling
                        if(isMove) {
                            touchMove(touch);
                        }
                        break;
                }
            }else {
                touch = event.touches[0];
                switch (event.type) {
                    case "touchstart":
                        touchStart(touch);
                        isMove=true;
                        break;
                    case "touchend":
                        touchEnd();
                        isMove=false;
                        break;
                    case "touchmove":
                        event.preventDefault(); //prevent scrolling
                        touchMove(touch);
                        break;
                }
            }
        }

        function _init(){
            var lis;
            dir = 1;
            mindt = 100;
            mindx=0.2;
            lis = photos.children;
            slideNum = lis.length;
            photos.style.width = slideNum * 100 + "%";
            dots = document.createElement("ul");
            selectorUtil(".slide-dots").appendChild(dots);
            for(var i=0; i<slideNum; i++){
                lis[i].style.width = 100.0/slideNum + "%";
                if(slideNum > 1){
                    var li_tmp = document.createElement("li");
                    dots.appendChild(li_tmp);
                }
            }
            addClass(dots.children[0],"active");
            slideWidth = parseInt(photos.offsetWidth/slideNum);
            st = window.getComputedStyle(photos,null);
        }

        function _slideOnHand(){
            if(window.navigator.msPointerEnabled){
                photos.addEventListener("MSPointerDown",handleTouchEvent);
                photos.addEventListener("MSPointerUp", handleTouchEvent);
                photos.addEventListener("MSPointerMove", handleTouchEvent);
            }else{
                photos.addEventListener("touchstart", handleTouchEvent);
                photos.addEventListener("touchend", handleTouchEvent);
                photos.addEventListener("touchmove", handleTouchEvent);
            }
        }

        function _autoSlide(){
            n1 = setInterval(function(){
                addClass(photos,"sliding2");
                computePosCur();
                posX-=dir*slideWidth;
                cur+=dir;
                if(cur>=4 || cur<=0){
                    posX+=2*dir*slideWidth;
                    cur-=2*dir;
                    dir*=(-1);
                }
                photos.style.webkitTransform = 'translateX('+posX+'px)';
                photos.style.mozTransform = 'translateX('+posX+'px)';
                photos.style.transform = 'translateX('+posX+'px)';
                for(var i=0;i<slideNum;i++){
                    if(i == cur-1){
                        addClass(dots.children[i],"active");
                    }else{
                        removeClass(dots.children[i],"active");
                    }
                }
            },5000);
        }

        return {
            init: _init,
            slideOnHand: _slideOnHand,
            autoSlide: _autoSlide
        }

    }();

    /*function itemsRank(){
        var rules = selectorUtil(".rank-rules ul");
        var items = rules.children;
        var len = items.length;
        if(rules){
            rules.addEventListener("click",function(event){
                event.preventDefault();
                var item = getParentByClass(event.target,"catg");
                if(item){
                    if(!hasClass(item,"active")) {
                        for (var i = 0; i < len; i++) {
                            removeClass(items[i], "active");
                        }
                        addClass(item, "active");
                    }else if(hasClass(item,"d-price")){
                        removeClass(item,"d-price");
                        addClass(item,"i-price");
                    }else if(hasClass(item,"i-price")){
                        removeClass(item,"i-price");
                        addClass(item,"d-price");
                    }
                }
            })
        }
    }*/

    function searchInit(){
        var wrapper = selectorUtil(".input-wr");
        var search = selectorUtil(".search-input input");
        var search_btn = selectorUtil(".search-btn");
        search.addEventListener("keyup",function(){
            if(search.value.length != 0){
                addClass(search_btn,"btn-show");
            }else{
                removeClass(search_btn,"btn-show");
            }
        });
        wrapper.addEventListener("click",function(event){
            if(event.target !== search_btn){
                search.focus();
            }
        })
    }
    function searchSchool(){
        var wrapper = selectorUtil(".input-wr");
        var search = selectorUtil(".search-input input");
        var search_list = selectorUtil(".search-wrapper");
        search.addEventListener("input",function(){
            if(search.value.length != 0){
                $.post(
                    '/school/search',
                    {keyword: search.value},
                    function(res) {
                        res = $.parseJSON(res);
                        schoolList = res.data.school_list;
                        $(".search-down").empty();
                        var len = schoolList.length;
                        for (i = 0; i < len; i++) {
                            li = "<li><a href=\""+schoolList[i].school_url+"\">"+schoolList[i].school_name+"</a></li>";
                            $(".search-down").append(li);
                        }
                    }
                );
                removeClass(search_list,"hidden");
            }else{
                addClass(search_list,"hidden");
            }
        });
        search.addEventListener("propertyChange",function(){
            if(search.value.length != 0){
                removeClass(search_list,"hidden");
            }else{
                addClass(search_list,"hidden");
            }
        });
        wrapper.addEventListener("click",function(event){
            search.focus();
        })
    }

    closeInit();

    var bodyClass = document.body.className;
    if(bodyClass=="topic" || bodyClass=="show"){
        container.style.minHeight = viewHeight-55 + "px";
    }/*else{
        container.style.minHeight = viewHeight-70 + "px";
    }*/

    if(selectorUtil(".big-photos ul")){
        var photos = selectorUtil(".big-photos ul");
        Slider.init();
        Slider.slideOnHand();
        if(selectorUtil("#activities")){
            Slider.autoSlide();
        }
    }

    if(selectorUtil(".search-box")){
        container.style.minHeight = (viewHeight-60) + "px";
        if(selectorUtil(".search-btn")){
            searchInit();
        }
        if(selectorUtil(".search-wrapper")){
            searchSchool();
        }
    }

    if(selectorUtil(".comment-btn")){
        var comment_btn = selectorUtil(".comment-btn");
        var comment_place = selectorUtil(".comment-input");
        comment_btn.addEventListener("click",function(event){
            event.preventDefault();
            event.stopPropagation();
            addClass(this,"hidden2");
            removeClass(comment_place,"hidden");
            selectorUtil(comment_place,"#put-comment").focus();
        });

        comment_place.addEventListener("click",function(event){
            event.stopPropagation();
        });
        container.addEventListener("click",function(){
            addClass(comment_place,"hidden");
            removeClass(comment_btn,"hidden2");
        });
    }

    if(selectorUtil(".buy-btn")){
        var buy_btn = selectorUtil(".buy-btn a");
        var order = selectorUtil("#order-wrapper");
        var order_form = selectorUtil("#order-data");
        var inputs = document.querySelectorAll(".buyer-info input");
        for(var i=0;i<inputs.length;i++){
            inputs[i].addEventListener("focus",function(){
                order_form.style.top = "-100px";
            })
            /*inputs[i].addEventListener("blur",function(){
                order_form.style.top = "";
            })*/
        }

        buy_btn.addEventListener("click",function(event){
            event.preventDefault();
            removeClass(order,"hidden");
        });

        order.addEventListener("click",function(event){
            event.stopPropagation();
            var target = event.target;
            if(target.nodeName!="INPUT" && !hasClass(target,"buyer-info")){
                order_form.style.top = "";
            }
            if(event.target.id == "order-wrapper"){
                addClass(order,"hidden");
            }
        });
    }
    /*itemsRank();*/
})();

function discuss()
{
    var topic_id = $("#topic_id").val();
    var discuss_content = $("#put-comment").val();
    var token = $("#token").val();
    $.post(
        '/mobile/topic/discuss',
        {discuss_content: discuss_content, discuss_topic_id: topic_id, token: token},
        function(res) {
            res = $.parseJSON(res);
            if (res.code == 0) {
                window.location.reload();
            } else {
                alert(res.msg);
            }
        }
    );
}

function comment_show()
{
    var show_id = $("#show_id").val();
    var show_comment_content = $("#put-comment").val();
    $.post(
        '/mobile/show/comment',
        {show_comment_content: show_comment_content, show_id: show_id},
        function(res) {
            res = $.parseJSON(res);
            if (res.code == 0) {
                window.location.reload();
            } else {
                alert(res.msg);
            }
        }
    );
}

function buy()
{
    var name = $("#b-name").val(),
        school = $("#b-school").val(),
        contact = $("#b-contact").val(),
        add = $("#b-add").val(),
        one_id = $("#one_id").val();
    if (!name.trim())
    {
        alert('没有填写姓名哦');
        return;
    }
    if (!school.trim())
    {
        alert('没有填写交易学校哦');
        return;
    }
    if (!contact.trim())
    {
        alert('没有填写联系方式哦');
        return;
    }
    $.post(
        '/mobile/one/buy',
        {name:name, school:school, contact:contact, add:add, one_id:one_id},
        function(res) {
            res = $.parseJSON(res);
            if (res.code != 0) {
                alert(res.msg);
            } else {
                alert('下单成功，卖家之后会联系您的哦');
                window.location.reload();
            }
        }
    )
}