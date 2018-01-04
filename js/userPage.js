
var listData='',xtqxmove;
layui.use('table', function(){
var table = layui.table;
/* Grid填充  */
 ajax("getSysAuthorityssyssuthorityapi","GET",'',"JSON",function(data){ 
 	if(data.code==10000){
 		xtqxmove=data.data;	
 	}
 })
	var tableIns=table.render({
	    elem: '#tabledemo',
	    url: urlTest+'queryAllUserusersapi' //数据接口
	    ,method:"GET",
	    cols: [[ //表头
	    	{field: 'xtbh', title: '系统编号', width:120},
	    	{field: 'xtqx', title: '系统权限', width:500,templet:"#xtqx"},
		    {field: 'bm', title: '部门', width:120},
		    {field: 'zh', title: '账号', width:120},
		    {field: 'xm', title: '姓名', width:120},
		    {field: 'xb', title: '性别', width:120,templet:"#sex"},
		    {field: 'lxdh', title: '手机号码', width:120},
		    {field: 'czr', title: '操作人', width:120},
		    {fixed: 'right', width:100, align:'center', toolbar: '#barDemo'}
	    ]],
	    page:true,
	    limits: [10, 20, 40, 60, 80]
	    ,limit: 10, 
	    request: {
		  pageName: 'page' //页码的参数名称，默认：page
		  ,limitName: 'limit' //每页数据量的参数名，默认：limit
		} ,
		response: {
		  statusName: 'code' //数据状态的字段名称，默认：code
		  ,statusCode: 10000 //成功的状态码，默认：0
		  ,msgName: 'msg' //状态信息的字段名称，默认：msg
		  ,countName: 'count' //数据总数的字段名称，默认：count
		  ,dataName: 'data' //数据列表的字段名称，默认：data
		},
		where: {
            condition: ''
        }
	});  
	
	$("#search").click(function (){
		var condition=$("#condition").val();
	    tableIns.reload({
	        where: {
	            condition: condition
	        }
	    });
	});
	table.on('tool(demo)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'modify'){
	     	sessionStorage.xtbh=data.xtbh;
	     	layer.open({
			  type: 1, 
			  title:"修改用户",
			  content: '<iframe src="./useradd.html" ></iframe>',
			  offset:'auto',
			  anim:5,
			  area:['640px','680px'],
			  resize:false,
			  shadeClose:true,
			  icon:5,
			  end: function () {
		        location.reload();
		      }
		 	});
	    } 
	});
});
$(document).ready(function(){
	if(localStorage.addUser==true){
		$("#adduserBtn").show()
	}else{
		$("#adduserBtn").hide()
	}
})
var adduserBtn=function(obj){
	sessionStorage.removeItem('xtbh')
		layer.open({
			  type: 1, 
			  title:"添加用户",
			  content: '<iframe src="./useradd.html" ></iframe>',
			  offset:'auto',
			  anim:5,
			  area:['640px','680px'],
			  resize:false,
			  shadeClose:true,
			  icon:5,
			  end: function () {
			    location.reload();
			  }
		});
	
	
}