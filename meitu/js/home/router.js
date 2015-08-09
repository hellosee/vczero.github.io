/*canvas绘制路线*/
define('home/router', function(require, exports, module) {

	var $ = require('lib/zepto');
	var router = require('common/data').router[0];
	var wrapper = $('#ROUTER_TPL');
  	var tpl = $('#tpl_router').html();
  	
  	var data = {
  		items: router
  	};
  	
  	console.log(data.items);
  	var html = _.template(tpl)(data);
  	wrapper.html(html);
	
//	var canvas = $('#router_canvas')[0];
//	var ctx = canvas.getContext('2d');
//	
//	canvas.width = 45;
//	canvas.height = 220;
//	canvas.style.width = 45;
//	canvas.style.height = 220;
//	
//	//line
//	ctx.beginPath();
//	var gradient = ctx.createLinearGradient(35, 5, 20, 215);
//  gradient.addColorStop(0, 'red');
//  gradient.addColorStop(1, 'yellow');
//	ctx.lineWidth = '2';
//	ctx.strokeStyle = gradient;
//	ctx.moveTo(35, 5);
//	ctx.lineTo(35, 215);
//	ctx.closePath();
//	ctx.stroke();
	
	//circle
//	for(var i = 0; i < router.length; i++){
//		ctx.beginPath();
//		ctx.fillStyle = '#159AFE';
//      ctx.arc(35, 25 + i * 25, 5, 0, Math.PI*2, true);
//      ctx.closePath();
//      ctx.fill();
//      
//      ctx.beginPath();
//      ctx.fillStyle = '#000';
//      ctx.fillText(router[i].content, 2, 25 + 3 + i * 25);
//      ctx.closePath();
//      ctx.fill();
//	}
	
});