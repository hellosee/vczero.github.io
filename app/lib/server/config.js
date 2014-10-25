/*
 * 作者：wlhmyit@126.com
 * 时间：2014-10-09
 * 描述: 服务接口
 * */

define(function(require, exports, module){
	var config = {
		img: 'http://123.57.14.223:8080',
		index_top1: 'http://123.57.14.223:8080/lltrip/shouyeTop1Controller.do',
		index_top2: 'http://123.57.14.223:8080/lltrip/shouyeTop2Controller.do',
		sirendingzhi_liuyan: 'http://123.57.14.223:8080/lltrip/liuyanSaveController.do',
		sirendingzhi_vip_list: 'http://123.57.14.223:8080/lltrip/dingzhiListController.do',
		sirendingzhi_vip_dazhou: 'http://123.57.14.223:8080/lltrip/qidazhouController.do',
		tuijianmudidi_putong: 'http://123.57.14.223:8080/lltrip/putongChaxunController.do'
	};
	
	module.exports = config;
});
