/*canvas绘制路线*/
define('home/router', function(require, exports, module) {

	var $ = require('lib/zepto');
	var canvas = $('#router_canvas')[0];
	var ctx = canvas.getContext('2d');
	
	canvas.width = 40;
	canvas.height = 200;
	
	//line
	ctx.beginPath();
	var gradient = ctx.createLinearGradient(20, 5, 20, 195);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'yellow');
	ctx.lineWidth = '2';
	ctx.strokeStyle = gradient;
	ctx.moveTo(20, 5);
	ctx.lineTo(20, 195);
	ctx.closePath();
	ctx.stroke();
	
	//circle
	for(var i = 0; i < 7; i++){
		ctx.beginPath();
		ctx.fillStyle = '#0091FF';
        ctx.arc(20, 25 + i * 25, 5, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
	}
	
});