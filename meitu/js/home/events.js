
//全局事件
define('home/events', function(require, exports, module){
	var Events = require('lib/events');
	//全局事件对象
	var events = new Events();
	//地图
	var map = require('home/map');
	//获取路线数据
	var router = require('common/data').router[0];
	//地图对象
	events.set('map', map);
	//默认路线
	events.set('router', router);
	//起点
	events.set('origin', new AMap.LngLat(router[0].x, router[0].y));
	//终点
	events.set('destination', new AMap.LngLat(router[router.length - 1].x, router[router.length - 1].y));
	//途经点
	events.set('wayPoints', []);
	//采集数据
	events.set('disTime', []);
	
	//获取途经点
	events.on('getWayPoints', function(){
		var router = events.get('router');
		var wayPoints = {
			points: [],
			contents: []
		};
		for(var i in router){
			if(i > 0 && i < router.length - 1){
				wayPoints.points.push(new AMap.LngLat(router[i].x, router[i].y));
				wayPoints.contents.push(router[i].content);	
			}
		}
		events.set('wayPoints', wayPoints);
	});
	
	//绘制线路
	events.on('drawRouter', function(){
		var wayPoints = events.get('wayPoints');
		var router = events.get('router');
		var map = events.get('map');
		//绘制途径点marker
		for(var i in wayPoints.points){
			var content = '<div index=' + i + ' style="background-color:#22BBFF;color:#fff;width:40px;height:20px';
			content += ';text-align:center;line-height:20px;">' + wayPoints.contents[i] + '</div>';
			var marker = new AMap.Marker({map: map, position: wayPoints.points[i], content: content});
		}
		
		//绘制各段路程
		AMap.service(['AMap.Driving'], function(){
			for(var k = 0; k < router.length - 1; k++){
				var sp = new AMap.LngLat(router[k].x, router[k].y);
				var ep = new AMap.LngLat(router[k + 1].x, router[k + 1].y);
				driving(sp, ep);
			}
		});
	});
	
	//绘制起点和终点
	events.on('drawOriginDestination', function(){
		var map = events.get('map');
		var origin = events.get('origin');
		var destination = events.get('destination');
		
		var aIcon = new AMap.Icon({
			image: "http://cache.amap.com/lbs/static/jsdemo002.png",
			size:new AMap.Size(44,44),
			imageOffset: new AMap.Pixel(-334, -180)
		});
		var bIcon = new AMap.Icon({
			image: "http://cache.amap.com/lbs/static/jsdemo002.png",
			size:new AMap.Size(44,44),
			imageOffset: new AMap.Pixel(-334, -134)
		});
		
		new AMap.Marker({map: map, position: origin, icon: aIcon});
		new AMap.Marker({map: map, position: destination, icon: bIcon});
	});
	
	
	
	//默认操作
	events.trigger('drawOriginDestination');
	events.trigger('getWayPoints');
	events.trigger('drawRouter');
	
	setTimeout(function(){
		console.log(events.get('disTime'));
	}, 2000);
	
	//绘制两点间路线
	function driving(origin, destination){
		var map = events.get('map');
		var driving = new AMap.Driving({
			extensions: 'base',
			policy: AMap.DrivingPolicy.REAL_TRAFFIC 
		});
		driving.search(origin, destination, function(status, result){
			if(status === 'complete' && result.info === 'OK'){
	        		//绘制驾车路线
	        		map.setZoom(9);
	        		var polyline = new AMap.Polyline({
	        			map: map,
	        			strokeColor: '#E30078',
	        			strokeWeight: 3
	        		});
	        		var paths = [];
	        		if(result.routes.length){
	        			var route = result.routes[0];
	        			var steps = route.steps;
	        			var time = 0;
	        			var distance = 0;
	        			for(var i = 0; i < steps.length; i++){
	        				var path = steps[i].path;
	        				time += steps[i].time;
	        				distance += steps[i].distance;
	        				for(var j in path){
	        					paths.push(path[j]);
	        				}
	        			}
	        			
	        			var disTime = events.get('disTime');
	        			disTime.push({
	        				time: Math.ceil(time/60),
	        				distance: (distance/1000).toFixed(2),
	        				speed: ((distance/1000) / (time/60/60)).toFixed(2)
	        			});
	        			events.set('disTime', disTime);
	        			
	        		}
	        		polyline.setPath(paths);
	        		
	        	}
		});
	}
	
});
