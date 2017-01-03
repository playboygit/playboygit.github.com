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
    var str = element.className;
    if(str){
        var arr = str.split(" ");
        str = "";
        for(var i = 0; i < arr.length; i++){
            if(arr[i] == className){
                arr.splice(i,1);
                continue;
            }
            str += arr[i]+" ";
        }
        element.className = str;
        //alert(str);
    }else{
        return false;
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

function stopBubble(e){
    if (e&&e.stopPropagation){
        e.stopPropagation();
    }else{//for IE
        window.event.cancelBubble = true;
    }
    return false;
}

function stopDefault(e) {
    if ( e && e.preventDefault ){
        e.preventDefault();
    }else{//for IE
        window.event.returnValue = false;
    }
    return false;
}

function addListener(element, eventName, handler){
    if(element){
        if(element.addEventListener){
            element.addEventListener(eventName, handler);
        }else if(element.attachEvent){
            eventName = "on" + eventName;
            element.attachEvent(eventName, handler);
        }else{
            element['on'+eventName]=handler;
        }
    }
}

function removeListener(element, eventName, handler){
    if(element){
        if(element.removeEventListener){
            element.removeEventListener(eventName, handler);
        }else if(element.attachEvent){
            eventName = "on" + eventName;
            element.detachEvent(eventName, handler);
        }else{
            element['on'+eventName] = null;
        }
    }
}

function get_nodes(node, arr, selector){
    if(node.className){
        var tmp = node.className.split(" ");
        for(var i = 0; i < tmp.length; i++){
            if('.' + tmp[i] == selector){
                arr.push(node);
                break;
            }
        }
    }
    if(node.childNodes != null){
        for(var i = 0; i < node.childNodes.length; i++){
            get_nodes(node.childNodes[i], arr, selector);
        }
    }else{
        return false;
    }
}

function X(selector){
    if(typeof selector =="string"){
        var initial = selector.substr(0,1);
        if(initial == "#"){
            return document.getElementById(selector.substr(1));
        }else if(initial == "."){
            if(document.querySelectorAll){
                return document.querySelectorAll(selector);
            }else{
                var i, arr = [],
                    node = document.body;
                //alert(temp[1].id);
                get_nodes(node, arr, selector);
                return arr;
            }
        }else{
            return document.getElementsByTagName(selector);
        }
    }
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