/*
 * 作者：wlhmyit@126.com
 * 时间：2014-10-09
 * 描述: 页面渲染
 * */

define(function(require, exports, module) {
	/*
	 * @param:tpl 模板
	 * @param:div 渲染内置view
	 * @param:data 获取的数据
	 * 
	 * */
	var render = function(tpl, div, data){
		var _tpl = $('#' + tpl).html(),
			_div = $('#' + div);
			
		var list = {
			data: JSON.parse(JSON.stringify(data))
		};
		
		//编译模板 & 渲染
		var html = _.template(_tpl, list);
		_div.html(html); 
	};
	module.exports = {
		render: render
	};
});
        	
        	