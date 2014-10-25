
define(function(require, exports, module) {
	
	var world_map = require('sirendingzhi/world_map');
	var init_list = require('sirendingzhi/init_list');
	var urlConfig = require('server/config');
	var putong_query = require('sirendingzhi/putong_query');
	
	putong_query.query();
	
	world_map.render();
	init_list.render_init(urlConfig.tuijianmudidi_putong, {
		dazhou: '亚洲',
	    perPage: 8
	});
	
	
	
	//轮播图
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