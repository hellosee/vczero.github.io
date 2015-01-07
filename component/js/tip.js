/*
 * tip: when mouse over a element, will be show a tip(detail div)
 * For example:
 * 		when mouse over a user's avatar, will be show some user's infomation in tip.
 * 		Later, I will apply it to the project of OurTimes.
 * */
(function(exports){
	/* id: target element id  
	 * opts: json obj, is optional
	 * 		width: number, 宽度
	 * 		height: number, 高度
	 * 		backgroundColor: '#ccc', 背景颜色
	 * 		border:'1px solid blue', 边框
	 * 		offsetTop: number,
	 * 		offsetLeft: number,
	 * 		content: HTML string
	 * otherCSS: css text, is optional
	 * */
	function Tip(id, opts, otherCSS){
		var tipContainer = document.getElementById(id);
		var tip = document.createElement('div');
		//user define css property
		tip.style.width = (opts && opts.width) ? (opts.width + 'px') : '150px';
		tip.style.height = (opts && opts.height) ? (opts.height + 'px') : '100px';
		tip.style.backgroundColor = (opts && opts.backgroundColor) ? opts.backgroundColor : '#DDD';
		tip.style.border = (opts && opts.border) ? opts.border : '1px solid #CCC';
		//offset
		var left = (opts && opts.offsetLeft) ? (tipContainer.offsetLeft - opts.offsetLeft): tipContainer.offsetLeft;
		var top = (opts && opts.offsetTop) ? (tipContainer.offsetTop - opts.offsetTop): tipContainer.offsetTop;
		//modify?
		tip.style.left = left + 'px';
		tip.style.top = (top + tipContainer.offsetHeight)  + 'px';
		//default css property
		tip.style.zIndex = 100;
		tip.style.position = 'absolute';
		tip.style.display = 'none';
		tip.innerHTML = opts.content;
		//other css text
		if(otherCSS){
			tip.style.cssText = otherCSS;
		}
		//append to parent
		tipContainer.appendChild(tip);
		function show(){
			tip.style.display = 'block';
		}
		
		function hide(){
			tip.style.display = 'none';
		}
		
		if(!!tipContainer.addEventListener){
			tipContainer.addEventListener('mouseenter', show);
			tipContainer.addEventListener('mouseleave', hide);
		}else if(!!tipContainer.attachEvent){
			tipContainer.attachEvent('mouseenter', show);
			tipContainer.attachEvent('mouseleave', hide);
		}else{
			tipContainer.onmouseenter = show;
			tipContainer.onmouseleave = hide;
		}
	}
	exports.Tip = Tip;
})(window);
