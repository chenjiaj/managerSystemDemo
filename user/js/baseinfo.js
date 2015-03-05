/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-5
 * Time: 下午3:06
 */
(function(){
    var baseInfo = {
        $form:$("#baseInfo"),
        $saveBtn:$('.j_saveBtn'),
        init:function(){
            this.bindEvent();
            $.validate();
        },
        bindEvent:function(){
            var _this = this;
            this.$saveBtn.click(function(){
                _this.submitForm();
            });
        },
        submitForm:function(){
            var _this = this;
            if(this.$form.isValid() && !IOT.button.isLoading(this.$saveBtn)){
                $.post('',_this.$form.serialize(),function(res){
                    //if(res.code == 0){//正式请求取消注释
                        IOT.tips('修改成功','success',2000);
                    // }else{
                    // IOT.tips('修改失败','error',2000);
                    // }
                    IOT.button.removeLoading(_this.$saveBtn);
                });//正式请求参数要加上'json'
            }
        }
    }
    baseInfo.init();
})();
