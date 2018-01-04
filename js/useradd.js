layui.use(['form','layer'], function(){
    form = layui.form;
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $ = layui.jquery;
	form.render();
});
var found,codeNum,timestamp,key=null,hash,key;
/* 请求接口填充TAB */
var SysAuthorit=function(){
	ajax("getSysAuthorityssyssuthorityapi","GET",'',"JSON",function(data){
		if(data.code==10000){
			var data=data.data;
			var Option='<div class="OptionBtn">'+
		  		'<div><a href="javascript:;" class="layui-btn addLeft" onclick="addLeft(this)" ><i class="layui-icon">&#xe602;</i></a></div>'+
		  		'<div><a href="javascript:;" class="layui-btn addAll" onclick="addAll(this)"><i class="layui-icon">&#xe65b;</i></a></div>'+
		  		'<div><a href="javascript:;" class="layui-btn deleteRight" flag="deleteRight" onclick="deleteRight(this)"><i class="layui-icon">&#xe603;</i></a></div>'+
		  		'<div><a href="javascript:;" class="layui-btn deleteAll" onclick="deleteAll(this)"><i class="layui-icon">&#xe65a;</i></a></div>'+
		  	    '</div>';
			for(var i in data){
				$("#SysAuthorit").append('<li class="" code="'+data[i].code+'">'+data[i].rolename+'</li>');
				$("#SysAuthoritBody").append('<div class="layui-tab-item layui-input-block select-box" id="SysAuthoritCon'+[i]+'"><ul class="Sys" name=SysAuthoritCon'+[i]+'></ul>'+Option+'<ul class="Sysoverder"></ul></div>')
				$("#SysAuthorit>li").eq(0).addClass("layui-this");
				$("#SysAuthoritBody>div").eq(0).addClass("layui-show");
				for(var j in data[i].children){
					$("#SysAuthoritCon"+i).find('.Sys').append('<li code='+data[i].children[j].code+'>'+data[i].children[j].rolename+'</li>')
				}
				$("#SysAuthoritCon"+i).on("click","li",function(){
					$(this).addClass("clickCode").siblings().removeClass('clickCode');
				});
				$(".Sysoverder").on("click","li",function(){
					$(this).addClass("deleteCode").siblings().removeClass('deleteCode');
				})
			}
		}
		
	})
};

/* 逐个添加 */
var addLeft=function(obj){
	var val=$(obj).parents('.OptionBtn').siblings(".Sys").find(".clickCode").html();
	var div=$(obj).parents('.OptionBtn').siblings(".Sys").find(".clickCode");
	var code=$(obj).parents('.OptionBtn').siblings(".Sys").find(".clickCode").attr('code');
	if(val!=undefined){
		$("#SysAuthoritInput").append('<a href="javascript:;" code="'+code+'" onclick="deleteThis(this)"><span>'+val+'</span> &nbsp;<i class="layui-icon">&#x1006;</i></a>');
		$(obj).parents('.OptionBtn').siblings(".Sysoverder").append('<li code='+code+' >'+val+'</li>');
		div.remove();
	}else{
		layer.msg("未选中权限")
	}
	
}

/* 批量添加 */
var addAll=function(obj){
	var div=$(obj).parents('.OptionBtn').siblings(".Sys");
	var val=$(obj).parents('.OptionBtn').siblings(".Sys").html();
	if(val!=undefined){
		for(var i=0;i<$(obj).parents('.OptionBtn').siblings(".Sys").find('li').length;i++){
			$("#SysAuthoritInput").append('<a href="javascript:;" code="'+$(obj).parents('.OptionBtn').siblings(".Sys").find('li').eq(i).attr("code")+'" onclick="deleteThis(this)"><span>'+$(obj).parents('.OptionBtn').siblings(".Sys").find('li').eq(i).html()+'</span> &nbsp;<i class="layui-icon">&#x1006;</i></a>');	
		}
		$(obj).parents('.OptionBtn').siblings(".Sysoverder").append(val);
		div.empty();
	}else{
		layer.msg("没有可添加项")
	}
}

/* 逐个删除 */
var deleteRight=function(obj){
	var val=$(obj).parents('.OptionBtn').siblings(".Sysoverder").find(".deleteCode").html();
	var div=$(obj).parents('.OptionBtn').siblings(".Sysoverder").find(".deleteCode");
	var code=$(obj).parents('.OptionBtn').siblings(".Sysoverder").find(".deleteCode").attr('code');
	if($(obj).attr("flag")=='deleteRight'){
		if(val!=undefined){
			$(obj).parents('.OptionBtn').siblings(".Sys").append('<li code='+code+' >'+val+'</li>');
			for(var i=0;i<$("#SysAuthoritInput>a").length;i++){
				if($("#SysAuthoritInput>a").eq(i).attr("code")==code){
					$("#SysAuthoritInput>a").eq(i).remove()
				}
			}
			div.remove();
		}else{
			layer.msg("未选中权限")
		}
	}
}

/* 删除本身 */
var deleteThis=function(obj){
	var code=$(obj).attr("code");
	var val=$(obj).find("span").html();
	for(var i=0;i<$("#SysAuthoritBody").find(".Sysoverder").find("li").length;i++){
		if($(obj).attr("code")==$("#SysAuthoritBody").find(".Sysoverder").find("li").eq(i).attr("code")){
			$("#SysAuthoritBody").find(".Sysoverder").find("li").eq(i).parents(".Sysoverder").siblings(".Sys").append('<li code="'+code+'">'+val+'</li>');
			$("#SysAuthoritBody").find(".Sysoverder").find("li").eq(i).remove();
			$(obj).remove();
		}
	}
}
/* 批量删除 */
var deleteAll=function(obj){
	var div=$(obj).parents('.OptionBtn').siblings(".Sysoverder");
	var val=$(obj).parents('.OptionBtn').siblings(".Sysoverder").html();
	var arr = [],arrval=[];
	if(val!=undefined){
		$(obj).parents('.OptionBtn').siblings(".Sys").append(val);
		div.empty();
		for(var i=0;i<$("#SysAuthoritBody").find(".Sysoverder").find("li").length;i++){
			arr.push($("#SysAuthoritBody").find(".Sysoverder").find("li").eq(i).attr("code"));
			arrval.push($("#SysAuthoritBody").find(".Sysoverder").find("li").eq(i).text());
		}
		$("#SysAuthoritInput").empty();
		for(var i in arrval){
			$("#SysAuthoritInput").append('<a href="javascript:;" code="'+arr[i]+'" onclick="deleteThis(this)"><span>'+arrval[i]+'</span> &nbsp;<i class="layui-icon">&#x1006;</i></a>');
		}
	}else{
		layer.msg("没有可移除项")
	}
}
$("#sexBody").on("click",".layui-form-radio",function(){
	$(this).siblings("input").attr('checked',false)
	$(this).prev().attr('checked',true)
})
/* 提交事件 */
var submit=function(){
	if(!testPhone($('#phone').val())){
		layer.msg("手机号码格式错误");
		return false;
	}else{
		pasword=$("#password").val()
		
		/* 性别 和 权限 */
		var sex,code=[];
		/* 性别循环取值	*/
		$(".sex").each(function(){
			if($(this).attr("checked")){
				sex=$(this).val();
			};
		});
		/* 权限循环取值 */
	    for(var i in $("#SysAuthoritInput>a")){
	    	if($("#SysAuthoritInput>a").eq(i).attr("code")!=undefined){
	    	 code.push($("#SysAuthoritInput>a").eq(i).attr("code"))	;
	    	};
	    };
	    code=JSON.stringify(code);
	    code=code.replace(/\[|]/g,'');
	  	code=code.replace(/\"/g, "");
		var json={
			zh:$("#user").val(),
			wx:$("#wechat").val(),
			xm:$("#name").val(),
			xb:sex,
			bm:$("#department").val(),
			lxdh:$("#phone").val(),
			xtqx:code,
			czr:localStorage.userID
		};
		if(found!=undefined){
			json.cjrq=found;
			json.xtbh=codeNum;
		}
		if(sessionStorage.xtbh!=undefined){
			if(pasword!=$("#password").attr('data-code')){
				hash=encryptCode(pasword,key,timestamp);
				json.mm=hash;
			}
			ajax("updateUserusersapi",'POST',{userSJson:JSON.stringify(json),datetime:timestamp},"JSON",function(data){
				if(data.code==10000){
					layer.msg('保存成功', {icon: 1});
					parent.layer.closeAll();
				};
			});
		}else{
			hash=encryptCode(pasword,key,timestamp);
			json.mm=hash;
			ajax("adminAddUserusersapi",'POST',{userSJson:JSON.stringify(json),datetime:timestamp},"JSON",function(data){
				if(data.code==10000){
					layer.msg("保存成功", {icon: 1});
					parent.layer.closeAll();
				};
			});
		}
	}
	
}
layui.use('element', function(){
  var element = layui.element;
});
$(document).ready(function(){
	timestamp=new Date().getTime();
	ajax('getKeyusersapi','POST',{key:timestamp},'json',function(data){
		if(data.code != 10000){	
			layer.msg(data.msg);
		}else{
			var data=data.data;
			key=data.key;
		};
	});
	SysAuthorit();
	if(sessionStorage.xtbh!=undefined){
		var code=sessionStorage.xtbh;
		ajax("queryOneUserusersapi","POST",{xtbh:code},"JSON",function(data){
			if(data.code==10000){
				data=data.data;
				found=data.cjrq;
				codeNum=data.xtbh;
				$("#user").val(data.zh);
				$("#password").val(data.mm);
				$("#password").attr("data-code",data.mm)
				$("#wechat").val(data.wx);
				$("#name").val(data.xm);
				$("#department").val(data.bm);
				$("#phone").val(data.lxdh);
				$(".sex").each(function(){
					if(data.xb!=$(this).val()){
						$(this).attr('checked',false);
						$(this).next().removeClass("layui-form-radioed");
						$(this).next().find("i").html('&#xe63f;');
					}else if(data.xb==$(this).val()){
						$(this).attr('checked',true);
						$(this).next().addClass("layui-form-radioed");
						$(this).next().find("i").html('&#xe643;');
	
					}
				})
				/* 获取系统权限 */
				var sys="["+JSON.stringify(data.xtqx)+"]";
				sys=JSON.parse(sys.replace(/,/g,'","'))
				var arrey=[],arreyval=[];
				$("#SysAuthoritBody").find(".Sys").find("li").each(function(i){
					for(var i in sys){
						if(sys[i]==$(this).attr("code")){
							arrey.push($(this).attr("code"));
							arreyval.push($(this).html());
							$(this).parents('.Sys').siblings('.Sysoverder').append('<li code='+$(this).attr('code')+'>'+$(this).html()+'</li>');
							$(this).remove();
						}
					}
				});
				for(var i in arrey){
					$("#SysAuthoritInput").append('<a href="javascript:;" code="'+arrey[i]+'" onclick="deleteThis(this)"><span>'+arreyval[i]+'</span> &nbsp;<i class="layui-icon">&#x1006;</i></a>');
				}
			}
		});
	};
});
var Reset=function(){
	parent.layer.closeAll();
}