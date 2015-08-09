requirejs.config({
	baseUrl: 'js'
});


requirejs([ 
		'lib/fastclick',
		'home/map',
		'home/dashboard',
		'home/router',
		'home/info',
		'home/tools',
		'home/search'
	], 
	function(fastclick, map, router) {
		fastclick(document.body);
});