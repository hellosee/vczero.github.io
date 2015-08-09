requirejs.config({
	baseUrl: 'js'
});


requirejs([ 
		'lib/fastclick',
		'lib/underscore',
		'home/map',
		'home/dashboard',
		'home/router',
		'home/info',
		'home/tools',
		'home/search'
	], 
	function(fastclick,underscore, map, router) {
		fastclick(document.body);
});