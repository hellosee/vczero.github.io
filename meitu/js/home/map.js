
/*地图相关的基础数据*/
define('home/map', function(require, exports, module){
	
	//获取路线数据
	var router = require('common/data').router;
	
	//初始化地图
	var map = new AMap.Map('map', {
		mapStyle: 'fresh',
		resizeEnable: true,
	});
	
	//途经点
	var wayPoints = [];
	//起点
	var origin = null;
	//终点
	var destination = null;
	//默认路线
	var routes = router[0];
	
	//
	var hasRoutes = false;
	
	//
	var contents = [];

	return {
		map: map,
		wayPointer: wayPoints,
		origin: origin,
		destination: destination,
		routes: routes,
		hasRoutes: hasRoutes,
		contents: contents
	}

});