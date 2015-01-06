(function(global){
	
	var canlendar = new Calendar('calendar',new Date('2015-1'));
	canlendar.showUI(function(date){
		document.getElementById('calendar_time').innerHTML = date;
	});
	
	
	document.getElementById('guid').onclick = function(){
		alert(11);
	};
	
	
	
	
	
})(this);
