/*
	集合所有的博客
*/
define(function(require, exports, module){
	var blogs = [];
	
	var blog_5 = require('./2014-07-06.js');
	var blog_4 = require('./2014-07-03.js');
	var blog_3 = require('./2014-06-30.js');
	var blog_2 = require('./2014-06-24.js');
	var blog_1 =  require('./2014-06-21.js'); 

	blogs.push(blog_5.blog_2014_07_06);
	blogs.push(blog_4.blog_2014_07_03);
	blogs.push(blog_3.blog_2014_06_30);
	blogs.push(blog_2.blog_2014_06_24);
	blogs.push(blog_1.blog_2014_06_21);

	exports.blogs = blogs;
});