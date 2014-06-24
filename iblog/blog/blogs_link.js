/*
	集合所有的博客的链接
*/

define(function(require, exports, module){
	var blogs = [];
	var blog_2 = require('./2014-06-24.js');
	var blog_1 =  require('./2014-06-21.js'); 


	blogs.push(createObj(blog_2.blog_2014_06_24));
	blogs.push(createObj(blog_1.blog_2014_06_21));

	function createNewObj = function(obj){
		return {
			id: obj.id,
			title: obj.title,
			blog_tags: obj.blog_tags,
			blog_time: obj.blog_time
		};
	}
	

	exports.blogs = blogs;
});