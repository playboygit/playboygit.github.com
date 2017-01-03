 (function(){
     var rank,
         cur = "0",
         now = "0";
     rank = $(".rank-by");

//     function switchRank(el) {
//         var to = $(el).data("rank");
//         if(to == cur) return;
//         !(cur == now) && $(rank).removeClass("cur" + cur);
//         cur = to;
//         $(rank).addClass("cur" + cur);
//     }
//
//     $(".rank-title-wr").on("mouseover", ".rank-title", function(e) {
//         switchRank(e.currentTarget);
//     });
//     $(rank).on("mouseleave", function(e) {
//         if(cur != now) {
//             $(rank).removeClass("cur" + cur);
//             $(rank).addClass("cur" + now);
//         }
//         cur = now;
//     });
     now = cur = $(rank).data("cur");
     $(rank).addClass("cur" + now);
 })();