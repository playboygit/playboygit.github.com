function selectorUtil(element,pattern){
    if(document.querySelector){
        if(pattern === undefined){
            return document.querySelector(element);
        }else{
            return element.querySelector(pattern);
        }
    }else{

    }
}

function getParentByClass(element,pattern){
    var parent = element;
    while (parent && !hasClass(parent,pattern)) {
        parent = parent.parentNode;
    }
    if(!parent){
        return false;
    }else{
        return parent;
    }
}

function removeClass(item,className){
    var classNames = item.className.split(/\s+/);
    var pos = -1, i, len;
    for (i=0, len=classNames.length; i < len; i++){
        if (classNames[i] == className){
            pos = i;
            break;
        }
    }
    if(i<len){
        classNames.splice(i,1);
        item.className = classNames.join(" ");
    }
}
function addClass(item,className){
    var classes = item.className;
    if(classes.indexOf(className) > -1) {
        return true;
    }
    if(!classes){
        classes=className;
    }else{
        classes = classes + " " + className;
    }
    item.className = classes;
}
function hasClass(item,className){
    if(item.className.indexOf(className) > -1){
        return true;
    }else{
        return false;
    }
}

function getViewHeight(){
    return document.documentElement.clientHeight || document.body.clientHeight;
}

function closeInit(){
    var closes = document.querySelectorAll(".close a");
    var len = closes.length;
    for(var i=0;i<len;i++){
        closes[i].addEventListener("click",closeContainer);
    }

    function closeContainer(event){
        event.preventDefault();
        var parent = event.target.parentNode;
        while(parent.className != "close"){
            parent = parent.parentNode;
        }
        addClass(parent.parentNode,"hidden");
        addClass(selectorUtil(".container"),"download-hide");
    }
}