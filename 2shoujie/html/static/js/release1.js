(function() {

    var catSelect = function() {
        var sel = $(".goods-cat .select"),
            input = $("#cat"),
            state = 0;// 1=isshowing, 0=hidden,
        function showIn() {
            if(state === 1) {
                return ;
            }
            var that = this;
            state = 1;
//            console.log(sel)
            $(sel).fadeIn("fast");
            $(sel).one("click", "li span", function() {
                var value = $(this).text();
                $(".goods-cat .form-input-wr span").text( value );
                $(input).val(value);
                that.hide();
            });
        }

        function hideOut() {
            if(state === 0) {
                return ;
            }
            state = 0;
            $(sel).fadeOut("fast");
        }

        function bindShow() {
            var that = this;
            $(".goods-cat .form-input-wr span").on("click", function() {
                that.show();
            });
        }
        return {
            show: showIn,
            hide: hideOut,
            bind: bindShow
        };
    }();

    var discount = function() {
        var dis = $(".goods-discount .form-input-wr"),
            input = $("#discount"),
            nowVal = "no";

        function _value(value) {
            $(input).val(value);
        }

        function _selThis(dom) {
            var val = $(dom).data("value");
            if(val === nowVal) return ;
            _value(val);
            $(dis).children("." + nowVal).removeClass("sel");
            nowVal = val;
            $(dis).children("." + nowVal).addClass("sel");
        }

        function bindSel() {
            var that = this;
            $(dis).on("click", "span", function() {
                _selThis(this);
            });
        }

        return {
            bind: bindSel
        };
    }();

    catSelect.bind();
    discount.bind();
    var inputs = $("input, textarea");
    $(inputs).on("focus", function() {
        $(this).parent(".form-input-wr").addClass("focus");
    });
    $(inputs).on("blur", function() {
        $(this).parent(".form-input-wr").removeClass("focus");
    });
})();
