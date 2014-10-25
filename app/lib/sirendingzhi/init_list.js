define(function(require, exports, module) {
	var ajax = require('util/ajax');
	var urlConfig = require('server/config');
	var renderer = require('util/render');
	var getImg = require('util/getImg');
	
	var renderIndex = function(){
		var params = Array.prototype.slice.call(arguments);
		for(var  i = 0; i <params.length; i++){
			renderer.render('tpl_item' + (i + 1), 'div_item' + (i + 1), params[i]);
		}
	};
	
	var render_init = function(url, query){
		renderer.render('tpl_title', 'div_title', {title:query.dazhou});
		ajax.get(url, function(data){
				if(data.status){
					//判断分页
					if(data.param.pageSize >1 && data.param.pageSize <= 5){
						$('#page_li').show();
						$('#pre_li').hide();
						$('#next_li').hide();
					}
					if(data.param.pageSize > 5){
						$('#page_li').show();
						$('#pre_li').show();
						$('#next_li').show();
					}
					if(data.param.pageSize <=1){
						$('#page_li').hide();
					}
					
					$('#page_li').hide();
										
					var data = data['xiangmuMoleList'];
					getImg.getImg(data);
					if(data.length !== 0){
						//此处UI界面改造麻烦，只能做8个TPL显示
						switch(data.length){
							case 1:
								renderIndex(data[0]);
								break;
							case 2:
								renderIndex(data[0], data[1]);
								break;
							case 3:
								renderIndex(data[0], data[1], data[2]);
								break;
							case 4:
								renderIndex(data[0], data[1], data[2], data[3]);
								break;
							case 5:
								renderIndex(data[0], data[1], data[2], data[3], data[4]);
								break;
							case 6:
								renderIndex(data[0], data[1], data[2], data[3], data[4], data[5]);
								break;
							case 7:
								renderIndex(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
								break;
							case 8:
								renderIndex(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
								break;
							default:
								break;
						}
						
					}else{
						$('#page_li').hide();
						
					}
					
				}else{
					$('#page_li').hide();
					
				}
				
			}, query);
		
	};
	
	
	
	module.exports = {	
		render_init: render_init
	};
	
	
//	$("#srdz_box").cgPictureEffect({
//		picture:".scroll_srdz",
//		thumbPicture:".small-pic",
//		disbledClass:"btn-disable",
//		current:1,
//		thumbEffect:{
//			style:"icon",
//			type:null,
//			selectedClass:"small-hover"
//		},
//		effect:{
//			type:"fade",
//			speed:2000
//		}
//	});		
});