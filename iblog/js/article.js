/*
	tpl渲染博客内容
*/

$(function(){
	seajs.use('./blog/blogs_details.js', function(exports){
		var url = window.location.search; 
		var id = url.split('id=')[1];
		
		var blog = exports.blogs[id];
		var bs = [];
		bs.push(blog);
		createBlog(bs, 100);
	});

	function createBlog(blogs, n){
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
