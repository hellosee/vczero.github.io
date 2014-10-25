

define(function(require, exports, module) {
	var urlConfig = require('server/config');
	var init_list = require('sirendingzhi/init_list');
	module.exports = {
		query: function(){
			$('#putong_query').on('click', function(e){
				var dazhou = $('select[name="dazhou"] option:selected').val();
				var guojia = $('input[name="guojia"]').val();
				var time = $('input[name="time"]').val();
				
				var query = {
					dazhou: dazhou,
	    			perPage: 8
				};
				
				if(time){
					query.chufa_riqi = time;
				}
				if(guojia){
					query.guojia = guojia;
				}
				
				//移除之前渲染的节点，这点十分重要，因为历史数据会占用空间，当条数<8时
				$('.recommendation_list div a').remove();	
				init_list.render_init(urlConfig.tuijianmudidi_putong, query);
			});
		}
	};

});
