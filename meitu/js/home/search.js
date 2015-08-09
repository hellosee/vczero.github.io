
define('home/search', function(require, exports, module){
	var $ = require('lib/zepto_pj');
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
	
	
	
});