var WebSetting = function () {
    return {
        init: function () {
            console.log("WebSetting init");
        },
        initEvent: function(){
        	
        },
        initTable: function(){// 初始化表格
        	//////////
        	var baseurl = "http://20.14.3.19:8080/committeewb/upload/";
        	$('#baseinfotable').bootstrapTable({
				dataType : "json",	
				cache : false, // 不缓存
				striped : true, // 隔行加亮
				columns : [ {
					field : 'id',
					align : 'center',
					valign : 'middle',
					title : "id"
				},{
					field : 'logoUrl',
					align : 'center',
					valign : 'middle',
					title : "logo图标",
					formatter : function(value, row, index) {
						return "<img class='baseinfo_img' style='width:100px;' src="+ baseurl + value + " />"
					}
				}, {
					field : 'titleUrl',
					align : 'center',
					valign : 'middle',
					title : "标题图标",
					formatter : function(value, row, index) {
						return "<img class='baseinfo_img' style='width:100px;' src="+ baseurl + value + " />"
					}
				}, {
					field : 'backgroundUrl',
					align : 'center',
					valign : 'middle',
					title : "背景图片",
					formatter : function(value, row, index) {
						return "<img class='baseinfo_img' style='width:100px;' src=" + baseurl + value + " />"
					}
				}, {
					field : 'field1',
					align : 'center',
					valign : 'middle',
					title : "字段1"
				}, {
					field : 'field2',
					align : 'center',
					valign : 'middle',
					title : "字段2"
				}, {
					field : 'field3',
					align : 'center',
					valign : 'middle',
					title : "字段3"
				}, {
					field : 'field4',
					align : 'center',
					valign : 'middle',
					title : "字段4"
				}, {
					field : 'field5',
					align : 'center',
					valign : 'middle',
					title : "字段5"
				}],
				data : []
			});
        },
        initData: function(){// 初始化表格数据
        	var self = this;
        	$.ajax({
        		type:"get",
        		url:"http://20.14.3.19:8080/committeewb/webInfo/queryWebInfo",
        		async:true,
        		success: function(res){
        			if (res.code == 200) {
						$('#baseinfotable').bootstrapTable('load', res.data);
						// 初始化表单text数据
						$("input[name=id]").val(res.data[0].id);
						$("input[name=field1]").val(res.data[0].field1);
						$("input[name=field2]").val(res.data[0].field2);
						$("input[name=field3]").val(res.data[0].field3);
						$("input[name=field4]").val(res.data[0].field4);
						$("input[name=field5]").val(res.data[0].field5);
						
						// 加载图片的点击事件
						self.initEvent();
					} else {
						
					}
					
        		},
        		error: function(err){
        			alert("error");
        		}
        	});
        },
        initPostAjax: function(){
        	var self = this;
        	$("#modifybaseInfo").click(function(){
        		var options = {
					dataType: "json",
					type: "post",
					url: "http://20.14.3.19:8080/committeewb/webInfo/updateWebInfo",
					beforeSubmit: function(){
						console.log("正在上传");
					},
					success: function(res){
						console.log("成功返回");
						self.initData();
						alert(res.msg);
					},
					error: function(err){
						console.log("上传失败");
					}
				};
				$("#mybaseForm").ajaxSubmit(options);
        	})
    	}
	}
}();