

define('home/tools', function(require, exports, module){
	
	var $ = require('lib/zepto_pj');
	var tools = $('.tools');
	var tools_list = $('#tools_list');

	//显示隐藏工具集
	tools_list.on('click', function(){
		tools.css('overflow', 'hidden');

		var height = parseInt($('.tools').css('height'));
		if(height > 55){
			var hideHandle = setInterval(function(){
				height -= 50;
				if(height < 10){
					tools_list.css('border', '1px solid #0091FF');
					clearInterval(hideHandle);
				}else {
					tools.css('height', height + 'px');
				}
			}, 40);
		}else {
			var showHandle = setInterval(function(){
				height += 50;
				if(height > 320){
					clearInterval(showHandle);
					tools_list.css('border', '1px solid #A3A3A3');
				}else {
					tools.css('height', height + 'px');
				}
			}, 40);
		}
	});
	

	
});