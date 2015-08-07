

define('home/info', function(require, exports, module){
	var _ = require('lib/underscore');
	var $ = require('lib/zepto_pj');
	
	//渲染数据
	var width = document.body.clientWidth;
	var wrapper = $('.SN_info_wrapper');
    var tpl = $('#tpl').html();  
    var data = {
    		width: width,
        list:[
        		{
        			name: 'ss'
        		},
        		{
        			name: 'ss'
        		},
        		{
        			name: 'ss'
        		}
        ]
    }; 
   
	var html = _.template(tpl)(data);
	wrapper.html(html);

	//动画特效
	var wholeLength = width * data.list.length;
	wrapper.css('width', wholeLength);

	//记录初始位置
	var startX = 0;
	wrapper.on('touchstart', function(e){
		startX = e.changedTouches[0].clientX;
	});

	wrapper.on('touchend', function(e){
		var dis = e.changedTouches[0].clientX - startX;
		//获取当前translate3d的位置
		var transform = wrapper.css('transform') || wrapper.css('-webkit-transform');
		var currentPos = parseInt(transform.split(',')[0].split('(')[1]);

		//移动
		if(Math.abs(dis) > 30){
			//左移
			if(dis < -30){
				var w = 0;
				var handle = setInterval(function(){
					if(w <= width && Math.abs(currentPos) < (wholeLength - width - 10)){
						var newX = (currentPos - w);
						wrapper.css('transform', 'translate3d(' + newX + 'px, 0px, 0px)');
						wrapper.css('-webkit-transform', 'translate3d(' + newX + 'px, 0px, 0px)');
					}else{
						clearInterval(handle);
					}
					w += 80;
				}, 70);
			}

			//右移
			if(dis > 30){
				var w = 0;
				var handle = setInterval(function(){
					if(w <= width && Math.abs(currentPos) > 10){
						var newX = (currentPos + w);
						wrapper.css('transform', 'translate3d(' + newX + 'px, 0px, 0px)');
						wrapper.css('-webkit-transform', 'translate3d(' + newX + 'px, 0px, 0px)');
					}else{
						clearInterval(handle);
					}
					w += 80;
				}, 70);
			}
		}



	});

   
});









