/*
 * Mask: You can use the function in your project, 
 * 	when don't want the user to pay attention to inside information of DIV.
 */
(function(exports){
	var Mask = function(id/*target element id*/, otherCssObj /*is a json obj, like css text*/){
		var mask = document.getElementById(id);
		var width = mask.offsetWidth;
		var height = mask.offsetHeight;
		this.div = document.createElement('div');
		
		this.div.style.position = 'absolute';
		this.div.style.left = mask.offsetLeft + 'px';
		this.div.style.top = mask.offsetTop + 'px';
		this.div.style.zIndex = 300;
		this.div.style.width = width + 'px';
		this.div.style.height = height + 'px';
		this.div.style.backgroundColor = '#000';
		this.div.style.opacity = 0.5; // 考虑
		
		//add other css, like backgroundColor、border...
		if(otherCssObj){
			for(var key in otherCssObj){
				this.div.style[key] = otherCssObj[key];
			}
		}
		mask.appendChild(this.div); 
		this.div.style.display = 'none';
	};
	
	Mask.prototype.show = function(){
		this.div.style.display = 'block';
	};
	
	Mask.prototype.hide = function(){
		this.div.style.display = 'none';
	};
	
	
	exports.Mask = Mask;
})(window);
