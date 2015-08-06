requirejs.config({
	baseUrl: 'js'
});


requirejs([
		'lib/zepto_pj', 
		'home/map',
		'lib/underscore',
		'home/dashboard',
		'home/router'
	], 
	function(zepto_pj, map, underscore, router) {
		
});