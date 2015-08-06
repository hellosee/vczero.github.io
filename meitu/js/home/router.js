/*canvas绘制路线*/
define('home/router', function(require, exports, module) {

	var $ = require('lib/zepto');
	var router = require('common/data').router[0];
	var canvas = $('#router_canvas')[0];
	var ctx = canvas.getContext('2d');
	
	canvas.width = 45;
	canvas.height = 220;
	
	//line
	ctx.beginPath();
	var gradient = ctx.createLinearGradient(35, 5, 20, 215);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'yellow');
	ctx.lineWidth = '2';
	ctx.strokeStyle = gradient;
	ctx.moveTo(35, 5);
	ctx.lineTo(35, 215);
	ctx.closePath();
	ctx.stroke();
	
	//circle
	for(var i = 0; i < router.length; i++){
		ctx.beginPath();
		ctx.fillStyle = '#0091FF';
        ctx.arc(35, 25 + i * 25, 5, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = '#4C4C4C';
        ctx.fillText(router[i].content, 2, 25 + 5 + i * 25);
        ctx.closePath();
        ctx.fill();
	}
	
});