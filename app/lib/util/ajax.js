/*
 * 作者：wlhmyit@126.com
 * 时间：2014-10-09
 * 描述: ajax GET & POST封装
 * */
define(function(require, exports, module){
	
	var get = function(path, callback, query){
		$.get(path, query, function(json){
			return callback(json);
		}, 'json');

	};

	
	var post = function(path, data, callback){
		$.post(path, data, function(json){
			if(json){
				return callback(json);
			}	 
		    return {
		    	status: 0
		    };
		});	   
	};
	
	module.exports = {
		get: get,
		post: post
	};
	
});
