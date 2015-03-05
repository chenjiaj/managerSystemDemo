/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-4
 * Time: 下午2:45
 */
(function(){
    var monitor = {
        $attention:$(".attention"),
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var _this = this;
            this.$attention.click(function(e){
                e.preventDefault();
                _this.addAttention($(this));
            });
        },
        addAttention:function(the){
            var id = the.closest('tr').attr("data-id");
            $.post('',{
                id:id
            },function(res){
                var result = true;
                if(result){
                    IOT.tips('关注成功','success',2000);
                }else{
                    IOT.tips('关注失败','error',2000);
                }
            });//正式请求参数要加上'json'
        }
    };
    monitor.init();
})();