(function(n){function e(e){for(var r,s,u=e[0],a=e[1],l=e[2],d=0,f=[];d<u.length;d++)s=u[d],o[s]&&f.push(o[s][0]),o[s]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(n[r]=a[r]);c&&c(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],r=!0,u=1;u<t.length;u++){var a=t[u];0!==o[a]&&(r=!1)}r&&(i.splice(e--,1),n=s(s.s=t[0]))}return n}var r={},o={app:0},i=[];function s(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=n,s.c=r,s.d=function(n,e,t){s.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},s.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},s.t=function(n,e){if(1&e&&(n=s(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)s.d(t,r,function(e){return n[e]}.bind(null,r));return t},s.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return s.d(e,"a",e),e},s.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},s.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=a;i.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},1058:function(n,e,t){},"56d7":function(n,e,t){"use strict";t.r(e);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"app"}},[t("StyleEditor",{ref:"styleEditor",attrs:{code:n.currentStyle}}),t("ResumeEditor",{ref:"resumeEditor",attrs:{markdown:n.currentMarkdown,enableHtml:n.enableHtml}})],1)},i=[],s=(t("96cf"),t("3b8d")),u=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{ref:"container",staticClass:"styleEditor"},[t("div",{staticClass:"code",domProps:{innerHTML:n._s(n.codeInStyleTag)}}),t("pre",{domProps:{innerHTML:n._s(n.highlightedCode)}})])},a=[],l=t("c197"),c=t.n(l),d={name:"Editor",props:["code"],computed:{highlightedCode:function(){return c.a.highlight(this.code,c.a.languages.css)},codeInStyleTag:function(){return"<style>".concat(this.code,"</style>")}},methods:{goBottom:function(){this.$refs.container.scrollTop=1e5}}},f=d,p=(t("e1a7"),t("2877")),h=Object(p["a"])(f,u,a,!1,null,"45214bfd",null),m=h.exports,g=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{ref:"container",staticClass:"resumeEditor",class:{htmlMode:n.enableHtml}},[n.enableHtml?t("div",{domProps:{innerHTML:n._s(n.result)}}):t("pre",[n._v(n._s(n.result))])])},b=[],v=t("0e54"),y=t.n(v),w={props:["markdown","enableHtml"],name:"ResumeEditor",computed:{result:function(){return this.enableHtml?y()(this.markdown):this.markdown}},methods:{goBottom:function(){this.$refs.container.scrollTop=1e5},goTop:function(){this.$refs.container.scrollTop=0}}},k=w,x=(t("aa46"),Object(p["a"])(k,g,b,!1,null,"a6f05916",null)),E=x.exports,S={name:"app",components:{StyleEditor:m,ResumeEditor:E},data:function(){return{interval:30,currentStyle:"",enableHtml:!1,fullStyle:["/*\n* 大家好，我是兵哥\n* 看完这份简历需要点时间，不要心急\n* 现在就开始做一份酷炫的简历吧！\n*/\n\n/* 首先给所有元素加上过渡效果 */\n* {\n  transition: all .3s;\n}\n/* 白色背景太单调了，加点背景色 */\nhtml {\n  color: rgb(222,222,222); \n  background: rgb(0,43,54);\n}\n/* 文字离边框太近了，加点间距 */\n.styleEditor {\n  padding: .5em;\n  border: 1px solid;\n  margin: .5em;\n  overflow: auto;\n  width: 46vw; height: 90vh;\n  background-color:rgb(16,16,16);\n}\n/* 代码高亮更好看 */\n.token.selector{ color: rgb(133,153,0); }\n.token.property{ color: rgb(187,137,0); }\n.token.punctuation{ color: yellow; }\n.token.function{ color: rgb(42,161,152); }\n\n/* 加点 3D 效果，更高大上 */\nhtml{\n  perspective: 1000px;\n}\n.styleEditor {\n  position: fixed; left: 0; top: 0;\n  -webkit-transition: none;\n  transition: none;\n  -webkit-transform: rotateY(10deg) translateZ(-100px) ;\n          transform: rotateY(10deg) translateZ(-100px) ;\n}\n\n/* 接下来给自己准备一个html编辑器 */\n.resumeEditor{\n  position: fixed; \n  right: 0; \n  top: 0;\n  padding: .5em;  \n  margin: .5em;\n  width: 48vw; \n  height: 90vh;\n  border: 1px solid;\n  background: #f0f4f0; \n  color: #333;\n  overflow: auto;\n}\n/* 接下来就开始写简历内容了 */\n\n","\n/* 给简历加上一点样式，更好看\n*需要先把markdown格式的简历转成HTML格式的\n */\n",'\n/* 再对 HTML 加点样式 */\n.resumeEditor{\n  padding: 2em;\n}\n.resumeEditor h2{\n  display: inline-block;\n  border-bottom: 1px solid;\n  margin: 1em 0 .5em;\n  font-size: 1em;\n}\n.resumeEditor ul,.resumeEditor ol{\n  list-style: none;\n}\n.resumeEditor ul> li::before{\n  content: \'•\';\n  margin-right: .5em;\n}\n.resumeEditor ol {\n  counter-reset: section;\n}\n.resumeEditor ol li::before {\n  counter-increment: section;\n  content: counters(section, ".") " ";\n  margin-right: .5em;\n}\n.resumeEditor blockquote {\n  margin: 1em;\n  padding: .5em;\n  background: #ddd;\n}\n'],currentMarkdown:"",fullMarkdown:"周兵\n----\n\n高级前端工程师，2013年毕业于湖北民族大学计算机系，一直在从事web前端项目的开发;\n\n\n技能\n----\n\n* 前端技术栈(javascript/html5/vue等)开发\n* python 开发\n* java、php、android、node都有一定的熟悉\n\n工作经历\n----\n\n1. [森果](https://senguo.cc)\n2. 北京辰安科技武汉分公司应用研发部\n3. 北京高视远景科技有限公司研发部\n\n链接\n----\n\n* [GitHub](https://github.com/playboygit)\n* [我的博客](https://blog.csdn.net/playboyanta123)\n\n> 如果你喜欢这个效果，Fork [这个项目](https://github.com/playboygit/my-resume)！\n\n"}},created:function(){var n=Object(s["a"])(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,this.makeResume();case 2:this.ajustLink();case 3:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}(),methods:{makeResume:function(){var n=Object(s["a"])(regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,this.progressivelyShowStyle(0);case 2:return n.next=4,this.progressivelyShowResume();case 4:return n.next=6,this.progressivelyShowStyle(1);case 6:return n.next=8,this.showHtml();case 8:return n.next=10,this.progressivelyShowStyle(2);case 10:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}(),showHtml:function(){var n=this;return new Promise(function(e,t){n.enableHtml=!0,e()})},ajustLink:function(){console.log("finished resume");for(var n=document.querySelectorAll("a"),e=0;e<n.length;e++)n[e].setAttribute("target","_blank")},progressivelyShowStyle:function(n){var e=this;return new Promise(function(t,r){var o=e.interval,i=Object(s["a"])(regeneratorRuntime.mark(function e(){var r,s,u,a,l,c=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=this.fullStyle[n],r){e.next=3;break}return e.abrupt("return");case 3:s=this.fullStyle.filter(function(e,t){return t<=n}).map(function(n){return n.length}).reduce(function(n,e){return n+e},0),u=s-r.length,this.currentStyle.length<s?(a=this.currentStyle.length-u,l=r.substring(a,a+1)||" ",this.currentStyle+=l,"\n"===r.substring(a-1,a)&&this.$refs.styleEditor&&this.$nextTick(function(){c.$refs.styleEditor.goBottom()}),setTimeout(i,o)):t();case 6:case"end":return e.stop()}},e,this)})).bind(e);i()})},progressivelyShowResume:function(){var n=this;return new Promise(function(e,t){var r=n.fullMarkdown.length,o=n.interval,i=function t(){if(n.currentMarkdown.length<r){n.currentMarkdown=n.fullMarkdown.substring(0,n.currentMarkdown.length+1);var i=n.currentMarkdown.length,s="";s=i>1?n.currentMarkdown[i-2]:n.currentMarkdown[i-1],"\n"===s&&n.$refs.resumeEditor&&n.$nextTick(function(){return n.$refs.resumeEditor.goBottom()}),setTimeout(t,o)}else e()};i()})}}},M=S,j=(t("846b"),Object(p["a"])(M,o,i,!1,null,"3e3e12e9",null)),_=j.exports;new r["a"]({el:"#app",render:function(n){return n(_)}})},"846b":function(n,e,t){"use strict";var r=t("f7be"),o=t.n(r);o.a},aa46:function(n,e,t){"use strict";var r=t("1058"),o=t.n(r);o.a},e1a7:function(n,e,t){"use strict";var r=t("ed37"),o=t.n(r);o.a},ed37:function(n,e,t){},f7be:function(n,e,t){}});
//# sourceMappingURL=app.b1d3dae8.js.map