$(document).ready(function(){
	var id=sessionStorage.id;
	ajax("getProduceInfoproducesysapi","POST",{ggbh:id},"JSON",function(data){
		if(data.code==10000){
			var data=data.data;
			/* 填充横屏竖屏val */
			if(data.pmxz==0){
				data.pmxz="横屏";
			}else if(data.pmxz==1){
				data.pmxz="竖屏";
			};
			/* 填充广告类型val */
			if(data.gglx==0){
				data.gglx="图文";
			}else if(data.gglx==1){
				data.gglx="视频";
			}else if(data.gglx==2){
				data.gglx="公告";
			}else if(data.gglx==3){
				data.gglx="消息";
			};
			/* 填充审核状态val */
			if(data.shzt==0){
				data.shzt='未提交';
			}else if(data.shzt==1){
				data.shzt='审核中';
			}else if(data.shzt==2){
				data.shzt='未通过';
			}else if(data.shzt==3){
				data.shzt='已通过';
			};
			/* 填充审核类型val */
			if(data.shlx==0){
				data.shlx='普通';
			}else if(data.shlx==1){
				data.shlx='加急';
			}
			if(data.qxrq==undefined){
				data.qxrq="暂未修改"
			}
			$("body").append('<div class="layui-form" id="layuiForm" style="width:50%;float:left;">'+
			   '<div class="layui-form-item">'+
				   '<label class="layui-form-label">广告编号</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="ggbh" autocomplete="off" value="'+data.ggbh+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label" style="width: 100px;">广告主编号</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.ggz+'" disabled/>'+
				    '</div>'+
				    '<div class="layui-form-mid layui-word-aux">用户</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">广告名称</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.ggmc+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">行业父类</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.hyflx+'" disabled/>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">行业子类</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.hyzlx+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">广告内容</label>'+
				    '<div class="layui-input-inline hidden">'+
				      '<div class="hidden" id="content">'+data.nr+'</div>'+
				    '</div>'+
				    '<div class="layui-form-mid layui-word-aux">'+
				    	'<button onclick="seeContent()" class="layui-btn layui-btn-small layui-btn-danger" id="seeContent">查看内容</button>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">屏幕形状</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="pmxz" autocomplete="off" value="'+data.pmxz+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">广告类型</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.gglx+'" disabled/>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">修改日期</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.qxrq+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">创建日期</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.cjrq+'" disabled/>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">审核状态</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.shzt+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">审核类型</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.shlx+'" disabled/>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">审核日期</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.shrq+'" disabled/>'+
				    '</div>'+
				    '<label class="layui-form-label">缩略图</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" class="layui-input" id="" autocomplete="off" value="'+data.slt+'" disabled/>'+
				    '</div>'+
			    '</div>'+
			    '<div class="layui-form-item">'+
				    '<label class="layui-form-label">审核说明</label>'+
				    '<div class="layui-input-inline">'+
				      '<input type="text" name="" placeholder="请给予说明" class="layui-input" id="explain" autocomplete="off" value="'+data.shsm+'"  />'+
				    '</div>'+
				    '<label class="layui-form-label hidden">资源地址</label>'+
				    '<div class="layui-input-inline hidden">'+
				      '<input type="text" name="" class="layui-input" id="dataUrl" autocomplete="off" value="'+data.url+'" disabled/>'+
				    '</div>'+
			    '</div>'+
				'<div class="layui-form-item adOperation" id="adOperation">'+
				    '<div class="layui-input-inline">'+
				      '<button class="layui-btn" lay-submit lay-filter="formDemo" onclick="examine(this)" id="adopt">通过</button>'+
				    '</div>'+
				    '<div class="layui-input-inline">'+
				      '<button type="reset" class="layui-btn layui-btn-primary" onclick="examine(this)" id="notadopt">驳回</button>'+
				    '</div>'+
				'</div>'+	
			'</div><div id="contentDiv" style="width:50%;height:'+$(window).height()+'px;"></div>')
		}	    
	})

})
function seeContent(){
	var data=document.getElementById('content').innerHTML,_url=$("#dataUrl").val(),pmxz=$("#pmxz").val();
	var	dataDemo=JSON.parse(data);
	if(dataDemo=="undefined"){
		layer.msg("内容为空");
	}else{
		if(dataDemo.video!=null){
		 	if(pmxz=="横屏"){
		 		area=['100%',"80%","10% 0"];
		 		video(_url,data,area);
		 	}else if(pmxz=="竖屏"){
		 		area=["60%","100%","0 20%"];
		 		video(_url,data,area);
		 	};
		 	
		}else{
			if(pmxz=="横屏"){
		 		area=['100%',"80%","10% 0"];
		 		imgdemo(_url,data,area);
		 	}else if(pmxz=="竖屏"){
		 		area=["60%","100%","0 20%"];
		 		imgdemo(_url,data,area);
		 	};
		}
	};
}
function video(_url,_src,area){
	$("#contentDiv").empty();
	var data=JSON.parse(_src);
	$("#contentDiv").append('<div id="videoDiv" style="width:'+area[0]+';height:'+area[1]+';margin:'+area[2]+';"><video id="audio_id" src="'+_url+data.video+'" autoplay="autoplay" style="width: 100%;height: 100%;object-fit:fill"></video><img src="'+_url+data.QRcode+'"/><marquee direction=left behavior=scroll  scrollamount=1 scrolldelay=10 align=top bgcolor=#ffffff height=26 width=100% hspace=20 vspace=10 onmouseover=this.stop() onmouseout=this.start()> '+data.text+' </marquee></div>');		
};
function imgdemo(_url,_src,area){
	$("#contentDiv").empty();
	$("#contentDiv").append('<div class="swiper-container" style="width:'+area[0]+';height:'+area[1]+';margin:'+area[2]+';"><div class="swiper-wrapper" id="swiper-wrapper"></div></div>');
//	_src=_src.replace(/[\\]/g,'');
	
	var data=JSON.parse(_src);
	
	if(data.content!=undefined){
		data=data;
	}else{
		data=JSON.parse(data)
	}
	for(var i = 0; i < data.content.length; i++) {
		$("#swiper-wrapper").append('<div class="swiper-slide">\
					<ul id="" class="editor-ul editor-ul' + i + '" num=' + i + '>\
						<span class="layui-badge">第' + (i + 1) + '页</span>\
					</ul>\
				</div>');
		/* 二次循环 */
		for(var j = 0; j < data.content[i].length; j++) {
			console.log(data.content[i][j].zIndex)
			if(data.content[i][j].top==undefined){
				data.content[i][j].top="1px";
			}
			if(data.content[i][j].left==undefined){
				data.content[i][j].left="1px";
			}
			$(".editor-ul" + i).attr("style", data.content[i][j].style);
			if(data.content[i][j].Class == "text") {
				console.log("Zindex:"+data.content[i][j].zIndex)
				/* 文字层级 */
				$(".editor-ul" + i).append('<li style="top:'+data.content[i][j].top+';left:'+data.content[i][j].left+';z-index:'+data.content[i][j].zIndex+';width:'+data.content[i][j].Width+';height:'+data.content[i][j].Height+';text-align:center">' + data.content[i][j].content + '</li>');
			} else {
				/* 图片层级 */
				$(".editor-ul" + i).append('<li style="top:'+data.content[i][j].top+';left:'+data.content[i][j].left+';z-index:'+data.content[i][j].zIndex+';width:'+data.content[i][j].Width+';height:'+data.content[i][j].Height+'"><img style="width:100%;height:100%" src="'+localStorage.imgUrl + data.content[i][j].img + '" url="'+ data.content[i][j].img +'"></li>');
			}
		}
	}
	var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    autoplay:1500
		  });
}
var examine=function(obj){
	var data;
	if(obj.id=='adopt'){
		var data={
			ggbh:$("#ggbh").val(),
			shsm:$("#explain").val(),
			shzt:3
		}
		
	}else if(obj.id=='notadopt'){
		var data={
			ggbh:$("#ggbh").val(),
			shsm:$("#explain").val(),
			shzt:2
		}
	}
	ajax("auditProduceproducesysapi","POST",data,"JSON",function(data){
		if(data.code==10000){
			layer.msg("审核结果已提交");
			parent.layer.closeAll();
		}
	})
}
