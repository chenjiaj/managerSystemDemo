/**
 * Created with JetBrains PhpStorm.
 * Desc:
 * Author: chenjiajun
 * Date: 15-3-4
 * Time: 下午3:10
 */
(function(){
    var monitorDetail = {
        $addInput:$("#add-input"),
        $addbtn:$(".j_add_btn"),
        $attentionform:$("#add-form"),
        $list:$("#add-form .list"),
        $editForm:$("#editmonitor"),
        $saveBtn:$(".save"),
        $managerMark:$('.manager-mark'),
        $pase:$('#editmonitor .pase'),
        init:function(){
            this.bindEvent();
            $.validate();
            this.isShowContab();
        },
        isShowContab:function(){
            var type =  this.$editForm.find(".type:checked");
            if(type.attr("data-value")){
                if(!type.hasClass('hide')){
                    $(".contab").addClass('hide').find('#regular').attr('data-validation','');
                }
            }
        },
        bindEvent:function(){
            var _this = this;
            //切换监控类型
            this.$editForm.find(".type").change(function(){
                var value = $(this).attr("data-value");
                if(value == 0){
                    $(".contab").removeClass('hide').find('#regular').attr('data-validation','custom');
                }else{
                    $(".contab").addClass('hide').find('#regular').attr('data-validation','');
                }
            });

            //切换监控状态
            this.$pase.click(function(){
                 _this.togglePase($(this));
            });

            //保存
            this.$saveBtn.click(function(){
               if(_this.$editForm.isValid() && !IOT.button.isLoading(_this.$saveBtn)){
                   IOT.button.addLoading(_this.$saveBtn,'保存中','loading');
                   $.post('',_this.$editForm.serialize(),function(res){
                       IOT.tips('保存成功','success',2000);
                       IOT.button.removeLoading(_this.$saveBtn,'保存');
                   });//正式请求参数要加上'json'
               }
            });
            //新增关注人
            this.$addInput.bind('keyup',function(){
                _this.keyupToGetList();
            });

            this.$list.on('click','li',function(e){
                e.stopPropagation();
                _this.$addInput.val($(this).text());
                _this.$list.addClass('hide');
            });

            $("body").click(function(){
                _this.$list.addClass('hide');
            });

            this.$addbtn.click(function(){
                _this.addPerson();
            });

            //当鼠标放在关注人上，且此人为项目负责人，显示项目负责人提示
            this.$managerMark.hover(function(){
                var div = '<div class="title"><div class="text">项目负责人</div><div class="img"></div></div>';
                _this.$managerMark.append(div);
            },function(){
                $(".title").remove();
            });
        },
        addPerson:function(){
            var value = this.$addInput.val();
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
        },
        togglePase:function(the){
            var _this = this;
            var mark = the.attr('data-mark');
            var data = {};
            if(mark == 1){
                data.mark = 0;
                var buttonText = '开始监控';
                var successText = '已暂停';
                var errorText = '暂停监控';
            }else{
                data.mark = 1;
                var buttonText = '暂停监控';
                var successText = '监控中';
                var errorText = '开始监控';
            }
            if(!IOT.button.isLoading(_this.$pase)){
                IOT.button.addLoading(_this.$pase,buttonText,'loading');
                $.post('',data,function(res){
                    var result = true;//需修改为动态的
                    if(result){
                        $('.j_monitor_status').text(successText);
                        IOT.button.removeLoading(_this.$pase,buttonText,'');
                        if(mark == 1){//需要设置mark的值，监控中为1，否则为0
                            _this.$pase.attr('data-mark',0);
                        }else{
                            _this.$pase.attr('data-mark',1);
                        }
                    }else{
                        IOT.button.removeLoading(_this.$pase,errorText,'');
                    }
                });//正式请求参数要加上'json'
            }
        },
        keyupToGetList:function(){
            var _this = this;
            var value = $.trim(_this.$addInput.val());
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

    monitorDetail.init();
})();