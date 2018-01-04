 	/*  加载layer弹框JS与CSS  */
 	document.write('<link rel="stylesheet" type="text/css" href="../../main/layer/mobile/need/layer.css" />');
 	document.write('<script src="../../main/layer/layer.js" type="text/javascript" charset="utf-8"></script>');
 	/* 公共请求地址 */
 	window.urlTest = 'http://www.pphdcm.com/pphd/';
 	/* --AJAX--(地址,请求类型,data传参,json的type类型,方法) */
 	let ajax = function(url, type, data, json, callback) {
 		$.ajax({
 			url: urlTest + url,
 			type: type,
 			data: data,
 			timeout: 10000,
 			dataType: json,
 			beforeSend: function(XMLHttpRequest) {
 				// 请求接口--Start--添加--loading--的动态图标 
 				layer.load();
 			},
 			success: function(response) {
 				/* data赋值  */
 				credit = response
 				// 方法的回调
 				callback(credit);
 			},
 			complete: function(XMLHttpRequest, textStatus) {
 				layer.closeAll('loading');
 			},
 			error: function() {
 				layer.msg("服务器出差");
 			}
 		});
 	}
 	/*---------------------------页面点击相互跳转-------------------------------*/
 	/* 页面跳转点击事件 */
 	function btnClick(obj) {

 		var id = $(obj).attr("name");

 		location.href = '../' + id + '/' + id + '.html';

 		$("#" + id).addClass("activer").siblings().removeClass('activer');
 	}
 	/* 首页点击  */
 	function GetQueryString(name) {
 		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
 		var r = location.search.substr(1).match(reg);
 		if(r != null) return unescape(decodeURI(r[2]));
 		return null;
 	}
 	var lockStop=function(){
 		console.log(localStorage.lockStop=='true')
		if(localStorage.lockStop=='true'){
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
			  '<div style="text-align:center;font-size:22px;margin-top:30px;" class="layui-form"><div style="width: 80%;margin: auto;" class="layui-form-item"><label class="layui-form-label" style="text-align:center;"><i class="iconfont icon-suoding"></i></label> <div class="layui-input-inline" style="margin-right:0;"><input type="text"  class="layui-input Unlocker" ></div> <label class="layui-form-label" style="text-align:left;padding:0;"><button class="layui-btn layui-btn-danger" onclick="Unlock()">解锁</button></label></div></div>',
			  area:['500px', '300px']
			});
		}else{
			parent.layer.closeAll();
		}
	}
 	var login = function(hash, timestamp, user) {
 		var data = {
 			mm: hash,
 			datetime: timestamp,
 			zh: user
 		};
 		ajax('loginusersapi', 'POST', data, 'json', function(data) {
 			if(data.code != 10000) {
 				if(data.code == 10004) {
 					layer.msg("账号/密码错误");
 				} else {
 					layer.msg(data.msg);
 				}
 			} else {
 				var data = data.data;
 				localStorage.userID = data.xtbh;
 				localStorage.userPower = data.xtqx;
 				localStorage.userPhone = data.lxdh;
 				localStorage.userAdmin = data.zh;
 				localStorage.userDepartment = data.bm;
 				localStorage.userName = data.xm;
 				localStorage.userSex = data.xb;
 				localStorage.userOperator = data.czr;
 				location.href = "./build/home/home.html";
 			};
 		});
 	}
 	var modifyPasCode = function(hash, timestamp, user) {
 		var data = {
 			mm: hash,
 			datetime: timestamp,
 			zh: user
 		};
 		console.log(data);
 		ajax('adminUpdatePasswordusersapi', "POST", data, "JSON", function(data) {
 			if(data.code != 10000) {
 				if(data.code == 10004) {
 					layer.msg("修改密码错误");
 				} else {
 					layer.msg(data.msg);
 				}
 			} else {
 				layer.msg("修改成功", {
 					icon: "1"
 				})
 				loginOut();
 			}
 		})

 	}

 	var filpasword = function() {
 		var fit = $("#fit").val();
 		if(fit != '') {
 			localStorage.lock = fit;
 		}
 		parent.layer.closeAll();
 		lock();
 	}
 	var Unlock = function() {
 		var Unlock = $(".Unlocker").val();
 		if(Unlock == localStorage.lock) {
 			localStorage.lockStop=false;
 			lockStop();
 		} else {
 			lockStop();
 			layer.msg("解锁密码错误!");
 		}
 		setTimeout(function(){
			location.reload();
		},10);
 	}
 	function testPhone(phone) {
 		var reg_phone = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
 		return reg_phone.test(phone);
 	}

 	function testPassword(password) {
 		var reg_phone = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
 		return reg_phone.test(password);
 	}
 	