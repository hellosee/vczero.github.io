/*
	tpl渲染博客内容
*/

$(function(){
	seajs.use('./blog/blogs.js', function(exports){
		var blogs = exports.blogs;
		createBlogs(blogs, 100);
	});

	function createBlogs(blogs, n){
		var blogs = blogs;
		var num = n > blogs.length ? blogs.length:n;
		var element = $('#showblog'); 
	    var tpl = $('#tpl_blog').html();
	    var myBlogs = [];
	    for(var i = 0; i < num; i++){
	    	myBlogs.push(blogs[i]);
	    }
		var data = {  
		    list: myBlogs
		}   
		var html = _.template(tpl, data);
		element.html(html); 
	}	
});


 