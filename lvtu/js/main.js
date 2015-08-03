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
	var routes = window.routes1;
	var hasRoutes = false;
	var contents = [];
	
	$('#search_router').on('focus', function(){
		$('.search_list').fadeIn();
	});
	
	$('.search_list').on('click', function(e){
		var el = $(e.target);
		var index = el.attr('_index');
		routes = window['routes' + index];
		$('#search_router').val(el.text());
		$('.search_list').fadeOut();
	});
	
	$('.search_btn').on('click', function(e){
		//天气
	    AMap.service(['AMap.Weather'], function(){
	    		var we = new AMap.Weather();
	    		we.getLive(routes[routes.length - 1].content, function(err, status){
	    			console.log(status);
	    			$('#tem_yin').text(status.weather);
	    			$('#tem_du').text(status.temperature + '℃');
	    			$('#tem_feng').text(status.windDirection + '风');
	    		});
	    });
		map.clearMap();
		map.setZoom(13);
		$('.timeline').empty();
		if(origin){
			map.panTo(origin);	
		}
		if(timelineIn){
			clearInterval(timelineIn);
		}
		if(disTime){
			disTime = [];
		}
		if(timelineIndex){
			timelineIndex = 0;
		}
		if(carHandle){
			clearInterval(carHandle);
			carHandle = null;
		}
		
		$('.timeline_pannel').css('visibility', 'visible');
		doTimeline();
		hasRoutes = true;
		AMap.service(['AMap.Driving'], function(){
			origin = new AMap.LngLat(routes[0].x, routes[0].y);
			destination = new AMap.LngLat(routes[routes.length - 1].x, routes[routes.length - 1].y);
			//绘制起终点icon
			addSEIcon(origin, destination);
			//驾车路线导航
			contents = [];
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
		markers = [];
		for(var i in wayPoints){
			var content = '<div index=' + i + ' style="background-color:#22BBFF;color:#fff;width:60px;height:26px';
			content += ';text-align:center;line-height:26px;">' + contents[i] + '</div>';
			var marker = new AMap.Marker({map: map, position: wayPoints[i], content: content});
			marker.__index = i;
			markers.push(marker);
			AMap.event.addListener(marker, 'click', function(e){
				var index = e.target.__index;
				var cn = parseInt(index);
				var arTime = getTime(index);
				
				var infoWindow = new AMap.InfoWindow({
					position: markers[cn].getPosition(),
					isCustom: true,
					offset:new AMap.Pixel(20, -35),                 
  					content:strHTML(routes[cn].content,routes[cn + 1].content,arTime,disTime[index].time,disTime[index].distance,disTime[index].speed)
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
	//模拟车真实速度
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
	var carMarkerTag = 0;
	
	$('#_alert_close').on('click', function(){
		$('#_alert').fadeOut();
		$('.add_mask').fadeOut();
	});
	
	$('.car_run_show').on('click', function(){
		if(!hasRoutes){
			$('.add_mask').fadeIn();
			$('#_alert').fadeIn();
			return;
		}

		doSpeed();
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
		        		
		        		carMarker.moveAlong(paths, 500 * 1000);
				}
			});
		});
		//开启小车监控
		runCar();
	});
	
	//开启、关闭弹幕
	var tag = 0;
	$('.danmu').on('click', function(){
		if(tag % 2 === 0){
			$('#tanmu_div').css('height', '194px');
			$('#tanmu_div').css('left', '0');
			$('#tanmu_div').css('top', '');
			$('#tanmu_div').css('visibility', 'visible');
		}else{
			$('#tanmu_div').css('height', '0');
			$('#tanmu_div').css('left', '-999px');
			$('#tanmu_div').css('top', '-999px');
			$('#tanmu_div').css('visibility', 'hidden');
		}
		tag ++;
	});
	
	//获取小车的位置
	//获取index
	var realCarIndex = 0;
	var timelineIndex = 0;
	var carHandle = null;
	function runCar(){
		timelineIndex = 0;
		carHandle = setInterval(function(){
			if(!carMarker){
				return;
			}
			var carPos = carMarker.getPosition();
			//设置地图级别和跟踪
			map.setZoom(12);
			map.panTo(carPos);
			for(var i in routes){
				if(i < (routes.length) && i > 0 && Math.abs(carPos.lng - routes[i].x) < 0.001 && Math.abs(carPos.lat - routes[i].y) < 0.001){
					var index = parseInt(i-1);
					timelineIndex = parseInt(i);
					realCarIndex = index;
					var arTime = getTime(index);
					var infoWindow = new AMap.InfoWindow({
						position: carPos,
						isCustom: true,
						offset:new AMap.Pixel(50, -50),
						content:strHTML(routes[index].content,routes[parseInt(i)].content,arTime,disTime[index].time,disTime[index].distance,disTime[index].speed)
					});
					infoWindow.open(map);
					
					setTimeout(function(){
						$('._in_close').on('click', function(){
							infoWindow.close();
						});
					}, 1000);
					
					if(index < markers.length){
						//将marker设置成绿色
						var content = '<div index=' + i + ' style="background-color:#00C348;color:#fff;width:60px;height:26px';
						content += ';text-align:center;line-height:26px;">' + contents[index] + '</div>';
						markers[index].setContent(content);
						
						
					}
					if(index < markers.length - 1){
						var oldStr = markers[index + 1].getContent();
						//将marker设置成红色
						var html = '<div class="firebug_flash" index=' + i + ' style="color:#fff;width:60px;height:26px';
						html += ';text-align:center;line-height:26px;">' + contents[index + 1] + '</div>';
						
						if(oldStr !== html){
							markers[index + 1].setContent(html);
						}
					}
					
				}
				
				if(Math.abs(carPos.lng - routes[routes.length-1].x) < 0.01 && Math.abs(carPos.lat - routes[routes.length-1].y) < 0.01){
					clearInterval(carHandle);
					clearInterval(realSpeedHandle);
				}
			}
		}, 100);
	}

	function strHTML(contentA, contentB, arTime, time, distance, speed){
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
		styles += ' a{text-decoration:none;color:#484848;} a:hover{color:#484848;}';
		styles += '</style>';
		
		var picIndex =Math.floor(Math.random()*5);
		
		var contentHTML  = styles + '<div class="_in_bg">';
		contentHTML += '<div class="_in_close"><img src="img/iw-close.png" /></div>';
		contentHTML += '<div class="_in_title">';
		contentHTML += '<span>' + contentA + '</span>';
		contentHTML += '<img src="img/arrow.png"/>';
		contentHTML += '<span>' + contentB + '</span></div>';
		contentHTML += '<div style="height:90px;"><div style="float:left"><div style="margin-top:4px;">';
		contentHTML += '<span class="_in_key">到达时间：</span><span class="_in_key_val">' + arTime + '</span>';
		contentHTML += '</div><div><span class="_in_key">时长：</span>';
		contentHTML += '<span class="_in_key_value">' + time + ' 分钟</span></div>';
		contentHTML += '<div><span class="_in_key">距离：</span>';
		contentHTML += '<span class="_in_key_value">' + distance + ' km</span>';
		contentHTML += '</div>';
		contentHTML += '<div>';
		contentHTML += '<span class="_in_key">时速：</span>';
		contentHTML += '<span class="_in_key_value">' + speed + ' km/h</span>';
		contentHTML += '</div>';
		contentHTML += '</div><div style="float:right;" class="_in_city_story">';
		contentHTML += '<img src="' + pics[picIndex] + '"/></div></div>';
		contentHTML += '<div class="_in_story">';
		contentHTML += '<div><a target="_blank" href="' + urls[0] +'">那座城市，那个人， 特价¥899</a></div>';
		contentHTML += '<div><a target="_blank" href="' + urls[1] +'">再美不如苏州园林， 门票：¥40</a></div>';
		contentHTML += '<div><a target="_blank" href="' + urls[2] +'">苏州好吃一窝，特价团购：¥30</a></div>';
		contentHTML += '<div><a target="_blank" href="' + urls[3] +'">苏州必须去的5个景点，去了才知道</a></div>';
		contentHTML += '<div><a target="_blank" href="' + urls[4] +'">假日酒店，全家人旅行特选，机场接送</a></div></div>';
		contentHTML += '<div class="_in_arrow_down"></div></div>';
		return contentHTML;
	}
	
	function getTime(index){
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
		return arTime;
	}
	
	//获取random值时间
	function getRandomTime(time, addmin){
		var strs = time.split(':');
		var min = parseInt(strs[1]);
		var hour = parseInt(strs[0]);
		
		min = min + addmin;
		if(min >=60){
			hour += 1; 
			min = min - addmin
		}
		
		if(min < 10){
			min = '0' + min.toString();
		}
		
		if(hour >= 24){
			hour = '次日' + hour - 24;
		}
		return hour + ':' + min;
	}
	
	//获取路上所花时间
	function getHour(index){
		var endTime = 0;
		for(var n = index; n >= 0; n--){
			endTime += disTime[n].time;
		}
		var rmin = Math.ceil(Math.random() * 10);
		var str =  Math.floor(endTime/60) + ':' + Math.ceil(endTime%60);
		var realTime = getRandomTime(str, rmin);
		var strs = realTime.split(':');
		return strs[0] + '小时' + strs[1] + '分钟';
	}
	
	//获取所有距离
	function getAllDistance(){
		var dis = 0; 
		for(var i in disTime){
			dis += parseInt(disTime[i].distance);
		}
		return dis;
	}
	
	//仪表盘功能
	var myChart = echarts.init(document.getElementById('charts'));
	var option = {
		backgroundColor:'#fff',
		series : [
		    {
		    		min:0,
            		max:80,
		        name:'业务指标',
		        type:'gauge',
		        detail : {
		        		textStyle:{
		        			fontSize:18,
		        			color:'#E82D00'
		        		}
		        	},
		        data:[{value: 50, name: 'km/h'}],
		        axisLine: {            
	                lineStyle: {       
	                    width: 10
	                }
	            },
	            splitLine: {           
	                length :15,         
	                lineStyle: {       
	                    color: 'auto',
	                    width:1
	                }
	            },
	            title : {
	                textStyle: {       
	                    fontWeight: 'bolder',
	                    fontSize: 12,
	                    fontStyle: 'italic'
	                }
	            },
	            
		    },
		    
		]
	};
	
	option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
    myChart.setOption(option, true);
	
	//计算时速
	var realSpeedHandle = null;
	function doSpeed(){
		$('#real_time').text(getTime(disTime.length - 1));
		$('#real_distime').text(getHour(disTime.length - 1));
		$('#real_distance').text(getAllDistance() + 'km');
		realSpeedHandle = setInterval(function(){
			if(disTime[realCarIndex]){
				var speed = (disTime[realCarIndex].speed  - Math.random()*5).toFixed(2);
				var rmin = Math.ceil(Math.random() * 10);
				option.series[0].data[0].value = speed;
    				myChart.setOption(option, true);	
    				$('#real_speed').text(speed + 'km/h');
    				$('#real_time').text(getRandomTime(getTime(disTime.length - 1), rmin));
    				$('#real_distime').text(getHour(disTime.length - 1));
			}
			
		}, 1000);		
	}
	
	//时间轴
	var timelineIn = null;
	function doTimeline(){
		for(var i in routes){
	    		var item = '<div id=timeline_' + i + ' class="timeline_item">' + routes[i].content + '</div>';
	    		$('.timeline').append(item);
	    }
		
		
		timelineIn = setInterval(function(){
			if(disTime[timelineIndex]){
				$('#timeline_' + timelineIndex).removeClass('firebug_flash');
				$('#timeline_' + timelineIndex).css('backgroundColor', '#989693');
				$('#timeline_' + (timelineIndex + 1)).addClass('firebug_flash').css('backgroundColor', '#DE007D');
			}
		}, 1000);
	}
    
    //开启、关闭投票
	var tou_tag = 0;
	$('.toupiao').on('click', function(){
		if(tou_tag % 2 === 0){
			$('#toupiao_frame').fadeIn();
		}else{
			$('#toupiao_frame').fadeOut();
		}
		tou_tag ++;
	});
	
	
})(window, $);
