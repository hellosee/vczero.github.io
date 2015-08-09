
define('home/search', function(require, exports, module){
	
	var $ = require('lib/zepto_pj');
	var map = require('home/map');

	var router = require('common/data').router;
	var events = require('lib/events');
	
	var input = $('#search_input_text');
	var tpl = $('#tpl_search').html();
	var container = $('#SEARCH_TPL');
	
	
	var data = {
		items:[
			{
				router: '上海到扬州',
				desc: '两日游'
			},
			{
				router: '上海到常州',
				desc: '一日游'
			},
			{
				router: '上海到衢州',
				desc: '两日游'
			},
			{
				router: '郑州到青岛',
				desc: '三日游'
			}
		]
	};

	
	//focus事件
	input.on('focus', function(){
		var html = _.template(tpl)(data);
		container.html(html);
		container.fadeIn();
	});
	
	//选择list列表
	container.on('click', function(e){
		var el = $(e.target);
		var index = el.attr('_index');
		map.routes = router[index];
		
		
		//路线出现在输入框
		input.val(data.items[index].router);
		//隐藏结果列表
		container.fadeOut();
		//触发搜索事件
		
	});
	
	
	
});