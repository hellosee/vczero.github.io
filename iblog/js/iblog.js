/*
	i bolg API
*/



var ibolg = function(options){
	var defOptions ={
		logo: '../imgs/logo.png',
		name: '我的博客',
		menu: {
			show: true,
			color: '#D0D0D0',
			width: '160px',
			height: '300px',
			menu_item:[ 
				{
					item_name: '菜单1',
					background: ''
				},
				{
					item_name: '菜单2',
					background: ''
				},
				{
					item_name: '菜单3',
					background: ''
				},
				{
					item_name: '菜单4',
					background: ''
				},
				{
					item_name: '菜单5',
					background: ''
				},
			]
		}
		footer: true
	};
	this.options = {};
	if(options){
		this.options.logo = options.logo || defOptions.logo;
		this.options.name = options.name || defOptions.name;
		this.options.menu = options.menu || defOptions.menu;
		this.options.footer = options.footer || defOptions.footer;
	}else{
		this.options = defOptions;
	}
};


//初始化配置，需要哪些功能
ibolg.prototype.init = function(){
	if(this.options.menu){
		this.addMenu();
	}
	if(this.options.footer){
		this.addFooter();
	}
}


ibolg.prototype.addMenu = function(){

}

ibolg.prototype.addFooter = function(){

}