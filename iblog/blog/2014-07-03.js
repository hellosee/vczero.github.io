define(function(require, exports, module){
	var types = require('./type.js');

	var blog_2014_07_03 = {
		id:'blog_2014_07_03',
		title: '<a class="title_a" href="article.html?id=blog_2014_07_03">Discuz!很强大</a>',
		blog_tags: ['Discuz', '论坛'],
		blog_time: '2014-07-03 11:40',
		type: types.type.story,
		blog_p:[
			{
				title: '',
				content:['这两天接到一个论坛的项目。以前都没有完全做一个论坛。起初打算是自己完全从头开发，做一个基本的论坛，但是发现这样的话，周期很长。于是寻找各种开源框架，初步选定是JAVAEE的，但是却发现没有一个很好的解决方案。于是还是选择了Discuz，尽管对PHP不熟。折腾了两天的Discuz发现果真很强大，可以定制自己的论坛。当然如果需要更好的地址，就需要开发模板了。']
			}
		]
	};



	
	exports.blog_2014_07_03 = blog_2014_07_03;


});