/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-5
 * Time: 下午3:27
 */
(function(){
    var modfiyPass = {
        $form:$('#modifypass'),
        $saveBtn:$('.saveBtn'),
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
            if(_this.$form.isValid() && !IOT.button.isLoading(_this.$saveBtn)){
                $.post('',_this.$form.serialize(),function(res){
                    //if(res.code == 0){//正式请求取消注释
                        IOT.tips('修改成功','success',2000);
                    // }else if(res.code = 1){
                      //IOT.tips('原密码错误','error',2000);
                    // }else{
                    // IOT.tips('修改失败','error',2000);
                    // }
                    IOT.button.removeLoading(_this.$saveBtn);
                });//正式请求参数要加上'json'
            }
        }
    };
    modfiyPass.init();
})();