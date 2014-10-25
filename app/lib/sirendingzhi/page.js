
define(function(require, exports, module) {
	var pageEvent = function(){
		var dazhou  = $('#G_dazhou').text(); //当前的大洲
		var page = window.G.page;//当前页码
		$('#page_li').on('click', function(){
		
		
		});
		
		$('#pre_li').on('click', function(){	
			//移除之前渲染的节点，这点十分重要，因为历史数据会占用空间，当条数<8时
			$('.recommendation_list div a').remove();
			var dazhou = $(this)[0].getAttribute('data-dazhou');	
			init_list.render_init(urlConfig.tuijianmudidi_putong, {
				pageNo:page - 1,
				dazhou: dazhou,
				perPage: 8
			});
		});
		
		$('#next_li').on('click', function(){
			//移除之前渲染的节点，这点十分重要，因为历史数据会占用空间，当条数<8时
			$('.recommendation_list div a').remove();
			var dazhou = $(this)[0].getAttribute('data-dazhou');	
			init_list.render_init(urlConfig.tuijianmudidi_putong, {
				pageNo:page + 1,
				dazhou: dazhou,
				perPage: 8
			});	
			
		});
	};
	
	
	
	
	module.exports = {
		addPageEvent: pageEvent
	};
	
});