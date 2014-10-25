/*
 * 作者：wlhmyit@126.com
 * 时间：2014-10-09
 * 描述: 世界图展示-TOP2
 * */

define(function(require, exports, module){
	var ajax = require('util/ajax');
	var render = require('util/render');
	var urlConfig = require('server/config');
	
	var defaultData = {
		"亲子之旅":[
			{
				"fengmianUrl":"images/301.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"6",
				"xiangmuLeixing":"亲子之旅",
				"xiangmuName":"新西兰-南岛"
			},
			{
				"fengmianUrl":"images/303.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"北美洲",
				"xiangmuId":"7",
				"xiangmuLeixing":"亲子之旅",
				"xiangmuName":"新西兰-南岛"
			}
		],
		"摄影之旅":[
			{
				"fengmianUrl":"images/300.png",
				"luxianJianjie":"全国首发的玻利维亚自驾行程",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"9",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"黑龙家-天津"
			},
			{
				"fengmianUrl":"images/301.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"13",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"俄罗斯-香港"
			}
		],
		"运动之旅":[
			{
				"fengmianUrl":"images/302.png",
				"luxianJianjie":"全国首发的玻利维亚自驾行程",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"9",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"黑龙家-天津"
			},
			{
				"fengmianUrl":"images/303.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"13",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"俄罗斯-香港"
			}
		],
		"蜜月之旅":[
			{
				"fengmianUrl":"images/304.png",
				"luxianJianjie":"全国首发的玻利维亚自驾行程",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"9",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"黑龙家-天津"
			},
			{
				"fengmianUrl":"images/305.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"13",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"俄罗斯-香港"
			}
		],
		"夕阳游":[
			{
				"fengmianUrl":"images/306.png",
				"luxianJianjie":"全国首发的玻利维亚自驾行程",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"9",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"黑龙家-天津"
			},
			{
				"fengmianUrl":"images/307.png",
				"luxianJianjie":"在专业自驾游领队带领下，亲自驾车驰骋在如梦般的天空之镜之上，驾驶感与美景在巧妙的结合中张显独特的魅力；",
				"suozaiDazhou":"南美洲",
				"xiangmuId":"13",
				"xiangmuLeixing":"摄影之旅",
				"xiangmuName":"俄罗斯-香港"
			}
		]
	};
	
	

	
	module.exports = {	
		render: function(){
			ajax.get(urlConfig.index_top2, function(data){
				if(data || defaultData){
					data = defaultData;
				}
				
				if(data){
					_.each(data, function(item){
						item.fengmianUrl = urlConfig.img + item.fengmianUrl;
					});
				}
				var convertData = {
					"qinzi": data['亲子之旅'],
					"sheying": data['摄影之旅'],
					"yundong": data['运动之旅'],
					"xiyang": data['夕阳游'],
					"miyue": data['蜜月之旅']
				};
				render.render('tpl_travel_attraction', 'tpl_div_travel_attraction', convertData);
			});
		} 
	};
	
});
	