/*
	博客详情页
*/
define(function(require, exports, module){
	var blogs = {};

	var blog_2 = require('./2014-06-24.js');
	var blog_1 =  require('./2014-06-21.js'); //取得外界exs  -> 调用exs的blog
	
	blogs['blog_2014_06_24'] = blog_2.blog_2014_06_24;
	blogs['blog_2014_06_21'] = blog_1.blog_2014_06_21;

	exports.blogs = blogs;
});