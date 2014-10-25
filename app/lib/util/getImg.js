


define(function(require, exports, module) {
	var urlConfig = require('server/config');
	exports.getImg = function(data){
		_.each(data, function(item){
			item.fengmianUrl = urlConfig.img + item.fengmianUrl;
		});
	};
	
	
});

