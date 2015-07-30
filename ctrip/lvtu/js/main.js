;(function(window, $){
	
	//显示地图
	var map =  new AMap.Map('map',{
		mapStyle: 'fresh',
		resizeEnable: true,
	});
	
	//搜索
	var wayPoints = [];
	var origin = null;
	var destination = null;
	var routes = window.routes;
	$('.search_btn').on('click', function(e){
		map.clearMap();
		AMap.service(['AMap.Driving'], function(){
			origin = new AMap.LngLat(routes[0].x, routes[0].y);
			destination = new AMap.LngLat(routes[routes.length - 1].x, routes[routes.length - 1].y);
			//绘制起终点icon
			addSEIcon(origin, destination);
			//驾车路线导航
			var contents = [];
			wayPoints = [];
			for(var n = 1; n < routes.length - 1; n++){
				wayPoints.push(new AMap.LngLat(routes[n].x, routes[n].y));
				contents.push(routes[n].content);
			}
			//绘制中途点
			addWayIcon(wayPoints, contents);
			
			//绘制各段路程
			for(var k = 0; k < routes.length - 1; k++){
				var sp = new AMap.LngLat(routes[k].x, routes[k].y);
				var ep = new AMap.LngLat(routes[k + 1].x, routes[k + 1].y);
				
				driving(sp, ep);
			}
			
		});
	});
	
	//绘制起终点ICON
	function addSEIcon(origin, destination){
		var AIcon = new AMap.Icon({
			image: "http://cache.amap.com/lbs/static/jsdemo002.png",
			size:new AMap.Size(44,44),
			imageOffset: new AMap.Pixel(-334, -180)
		});
		var BIcon = new AMap.Icon({
			image: "http://cache.amap.com/lbs/static/jsdemo002.png",
			size:new AMap.Size(44,44),
			imageOffset: new AMap.Pixel(-334, -134)
		});
		
		new AMap.Marker({map: map, position: origin, icon: AIcon});
		new AMap.Marker({map: map, position: destination, icon: BIcon});
	}
	
	var markers = [];
	//绘制中途点ICON
	function addWayIcon(wayPoints, contents){
		for(var i in wayPoints){
			var content = '<div index=' + i + ' style="background-color:#22BBFF;color:#fff;width:60px;height:26px';
			content += ';text-align:center;line-height:26px;">' + contents[i] + '</div>';
			var marker = new AMap.Marker({map: map, position: wayPoints[i], content: content});
			marker.__index = i;
			markers.push(marker);
			AMap.event.addListener(marker, 'click', function(e){
				var index = e.target.__index;
				var cn = parseInt(index);
				var endTime = 0;
				var startTime = parseInt(routes[0].startTime.split(':')[1]);
				for(var n = index; n >= 0; n--){
					endTime += disTime[n].time;
				}
				endTime += startTime;
				//进行时间换算
				var min = endTime % 60; //分钟
				var hour = Math.floor(endTime/60);//小时
				var arTime = parseInt(routes[0].startTime.split(':')[0]) + hour;
				if(arTime > 23){
					arTime = arTime - 24; //次日
					arTime = '次日 ' + arTime;
				}
				if(min < 10){
					min = '0' + min;
				}
				arTime += ':' + min;
				
				var styles = '<style type="text/css">';
				styles += ' ._in_bg{background-color:#FFF;width:320px;height:220px;border:1px solid #ddd;}';
				styles += ' ._in_title{margin-left:5px;width:310px;text-align: center;height:35px;line-height:35px;border-bottom:1px solid #DDDDDD;}';
				styles += ' ._in_title img{height:12px;margin-left:5px;margin-right:5px;margin-top:-4px;}';
				styles += ' ._in_title span{color:#1DC6F0;font-size:20px;}';
				styles += ' ._in_close{float: right;margin-top:3px;margin-right:3px;cursor:pointer;}';
				styles += ' ._in_key{font-size:13px;color: #0091FF;margin-left:5px;}';
				styles += ' ._in_key_value{color:#999999;font-size:13px;}';
				styles += ' ._in_key_val{color:#E60085;font-size:13px;}';
				styles += ' ._in_city_story img{height:80px;margin-right:5px;margin-top:3px;}';
				styles += ' ._in_story{font-size:13px;margin-left:5px;line-height:16px;margin-top:5px;}';
				styles += ' ._in_arrow_down{border:1px solid #ddd;width:12px;height:12px;background-color:#fff;margin-left:auto;margin-right:auto;';
				styles += 'transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);';
				styles += '-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);border-left:0;border-top:0;margin-top:3px;}';
				styles += '</style>';
				
				var contentHTML  = styles + '<div class="_in_bg">';
				contentHTML += '<div class="_in_close"><img src="img/iw-close.png" /></div>';
				contentHTML += '<div class="_in_title">';
				contentHTML += '<span>' + routes[cn].content + '</span>';
				contentHTML += '<img src="img/arrow.png"/>';
				contentHTML += '<span>' + routes[cn + 1].content + '</span></div>';
				contentHTML += '<div style="height:90px;"><div style="float:left"><div style="margin-top:4px;">';
				contentHTML += '<span class="_in_key">到达时间：</span><span class="_in_key_val">' + arTime + '</span>';
				contentHTML += '</div><div><span class="_in_key">时长：</span>';
				contentHTML += '<span class="_in_key_value">' + disTime[index].time + ' 分钟</span></div>';
				contentHTML += '<div><span class="_in_key">距离：</span>';
				contentHTML += '<span class="_in_key_value">' + disTime[index].distance + ' km</span>';
				contentHTML += '</div>';
				contentHTML += '<div>';
				contentHTML += '<span class="_in_key">时速：</span>';
				contentHTML += '<span class="_in_key_value">' + disTime[index].speed + ' km/h</span>';
				contentHTML += '</div>';
				contentHTML += '</div><div style="float:right;" class="_in_city_story">';
				contentHTML += '<img src="img/city.jpg"/></div></div>';
				contentHTML += '<div class="_in_story">';
				contentHTML += '<div>那座城市，那个人， 特价¥899</div>';
				contentHTML += '<div>再美不如苏州园林， 门票：¥40</div>';
				contentHTML += '<div>苏州好吃一窝，特价团购：¥30</div>';
				contentHTML += '<div>苏州必须去的5个景点，去了才知道</div>';
				contentHTML += '<div>假日酒店，全家人旅行特选，机场接送</div></div>';
				contentHTML += '<div class="_in_arrow_down"></div></div>';
		
				var infoWindow = new AMap.InfoWindow({
					position: markers[cn].getPosition(),
					isCustom: true,
					offset:new AMap.Pixel(20, -35),                 
  					content:contentHTML
				});
				infoWindow.open(map);
				//TODO: 4 BEST METHOD IN CALLBACK
				setTimeout(function(){
					$('._in_close').on('click', function(){
						infoWindow.close();
					});
				}, 1000);
				
			});
		}
	}
	
	
	var disTime = [];
	//驾车路线导航
	function driving(origin, destination){
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
	        			strokeWeight: 5
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
	        			
	        			disTime.push({
	        				time: Math.ceil(time/60),
	        				distance: (distance/1000).toFixed(2),
	        				speed: ((distance/1000) / (time/60/60)).toFixed(2)
	        			});
	        		}
	        		polyline.setPath(paths);
	        		
	        	}
		});
	}
	
	var carMarker = null;
	$('.car_run_show').on('click', function(){
		if(carMarker){
			
		}
		origin = new AMap.LngLat(routes[0].x, routes[0].y);
		destination = new AMap.LngLat(routes[routes.length - 1].x, routes[routes.length - 1].y);
		var Car = new AMap.Icon({
			image: "img/car.png",
			size:new AMap.Size(100,100)
		});
		carMarker = new AMap.Marker({
			map: map, 
			position: origin, 
			icon: Car, 
			autoRotation: true, 
			offset:new AMap.Pixel(-26,-13),
			zIndex: 10000,
		});
	
		
		AMap.service(['AMap.Driving'], function(){
			var driving = new AMap.Driving({
				extensions: 'base',
				policy: AMap.DrivingPolicy.REAL_TRAFFIC 
			});
			driving.search(origin, destination, {waypoints: wayPoints},function(status, result){
				if(status === 'complete' && result.info === 'OK'){
					//绘制驾车路线
		        		var paths = [];
		        		if(result.routes.length){
		        			var route = result.routes[0];
		        			var steps = route.steps;
		        			for(var i = 0; i < steps.length; i++){
		        				var path = steps[i].path;
		        				for(var j in path){
		        					paths.push(path[j]);
		        				}
		        			}
		        		}
		        		
		        		carMarker.moveAlong(paths, 50 * 1000);
				}
			});
		});
		
	});
	
	var tag = 0;
	$('.danmu').on('click', function(){
		if(tag % 2 === 0){
			$('#tanmu_div').css('visibility', 'visible');
		}else{
			$('#tanmu_div').css('visibility', 'hidden');
		}
		tag ++;
	});
	
})(window, $);
