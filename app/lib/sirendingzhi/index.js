define(function(require, exports, module) {
	var data = {
		user: 'putong'
	};
	
	$('#start_dingzhi').click(function(){
		if(data.user === 'vip'){
			
		}else{
			location.href = 'sirendingzhi_liuyan.html'
		}
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