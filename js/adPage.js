
var listData=''

layui.use('table', function(){
var table = layui.table;
/* Grid填充  */
var tableIns=table.render({
    elem: '#tabledemo',
    url: urlTest+'getProducelistproducesysapi' //数据接口
    ,method:"GET",
    cols: [[ //表头
	    {field: 'ggbh', title: '广告编号', width:120},
	    {field: 'ggmc', title: '广告名称', width:160},
	    {field: 'gglx', title: '广告类型', width:100,sort: true,align:"center",templet:"#adtype"},
	    {field: 'ggsc', title: '广告时长', width: 100,sort: true},
	    {field: 'pmxz', title: '屏幕形状', width: 90,align:"center",templet:"#pmxz"},
	    {field: 'gxrq', title: '更新日期', width: 160},
	    {field: 'shlx', title: '审核类型', width: 100,sort: true,templet:"#trialType"},
	    {field: 'shzt', title: '审核状态', width:100,sort: true,templet:"#trialState"},
	    {field: 'shsm', title: '审核说明', width: 100},
	    {field: 'czr', title: '最后操作人', width:100},
	   // {field: 'slt', title: '缩略图', width:100,templet:"#thumbnail"},
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
	  ,dataName: 'row' //数据列表的字段名称，默认：data
	}
});  
$("#search").click(function (){
	var ggmc=$("#ggmc").val(),gglx=$("#gglx").val(),shzt=$("#shzt").val(),shlx=$("#shlx").val();

    tableIns.reload({
        where: {
            ggmc: ggmc,
            gglx:gglx,
            shzt:shzt,
           	shlx:shlx
        }
    });
});
//监听工具条
	table.on('tool(demo)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'detail'){
	     	// data.ggbh
	     	sessionStorage.id=data.ggbh
	     	layer.open({
			  type: 1, 
			  title:"详情内容",
			  content: '<iframe src="./detail.html" ></iframe>',
			  offset:'auto',
			  anim:5,
			  area:['80%','100%'],
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
var keysearch=function(obj){
	console.log(obj)
}
