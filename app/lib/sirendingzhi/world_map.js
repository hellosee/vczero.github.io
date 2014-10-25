define(function(require, exports, module) {
	var ajax = require('util/ajax');
	var render = require('util/render');
	var init_list = require('sirendingzhi/init_list');
	var urlConfig = require('server/config');
	
	module.exports = {	
		render: function(){
			ajax.get(urlConfig.sirendingzhi_vip_dazhou, function(data){	
				if(data){
					_.each(data, function(item){
						item.fengmianUrl = urlConfig.img + item.fengmianUrl;
					});
				}
				render.render('tpl_world_map', 'div_world_map', data);
				
				//绑定事件,点图点击显示8条数据
				$('#world_map_event li').on('click', function(e){
					//移除之前渲染的节点，这点十分重要，因为历史数据会占用空间，当条数<8时
					$('.recommendation_list div a').remove();
					var dazhou = $(this)[0].getAttribute('data-dazhou');	
					init_list.render_init(urlConfig.tuijianmudidi_putong, {
						dazhou: dazhou,
	    				perPage: 8
					});
					
				});
	
				$(".scrllo").cgPictureEffect({
					picture:".banner",
					thumbPicture:".small-pic",
					title:".pic-title",
					prev:".pre-btn",
					next:".next-btn",
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
				
				$("body").cgChange({
					title:".world_map ul li",
					content:".column .recommendation_box",
					selectedClass:"selected"
				});	
				$(".world_map").find("li").hover(function(){
					$(this).find(".world_map_list").show(200);
				},function(){
					$(this).find(".world_map_list").hide(200);
				});
			});
		} 
	};
	
});