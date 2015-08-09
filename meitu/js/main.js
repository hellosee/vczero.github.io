requirejs.config({
	baseUrl: 'js'
});


requirejs([ 
		'lib/fastclick',
		'lib/underscore',
		'home/map',
		'home/events',
		'home/dashboard',
		'home/router',
		'home/info',
		'home/tools',
		'home/search'
	], 
	function(fastclick) {
		fastclick(document.body);
});