requirejs.config({
	baseUrl: 'js'
});


requirejs([ 
		'lib/fastclick',
		'lib/underscore',
		'home/map',
		'home/dashboard',
		'home/info',
		'home/tools',
		'home/search'
	], 
	function(fastclick) {
//		fastclick(document.body);
});