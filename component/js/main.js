(function(global){
	var calendar_codeshow = document.getElementById('calendar_codeshow');
	var guid_codeshow = document.getElementById('guid_codeshow');
	var cookie_codeshow = document.getElementById('cookie_codeshow');
	var tip_codeshow = document.getElementById('tip_codeshow');
	var mask_container = document.getElementById('mask_container');
	
	//日历
	var canlendar = new Calendar('calendar',new Date('2015-1'));
	canlendar.showUI(function(date){
		document.getElementById('calendar_time').innerHTML = date;
	});
	//GUID
	var guid_textarea = document.getElementById('guid_textarea');
	guid_textarea.value = guid.create();
	
	//mask
	new Mask('mask_container').show();
	
	//tip
	Tip('tip_avatar', {
		content: '<img src="img/avatar.png"/>',
		height: 200,
		width:200
	});
	
	setShow('calendar_codeshow');
	//初始化hash
	var hash = window.location.hash;
	if(hash){
		switch(hash){
			case '#calendar':
				setShow('calendar_codeshow');
				break;
			case '#guid':
				setShow('guid_codeshow');
				break;
			case '#cookie':
				setShow('cookie_codeshow');
				break;
			case '#tip':
				setShow('tip_codeshow');
				break;
			case '#mask':
				setShow('mask_container');
				break;
		    default:
		    	setShow('calendar_codeshow');
		    	break;
		}
	}
	
	
	document.getElementById('calendar_menu').onclick = function(){
		window.location.hash = 'calendar';
		setShow('calendar_codeshow');
	};
	//GUID
	document.getElementById('guid').onclick = function(){
		window.location.hash = 'guid';
		setShow('guid_codeshow');
	};
	document.getElementById('guid_genrator').onclick = function(){
		guid_textarea.value = guid.create();
	};
	//cookie
	document.getElementById('cookie').onclick = function(){
		window.location.hash = 'cookie';
		setShow('cookie_codeshow');
	};
	document.getElementById('allCookie').value = JSON.stringify(cookie.getCookies());
	document.getElementById('setCookie').onclick = function(){
		var name = document.getElementById('cookie_name').value || '';
		var value = document.getElementById('cookie_value').value || '';
		if(name && value){
			cookie.set(name, value);
		}
		document.getElementById('allCookie').value = JSON.stringify(cookie.getCookies());
	};
	
	
	document.getElementById('tip').onclick = function(){
		window.location.hash = 'tip';
		setShow('tip_codeshow');
	};
	
	document.getElementById('mask').onclick = function(){
		window.location.hash = 'mask';
		setShow('mask_container');
	};
	
	
	
	//控制div的显示与隐藏
	function setShow(name){
		calendar_codeshow.style.display = 'none';
		guid_codeshow.style.display = 'none';
		cookie_codeshow.style.display = 'none';
		tip_codeshow.style.display = 'none';
		mask_container.style.display = 'none';
		
		switch(name){
			case 'calendar_codeshow':
			    calendar_codeshow.style.display = 'block';
			    break;
		   case 'guid_codeshow':
		   	    guid_codeshow.style.display = 'block';
			    break;
		   case 'cookie_codeshow':
		   	    cookie_codeshow.style.display = 'block';
			    break;
		   case 'tip_codeshow':
		   	    tip_codeshow.style.display = 'block';
			    break;
		    case 'mask_container':
		   	    mask_container.style.display = 'block';
			    break;
		    default:
		    	break;
		}
	};
	
	
	
})(this);
