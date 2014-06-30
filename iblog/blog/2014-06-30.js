define(function(require, exports, module){
	var types = require('./type.js');

	var blog_2014_06_30 = {
		id:'blog_2014_06_30',
		title: '<a class="title_a" href="article.html?id=blog_2014_06_30">关于git和svn</a>',
		blog_tags: ['git', '习惯'],
		blog_time: '2014-06-30 12:53',
		type: types.type.story,
		blog_p:[
			{
				title: '习惯是一种伟大的力量',
				content:['这两天忙毕业的事和回北京，因为没有网，就没上github，也没有写代码，感觉缺少了版本管理和github就空落落的，也许现在使用git和上网都是一种习惯了。']
			}
		]
	};



	
	exports.blog_2014_06_30 = blog_2014_06_30;


});