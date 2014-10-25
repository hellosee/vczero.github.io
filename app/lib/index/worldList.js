/*
 * 作者：wlhmyit@126.com
 * 时间：2014-10-09
 * 描述: 世界图展示-TOP1
 * */

define(function(require, exports, module){
	var ajax = require('util/ajax');
	var render = require('util/render');
	var urlConfig = require('server/config');
	
	var defaultData = [
		{
			fengmianUrl: 'images/500.png',
			suozaiDazhou: '北美洲',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		},
		{
			fengmianUrl: 'images/501.png',
			suozaiDazhou: '南极洲',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		},
		{
			fengmianUrl: 'images/502.png',
			suozaiDazhou: '南美洲',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		},
		{
			fengmianUrl: 'images/503.png',
			suozaiDazhou: '非洲',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		},
		{
			fengmianUrl: 'images/504.png',
			suozaiDazhou: '亚欧大陆',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		},
		{
			fengmianUrl: 'images/505.png',
			suozaiDazhou: '澳洲',
			luxianJianjie: '早定者，全程超级经济舱。游览新西兰的花园之城——基督城，搭乘古董蒸汽小火车，喷射快艇，自驾前...',
			xiangmuLeixing: '蜜月之旅',
			zhichiCount: '2人'
		}
	];
	
	module.exports = {	
		render: function(){
			ajax.get(urlConfig.index_top1, function(data){
				if(data || defaultData){
					//拼接图片的完整地址
					if(data){
						_.each(data, function(item){
							item.fengmianUrl =urlConfig.img + item.fengmianUrl;
						});
					}
					render.render('tpl_world_map', 'tpl_div_world_map', data);
					//界面效果
					$("#srdz_box").cgPictureEffect({
						picture:".scroll_srdz",
						thumbPicture:".small-pic",
						disbledClass:"btn-disable",
						prev:".pre-btn",
						next:".next-btn",
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
					$(".wm_block").find("li").hover(function(){
						var num = $(this).index() + 1;
						$(this).addClass("bg_" + num);
						$(".world_map").find(".world_map_list").eq($(this).index()).show(200);
						
					},function(){
						var num = $(this).index() + 1;
						$(this).removeClass("bg_" + num);
						$(".world_map").find(".world_map_list").eq($(this).index()).hide(200);
					});
				}
				
			});
			
		} 
	};
	
});
