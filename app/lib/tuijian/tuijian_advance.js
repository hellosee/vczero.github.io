define(function(require, exports, module) {
	
	var query = function(){
		var zhou = $('select[name="dazhou"] option:selected').val(),
		    guojia = $('input[name="guojia"]').val(),
		    time = $('input[name="time"]').val(),
		    type = [],
		    types = $('input[name="type"]:checked'),
		    new_type = [],
		    new_types = $('input[name="new_type"]:checked');
		
		_.each(types, function(item){
	    	type.push($(item)[0].getAttribute('value'));
	    });
	    
	    _.each(new_types, function(item){
	    	new_type.push($(item)[0].getAttribute('value'));
	    });
	    
	    var json = {};
	    json = {
	    	dazhou: zhou,
	    	guojia: guojia,
	    	chufa_riqi: time,
	    	pageNo: 1,
	    	pageSize: 10,
	    	lvyou_leixing: type,
	    	chaozhi_chuyou: new_type
	    };
	    console.log(json);
	};
	
	$('#btn_search').click(function(){
		query();
	});
	
	
	$("#srdz_box").cgPictureEffect({
		picture:".scroll_srdz",
		thumbPicture:".small-pic",
		disbledClass:"btn-disable",
		current:1,
		thumbEffect:{
			style:"icon",
			type:null,
			selectedClass:"small-hover"
		},
		effect:{
			type:"fade",
			speed:2000
		}
	});	
});