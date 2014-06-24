define(function(require, exports, module){
	var types = require('./type.js');

	var blog_2014_06_24 = {
		id:'blog_2014_06_24',
		title: '<a class="title_a" href="article.html?id=blog_2014_06_24">关于git和svn</a>',
		blog_tags: ['git', 'svn' , '版本控制'],
		blog_time: '2014-06-24 09:38',
		type: types.type.versionControl,
		blog_p:[
			{
				title: 'git or svn',
				content:[ 
				'刚才一同学跟我说，他们班在群里聊git vs svn。说git各种高大上，各种命令，其实这些跟svn一样，都是版本控制。git也可以搭建私有的版本服务。git的优势个人觉得就是与github天然的结合，创造了一个良好的开源的生态圈，这是我们程序员最大的受益者。在github上可以托管自己的项目，也可以发布开源自己的项目，各种管理机制良好。熟悉git命令只是一时半会的事，能坚持版本控制和加入开源环境才是最为重要的。'
				]
			}
		]
	};



	
	exports.blog_2014_06_24 = blog_2014_06_24;


});


