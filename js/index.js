
layui.use('form', function(){
  var form = layui.form;

  //监听提交
	form.on('submit(formDemo)', function(data){
	  //把form的data对象转为字符串 
	  var user=JSON.stringify(data.field)
		//把字符串转为json对象    
		user=JSON.parse(user);
		var key=null,timestamper,timesLast,hash,pasword,userName=user.phoneNumber,timestamp=new Date().getTime(),hash;
		ajax('getKeyusersapi','POST',{key:timestamp},'json',function(data){
			if(data.code != 10000){	
				layer.msg(data.msg);
			}else{
				var data=data.data;
				key=data.key;
				pasword=user.password;
				hash=encryptCode(pasword,key,timestamp)
	  		login(hash,timestamp,userName);
			};
		});
		return false;
  });
});