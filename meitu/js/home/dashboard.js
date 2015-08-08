define('home/dashboard', function(require, exports, module) {

	var zepto = require('lib/zepto_pj');
	var mapInstance = require('home/map');
	var charts = $('#charts');
	var charts_dash = $('#charts_dash');


	charts.on('click', function() {
		if(charts_dash.css('display') === 'none'){
			charts_dash.fadeIn();
			var opts = {
				lines: 12, 
				angle: 0, 
				lineWidth: 0.22, 
				pointer: {
					length: 0.9, 
					strokeWidth: 0.061, 
					color: '#3BC1FF' 
				},
				limitMax: 'false', 
				colorStart: '#00C348', 
				colorStop: '#00C348',
				strokeColor: '#E0E0E0',
				generateGradient: true
			};
			var target = document.getElementById('speed_dash'); 
			var gauge = new Gauge(target).setOptions(opts); 
			gauge.maxValue = 100; 
			gauge.animationSpeed = 10; 
			gauge.set(50);
			
			setInterval(function(){
				gauge.set(50 + Math.random() * (-40)); 
			}, 500);
		}else{
			charts_dash.fadeOut();
		}
		
	});

});