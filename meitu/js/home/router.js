/*绘制路线*/
define('home/router', function(require, exports, module) {

	var $ = require('lib/zepto');
	var router = require('common/data').router[0];
	var wrapper = $('#ROUTER_TPL');
  	var tpl = $('#tpl_router').html();
  	
  	var data = {
  		items: router
  	};
  	
  	var html = _.template(tpl)(data);
  	wrapper.html(html);
	
	
});