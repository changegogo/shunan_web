var NewsList = (function(){
	return {
		baseurl: "",
    		slideDownAlert: function(msg){
    			var self = this;
    			$(".alert .alertMsg").html(msg);
    			$(".alert").slideDown();
    			setTimeout(function(){
    				self.slideUpAlert();
    			}, 1500);
    		},
    		slideUpAlert: function(){
    			$(".alert").slideUp();
    		},
        init: function () {
        		console.log("NewsList init");
            this.baseurl = CommonUtils.baseUrl;
            this.initTable();
            this.initEvent();
        },
        initEvent: function(){
        		console.log("NewsList initEvent");
        		$('input:radio[name="optionsRadios"]').change(function(){
				  $('#newslisttable').bootstrapTable("refresh");      			
        		});
        		$('input:checkbox[name="optionCheckboxs"]').change(function(){
        			$('#newslisttable').bootstrapTable("refresh");      
        		});
        },
        initTable: function(){
        		console.log("NewsList initTable");
        		$('#newslisttable').bootstrapTable({
				dataType : "json",	
				cache : false, // 不缓存
				striped : true, // 隔行加亮
				url: "/shunan_web/media/json/news.json",
                pagination: true,   
                sortable: false,    
                sortOrder: "asc",    
                pageSize: 10,  
                pageList: [10, 20],
                sidePagination: "server",
                queryParams: function(params) {
                		// offset: 偏移量 limit: 每页的数目 order: asc desc
                		// 获取类型和状态的值
                		var radioval=$('input:radio[name="optionsRadios"]:checked').val();
                		var checkboxval='';
                		$('input:checkbox[name="optionCheckboxs"]:checked').each(function(index){ 
						checkboxval += ($(this).val()+',');
					}); 
                		var checkboxvalarray = checkboxval.split(',');
                		checkboxvalarray.pop();
                		checkboxval = checkboxvalarray.join();
                		
                    return {
                    		chooseStatus: radioval,
                    		typeID: checkboxval,
                     	offset: params.offset,
                      	pageSize: params.limit,
                      	sort: 1,
                   };
                },
				columns : [ {
					field : 'id',
					align : 'center',
					valign : 'middle',
					title : "文章id",
					width: 60
				},{
					field : 'title',
					align : 'left',
					valign : 'middle',
					title : "标题"
				},{
					field : 'publishTime',
					align : 'center',
					valign : 'middle',
					title : "发表时间",
					width: 150,
					formatter: function(value, row, e){
						return CommonUtils.timeStampToDate(row.publishTime);
					}
				},{
					field : 'showTime',
					align : 'center',
					valign : 'middle',
					title : "显示时间",
					width: 150,
					formatter: function(value, row, e){
						return CommonUtils.timeStampToDate(row.publishTime);
					}
				},{
					field : 'status',
					align : 'center',
					valign : 'middle',
					title : "状态",
					width: 100,
					formatter : function(value, row, index) {
						if(row.status === 0){
							return "已发布";
						}else{
							return "草稿";
						}
						
					}
				},{
					field : 'operate',
					align : 'center',
					valign : 'middle',
					title : "操作",
					width: 100
				}],
				data : []
			});
			//this.initDataTable();
       },
       initDataTable: function(){
       		var self = this;
       		$.ajax({
       			type:"get",
       			url: self.baseurl+"/news/queryPageNews?typeID=1&chooseStatus=0&currentPage=1&pageSize=10&sort=1",
       			async:true,
       			success: function(res){
       				if(res.code === 200){
       					$('#newslisttable').bootstrapTable('load', res.data);
       				}
       			},
       			error: function(error){
       				
       			}
       		});
       }
	}
})()
