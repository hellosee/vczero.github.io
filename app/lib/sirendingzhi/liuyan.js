define(function(require, exports, module) {
	
	var ajax = require('util/ajax');
	var urlConfig = require('server/config');
	
	$('#clearform').click(function(){
		clear();
	});
	
	
	$('#submit').click(function(){
		var type = [],
	    	pianhao = [];
	    
	    var pianhaos = $('input[name="pianhao"]:checked'),
	    	types = $('input[name="type"]:checked');
	    _.each(pianhaos, function(item){
	    	pianhao.push($(item)[0].getAttribute('value'));
	    });
	    
	    _.each(types, function(item){
	    	type.push($(item)[0].getAttribute('value'));
	    });
	    
		var json = {
			userid: 'test1', //是否要去掉
			mudidi: $('#mudidi').val() || '',
			shouxuan_hangkong: $('#hangkong').val() || '',
			chufa_riqi: $('#chufa_riqi').val() || '',
			fancheng_riqi: $('#fancheng_riqi').val() || '',
			mudiddi_pianhao: pianhao,
			type: type,
			xingming: $('#name').val() || '',
			chengwei: $('#chengwei').val() || '',
			email: $('#email').val() || '',
			tel: $('#tel').val() || '',
			chengren: $('#chengren').val() || 0,
			ertong: $('#ertong').val() || 0,
			qita: $('#qita').val(),
		};
		
		
		ajax.post(urlConfig.sirendingzhi_liuyan, {data: JSON.stringify(json)}, function(data){
			if(data.info){
				alert(data.info);
			}else{
				alert(data.info);
			}
		});
		
		
	});
	
	function clear(){
		$('#mudidi').val('');
		$('#hangkong').val('');
		$('#chufa_riqi').val('');
		$('#fancheng_riqi').val('');
		$('#name').val('');
		$('#chengwei').val('');
		$('#email').val('');
		$('#tel').val('');
		$('#chengren').val('');
		$('#ertong').val('');
		$('#qita').val('');
		
		var pianhaos = $('input[name="pianhao"]:checked'),
	    	types = $('input[name="type"]:checked');
	    _.each(pianhaos, function(item){
	    	$(item)[0].checked = false;
	    });
	    
	    _.each(types, function(item){
	    	$(item)[0].checked = false;
	    });
	}
	
	//参数校验
	function check(){
		
	}
	
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