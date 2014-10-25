define(function(require, exports, module) {
	
	//普通查询
	var query = function(){
		var zhou = $('select[name="dazhou"] option:selected').val(),
			country = $('input[name="guojia"]').val(),
			time = $('input[name="time"]').val();
			
	    var json = {
	    	dazhou: zhou,
	    	guojia: country,
	    	chufa_riqi: tiem,
	    	pageNo: 0,
	    	pageSize:10
	    };
		
	};
		
});