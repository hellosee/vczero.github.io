/*
	博客详情页
*/
define(function(require, exports, module){
	var blogs = {};

	var blog_4 = require('./2014-07-03.js');
	var blog_3 = require('./2014-06-30.js');
	var blog_2 = require('./2014-06-24.js');
	var blog_1 =  require('./2014-06-21.js'); //取得外界exs  -> 调用exs的blog
	

	blogs['blog_2014_07_03'] = blog_4.blog_2014_07_03;
	blogs['blog_2014_06_30'] = blog_3.blog_2014_06_30;
	blogs['blog_2014_06_24'] = blog_2.blog_2014_06_24;
	blogs['blog_2014_06_21'] = blog_1.blog_2014_06_21;

	exports.blogs = blogs;
});