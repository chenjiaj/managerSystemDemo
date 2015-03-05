/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-4
 * Time: 上午8:43
 */
(function(){
    var itemDetail = {
        $input:$("#add-input"),
        $btn:$(".j_add_btn"),
        $form:$("#add-form"),
        $list:$("#add-form .list"),
        $managerMark:$('.manager-mark'),
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var _this = this;
            this.$input.bind('keyup',function(){
                _this.keyupToGetList();
            });

            this.$list.on('click','li',function(e){
                e.stopPropagation();
                _this.$input.val($(this).text());
                _this.$list.addClass('hide');
            });

            $("body").click(function(){
                _this.$list.addClass('hide');
            });

            //当鼠标放在关注人上，且此人为项目负责人，显示项目负责人提示
            this.$managerMark.hover(function(){
                var div = '<div class="title"><div class="text">项目负责人</div><div class="img"></div></div>';
                _this.$managerMark.append(div);
            },function(){
                $(".title").remove();
            });

            //新增关注人
            this.$btn.click(function(){
                var value = _this.$input.val();
                if(value){
                    $.post('',{
                        personal:value
                    },function(res){
                        var result = true;
                        if(result){
                            IOT.tips('关注成功！','success',2000);
                        }else{
                            IOT.tips('关注失败','error',2000);
                        }
                    });//正式请求参数要加上'json'
                }else{
                    IOT.tips('请输入关注人名称','warning',2000);
                }
            });
        },
        keyupToGetList:function(){
            var _this = this;
            var value = $.trim(_this.$input.val());
            if(value){
                $.get('',{
                    personal:value
                },function(res){
                    var list = ['张展','李孟君','张展','张展','张展','张展','李孟君','张展','张展','张展','张展','李孟君','张展','张展','张展'];
                    var lis = '';
                    if(list.length>0){
                        _this.$list.removeClass('hide');
                        for(var i = 0; i<list.length;i++){
                            lis += '<li>' + list[i] + '</li>';

                        }
                        _this.$list.html(lis);
                    }
                });
            }
        }
    };

    itemDetail.init();
})();
