requirejs.config({
	baseUrl: 'js'
});


requirejs([
		'lib/zepto_pj', 
		'home/map',
		'lib/underscore',
		'home/dashboard'
	], 
	function(zepto_pj, map, underscore) {
		
});