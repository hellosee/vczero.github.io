/*
	list
*/

$(function(){
	seajs.use('./blog/blogs_link.js', function(exports){
		var url = window.location.search; 
		var type = url.split('type=')[1];
		var links = exports.blogs;

		var linksArr = [];
		for(var i = 0; i < links.length; i++){
			if(links[i].type == type){
				linksArr.push(links[i]);
			}
		}
		createList(linksArr, 100);
	});

	function createList(links, n){
		var num = n > links.length ? links.length:n;
		var element = $('#showlinklist'); 
	    var tpl = $('#tpl_links').html();
	    var mylinks = [];
	    for(var i = 0; i < num; i++){
	    	mylinks.push(links[i]);
	    }
		var data = {  
		    list: mylinks
		}

		console.log(data);
		var html = _.template(tpl, data);
		element.html(html); 

	}

});