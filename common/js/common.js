/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-1-16
 * Time: 下午3:08
 */
var IOT = {};
(function(){
    var com = {
        $exit:$(".j_exit"),
        init:function(){
            this.bindEvent();
            this.setWH();
        },
        bindEvent:function(){
            var _this = this;
            //退出系统
            this.$exit.click(function(e){
                e.preventDefault();
                _this.exitSystem();
            });

            //浏览器窗口大小改变时，改变框架宽高
            window.onresize =  function(){
                _this.setWH();
            };

            //siderbar
            $(".siderbar .list>li >a").click(function(){
                _this.siderBar($(this));
            });

            $("#header .time").html(_this.showTime());
        },
        setWH:function(){
            var height = $(window).height() - $("#header").height() - $("#footer").height();
            $(".content").css({
                "min-height":height
            });
            $(".siderbar").css({
                "max-height":height
            });
        },
        siderBar:function(the){
            var _this = the.parent();
            var subUl = $(".siderbar .list>li>ul");
            if(_this.children("ul").hasClass("hide")){
                subUl.slideUp(500).addClass("hide");
                _this.children(".hide").slideDown(800).removeClass("hide");
            }else{
                subUl.slideUp(500).addClass("hide");
            }
        },
        exitSystem:function(){
            var con = confirm("确定退出此账户？");
            if(con){
                window.location.pathname="/index/loginout";
            }
        },
        showTime:function(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var week = date.getDay();
            switch (week){
                case 0: week = "星期日";
                    break;
                case 1: week = "星期一";
                    break;
                case 2: week = "星期二";
                    break;
                case 3: week = "星期三";
                    break;
                case 4: week = "星期四";
                    break;
                case 5: week = "星期五";
                    break;
                case 6: week = "星期六";
                    break;
            }

            return (year + "年" + month + "月" + day + "日" + " " + week);
        }
    }
    com.init();

})();


IOT.button = {
    /**
     * addLoading form提交的时候给按钮加上laoding图标，更改按钮文字为提交状态，给$button打上正在提交的标签
     * @param $button 提交按钮
     * @param buttonContent 提交按钮的innerHTML（不包含图标）
     * @param buttonIcon 提交按钮图标 如果不传此参数则没有提交按钮。 loading：菊花按钮(目前就只有菊花按钮)
     * */
    addLoading: function($button, buttonContent, buttonIcon){
        $button.data('isloading', true);

        buttonContent && ($button.html(buttonContent));

        if(buttonIcon){
            var iconHtml = {
                'loading': '<i class="icon-spin5 animate-spin"></i>'
            };
            if(iconHtml[buttonIcon]){
                $(iconHtml[buttonIcon]).prependTo($button);
            }
        }
    },

    /**
     * removeLoading form提交后取消laoding图标，更改按钮文字为默认状态，取消$button正在提交的标签
     * @param $button 提交按钮
     * @param buttonContent 提交按钮的innerHTML（不包含图标）
     * @param buttonIcon 提交按钮图标 如果不传此参数则没有提交按钮。 loading：菊花按钮(目前就只有菊花按钮)
     * */
    removeLoading: function($button, buttonContent, buttonIcon){
        $button.data('isloading', false);

        buttonContent && ($button.html(buttonContent));

        if(buttonIcon){
            var iconHtml = {
                'loading': '<i class="icon-spin5 animate-spin"></i>'
            };
            if(iconHtml[buttonIcon]){
                $(iconHtml[buttonIcon]).prependTo($button);
            }
        }
    },
    /**
     * isLoading 是否正在提交中
     * @param $button 提交的button
     * */
    isLoading: function($button){
        return $button.data('isloading');
    }
};
