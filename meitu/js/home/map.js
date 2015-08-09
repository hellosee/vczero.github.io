
define('home/map', function(require, exports, module){

	//初始化地图
	var map = new AMap.Map('map', {
		mapStyle: 'fresh',
		resizeEnable: true,
	});
	
	return map;

});