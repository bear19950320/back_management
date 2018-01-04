var key=null;
var timestamp;
layui.use('element', function() {
	var $ = layui.jquery,
		element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
	//触发事件
	var active = {
		tabAdd: function() {
			//新增一个Tab项
			element.tabAdd('demo', {
				title: $(this).text(),
				content: '<iframe name="' + $(this).attr("name") + '" src="../' + $(this).attr("name") + '/' + $(this).attr("name") + '.html" frameborder="0" style="width: 100%;height:100%"></iframe>',
				id: $(this).attr("name")
			})
		}
	};

	$('.site-demo-active').on('click', function() {
		$(this).parent("li").addClass("layui-this").siblings("li").removeClass('layui-this')
		var othis = $(this),
			type = othis.data('type'),
		    urlName = othis.data('url'),
			flag = 0;

		for(var i = 0; i < $(".tab-title>li").length; i++) {
			if(urlName != $(".tab-title>li").eq(i).attr('lay-id')) {
				flag = 1;
			} else if(urlName == $(".tab-title>li").eq(i).attr('lay-id')) {
				$(".tab-title>li").eq(i).trigger("click");
				return false;
			};
		};
		if(flag == 1) {
			active[type] ? active[type].call(this, othis) : '';
			$(".tab-title>li").each(function() {
				if(urlName == $(this).attr("lay-id")) {
					$(this).trigger("click");
				};
			});
		};

	});

});
function lock(){
	if(localStorage.lock==undefined){
		layer.open({
		  type: 1,
		  title: "设置锁屏密码",
		  closeBtn: 0,
		  shadeClose: false,
		  skin: 'yourclass',
		  shade: [1, '#26645e'],
		  Boolean:false,
		  move: false,
		  content: '<div style="text-align:center;"><img style="width:50px;height:50px;margin-right: 10px;border-radius: 50%;" src="'+$("#user-img").attr("src")+'" /></div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:10px;">'+$("#user-name").text()+'</div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:30px;" class="layui-form"><div style="width: 80%;margin: auto;" class="layui-form-item"><label class="layui-form-label" style="text-align:center;width:100px;font-size:12px;">设置密码</label> <div class="layui-input-inline" style="margin-right:0;"><input type="text" class="layui-input" id="fit"></div><label class="layui-form-label" style="text-align:left;padding:0;"><button class="layui-btn layui-btn-danger" onclick="filpasword()">设置密码</button></label></div></div>',
		  area:['500px', '300px']
		}); 
	}else{
		localStorage.lockStop=true;
		layer.open({
		  type: 1,
		  title: "锁屏",
		  closeBtn: 0,
		  shadeClose: false,
		  skin: 'yourclass',
		  shade: [1, '#26645e'],
		  Boolean:false,
		  move: false,
		  content: '<div style="text-align:center;"><img style="width:50px;height:50px;margin-right: 10px;border-radius: 50%;" src="'+$("#user-img").attr("src")+'" /></div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:10px;">'+$("#user-name").text()+'</div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:30px;" class="layui-form"><div style="width: 80%;margin: auto;" class="layui-form-item"><label class="layui-form-label" style="text-align:center;"><i class="iconfont icon-suoding"></i></label> <div class="layui-input-inline" style="margin-right:0;"><input type="text" class="layui-input Unlocker"></div> <label class="layui-form-label" style="text-align:left;padding:0;"><button class="layui-btn layui-btn-danger" onclick="Unlock()">解锁</button></label></div></div>',
		  area:['500px', '300px']
		}); 
	}
}
var loginOut=function(){
	ajax("loginOutusersapi",'POST','','JSON',function(data){
		if(data.code==10000){
			location.href="../../index.html";
		}
	})
}
$(document).ready(function(){
	$("#admin-name").text(localStorage.userName)
//	menuTreer()/
	lockStop();
})
localStorage.addUser=false;
var menuTreer=function(){
	var userID=localStorage.userID;
	ajax("menuTreeusersapi","POST",{xtbh:userID},"JSON",function(data){
		if(data.code==10000){
			data=data.data;
			var menu=''
			for(var i in data){
				menu+='<li class="layui-nav-item"><a href="javascript:;">'+data[i].parentName+'</a></li><div  id="layui'+[i]+'">'+[i]+'</div>';
				for(var j in data[i].children){
//					console.log("----"+$("#layui"+[i]).html())
					if(data[i].children[j].code==100002){
						localStorage.addUser=true;
					}
					console.log(data[i].children[j].qxmc)
				}
			}
			console.log(12)
			console.log(menu)
			$("#menuTree").append(menu);
		}
	})
}

var modify=function(){
    timestamp=new Date().getTime();
	ajax('getKeyusersapi','POST',{key:timestamp},'json',function(data){
		if(data.code != 10000){	
			layer.msg(data.msg);
		}else{
			var data=data.data;
			key=data.key;
		};
	});
	layer.open({
		  type: 1,
		  title: "修改登陆密码",
		  closeBtn: 1,
		  shadeClose: false,
		  skin: 'yourclass',
		  shade: [1, '#26645e'],
		  Boolean:false,
		  move: false,
		  content: '<div style="text-align:center;"><img style="width:50px;height:50px;margin-right: 10px;border-radius: 50%;" src="'+$("#user-img").attr("src")+'" /></div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:10px;">'+$("#user-name").text()+'</div>'+
		  '<div style="text-align:center;font-size:22px;margin-top:30px;" class="layui-form"><div style="width: 80%;margin: auto;" class="layui-form-item"><label class="layui-form-label" style="text-align:center;"><i class="iconfont icon-suoding"></i></label> <div class="layui-input-inline" style="margin-right:0;"><input type="text" class="layui-input" id="passwordCode"></div> <label class="layui-form-label" style="text-align:left;padding:0;"><button class="layui-btn layui-btn-danger" onclick="modifyPas()">修改密码</button></label></div></div>',
		  area:['500px', '300px']
		});
}
var modifyPas=function(){
		//把字符串转为json对象    
	var hash,pasword,userName=localStorage.userAdmin;
	pasword=$("#passwordCode").val();
	hash=encryptCode(pasword,key,timestamp)
	modifyPasCode(hash,timestamp,userName);
}
