
/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-3
 * Time: 下午3:51
 */
(function(){
    var additem = {
        $form:$("#additem"),
        $subBtn:$(".addBtn"),
        init:function(){
            this.bindEvent();
            $.validate();
        },
        bindEvent:function(){
            var _this = this;
            this.$subBtn.click(function(e){
                e.preventDefault();
                if(_this.$form.isValid() && !IOT.button.isLoading(_this.$subBtn)){
                    IOT.button.addLoading(_this.$subBtn,'保存中','loading');
                    _this.$form.submit();
                }
            });
        }
    };
    additem.init();
})();