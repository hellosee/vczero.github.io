window.onload = function(){
	var dc = new MyChart('canvas');
	dc.drawArcF();
	dc.drawArcB();
	dc.detail();
	dc.drawBaseInfo();
	dc.projectInfo();
	dc.actrcle();
}

var MyChart = function(canvas){
	this.canvas = document.getElementById(canvas);
	this.context = this.canvas.getContext('2d');
};

MyChart.prototype.drawArcF = function(){
	//开环
	this.context.fillStyle = '#898989';
	this.context.beginPath();
	this.context.arc(100,100,70,200*Math.PI/180,340*Math.PI/180);
	this.context.closePath();
	this.context.fill();
	//掩盖
	this.context.fillStyle = '#2B2B2B';
	this.context.beginPath();
	this.context.arc(100,100,50,0,200*Math.PI/180,340*Math.PI/180);
	this.context.closePath();
	this.context.fill();

	//前指针
	this.context.fillStyle = '#FFDF00';
	this.context.beginPath();
	this.context.moveTo(96,120);
	this.context.lineTo(104,120);
	this.context.lineTo(115,45);
	this.context.fill();

	//指针底部的圆角
	this.context.fillStyle = '#FFDF00';
	this.context.beginPath();
	this.context.arc(100,120,4,0,2*Math.PI);
	this.context.fill();

	this.context.font="normal  normal normal 14px arial";
	//标码-0
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(0,30,95);

	//标码-100
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(100,155,95);

	//标码-66
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(66,115,20);

	//前端线
	this.context.strokeStyle = '#383838';
	this.context.beginPath();
	this.context.lineWidth = 1;
	this.context.moveTo(30,170);
	this.context.lineTo(150,170);
	this.context.stroke();

	//标码-66
	this.context.fillStyle ='#FFFFFF';
	this.context.font="12px Arial";
	this.context.fillText('前端',30,160);
}

MyChart.prototype.drawArcB = function(){
	//开环
	this.context.fillStyle = '#898989';
	this.context.beginPath();
	this.context.arc(300,100,70,200*Math.PI/180,340*Math.PI/180);
	this.context.closePath();
	this.context.fill();
	//掩盖
	this.context.fillStyle = '#2B2B2B';
	this.context.beginPath();
	this.context.arc(300,100,50,0,200*Math.PI/180,340*Math.PI/180);
	this.context.closePath();
	this.context.fill();

	//后指针
	this.context.fillStyle = 'red';
	this.context.beginPath();
	this.context.moveTo(296,120);
	this.context.lineTo(304,120);
	this.context.lineTo(340,45);
	this.context.fill();


	//指针底部的圆角
	this.context.fillStyle = 'red';
	this.context.beginPath();
	this.context.arc(300,120,4,0,2*Math.PI);
	this.context.fill();

	this.context.font="normal  normal normal 14px arial";

	//标码-0
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(0,230,95);

	//标码-100
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(100,355,95);

	//标码-80
	this.context.strokeStyle ='#FFFFFF';
	this.context.strokeText(80,348,28);

	//后端线
	this.context.strokeStyle = '#383838';
	this.context.beginPath();
	this.context.lineWidth = 1;
	this.context.moveTo(230,170);
	this.context.lineTo(350,170);
	this.context.stroke();
	this.context.closePath();

	//标码-80
	this.context.fillStyle ='#FFFFFF';
	this.context.font ='12px Arial';
	this.context.fillText('后端',330,160);
}

MyChart.prototype.detail = function(){
	//66D038
	this.context.fillStyle ='#66D038';
	this.context.font = '30px Arial';
	this.context.fillText('Detail',30,220);

	this.context.beginPath();
	this.context.lineWidth = 0.5;
	this.context.moveTo(30,240);
	this.context.lineTo(30,500);
	this.context.stroke();
	this.context.closePath();

	//---------技能
	var myFuns = [];
	myFuns.push('1. 熟练掌握C/C++、JAVA、.NET、Node.js等服务端语言');
	myFuns.push('2. 熟练掌握web开发：HTTP、jsp、servlet、Tomcat、web service、WCF REST、EF');
	myFuns.push('3. 熟练掌握Oracle、MSQ等关系型数据库、MongoDB等NoSQL数据库开发');
	myFuns.push('4. 基本掌握HTML+DIV+CSS、Javascript、Jquery、AJAX等前端知识');
	myFuns.push('5. 具有扎实的GIS、LBS的专业基础和开发经验。');
	myFuns.push('6. 具有较为扎实的数据结构和算法基础，具有一定的web创新意识');
	myFuns.push('7. 熟悉基本的设计模式和B/S架构');

	for(var i = 0; i < myFuns.length; i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(myFuns[i], 40, 250 + i*21);
	}

	//----------折线图
	var myFuns_item = [];
	myFuns_item.push('C/C++');
	myFuns_item.push('Node');
	myFuns_item.push('NoSQL');
	myFuns_item.push('JAVA');
	myFuns_item.push('WEB');
	myFuns_item.push('DB');

	for(var n = 0; n < myFuns_item.length; n++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(myFuns_item[n], 50 + n*60, 500);
	}

	this.context.beginPath();
	this.context.strokeStyle = '#D6D6D6';
	this.context.moveTo(70,425); //C
	this.context.lineTo(125,432); //Node
	this.context.lineTo(185,420); //No SQL
	this.context.lineTo(245,422); //JAVA
	this.context.lineTo(305,412); //WEB
	this.context.lineTo(365,432); //DB
	this.context.stroke();
	this.context.closePath();

	this.context.beginPath();
	this.context.fillStyle = '#66CE39';
	this.context.rect(70,420,10,10);
	this.context.rect(125,427,10,10);
	this.context.rect(185,415,10,10);
	this.context.rect(245,417,10,10);
	this.context.rect(305,407,10,10);
	this.context.rect(365,427,10,10);
	this.context.fill();
	this.context.closePath();
}

//个人基本信息
MyChart.prototype.drawBaseInfo = function(){
	//绘制照片
	var image = new Image();
	image.src = 'pic/me.png';
	_context = this.context;
	image.onload = function(){
		_context.drawImage(image,770,10,130,150);
	}
	//基本信息
	var baseinfo = [];
	baseinfo.push('代号：vczero');
	baseinfo.push('生日：1991-09-24');
	baseinfo.push('公司：阿里——高德地图');
	baseinfo.push('爱好：打兵乓球');
	baseinfo.push('从业：web app服务端&矢量地图');
	baseinfo.push('E-amil：wlhmyit@126.com');

	for(var i = 0; i < baseinfo.length; i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(baseinfo[i], 525, 25 + i*21);
	}
	//在校表现
	var schoolShow = [];
	this.context.fillStyle ='#66D038';
	this.context.font = '30px Arial';
	this.context.fillText('In School',530,220);
	schoolShow.push('1. 2013年6月:ESRI杯安徽省第四届GIS开发大赛web创新设计组第一名');
	schoolShow.push('2. 2010年9月~2013年9月：连续获得校级一等奖学金（3次，3%）');
	schoolShow.push('3. 2010年9月~2013年9月：国家励志奖学金（3次，3%~5%）');
	schoolShow.push('4. 2010年9月~2013年9月：连续获得校级“三好学生”（3次，4%）');
	schoolShow.push('5. 2010年9月~2013年9月：苍穹企业奖学金（1次）、优秀团员（1次）');
	schoolShow.push('6. 2013年5月~2014年5月：主持国家级大学生创新训练项目一项，主持');
	schoolShow.push('7. 2010年9月~2013年9月：主持校级大学生科研项目2项，主持');
	schoolShow.push('8. 2010年9月~2014年6月：担任学习委员、11级地信2班助理班主任');
	schoolShow.push('9. 2012年6月~2013年6月：GIS首届会长、校技术创新团队MySpace组长');
	schoolShow.push('10. 2014年12月：荣获2014年安徽省品学兼优毕业生');
	schoolShow.push('11. 2014年5月：荣获校十佳大学生');

	for(var n = 0; n < schoolShow.length; n++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(schoolShow[n], 525, 245 + n*21);
	}

}

//项目信息
MyChart.prototype.projectInfo = function(){
	var schoolShow = [];
	this.context.fillStyle ='#66D038';
	this.context.font = '30px Arial';
	this.context.fillText('My Project',30,570);

	this.context.strokeStyle = '#383838';
	this.context.beginPath();
	this.context.lineWidth = 1;
	this.context.moveTo(30,590);
	this.context.lineTo(400,590);
	this.context.stroke();
	this.context.closePath();

	//------------------项目1
	//name:'基于设计媒体的旅游时空标签服务'
	_context = this.context;
	var image_service = new Image();
	image_service.src = 'pic/service.png';
	image_service.onload = function(){
		_context.drawImage(image_service,30,610,220,285);
	}
	var img_service_detail = [];
	img_service_detail.push('名称：基于社交媒体的旅游时空标签服务');
	img_service_detail.push('职责：组长(后端及整个框架)');
	img_service_detail.push('成果：安徽省GIS软件开发大赛一等奖');
	img_service_detail.push('简介：通过抽取安徽省、江苏省具有代表性');
	img_service_detail.push('的8个景点和南京600个POI点的微博点评数');
	img_service_detail.push('据，通过自然语言处理，提取景点的时空标');
	img_service_detail.push('签；通过GIS对时空标签(时态GIS)和景点一');
	img_service_detail.push('年的数据进行分析和可视化，构建服务平台');
	img_service_detail.push('技术方案：后端OpenAPI+.NET+MongoDB ');
	img_service_detail.push('WCF REST + SQLServer + GeoDataBase');
	img_service_detail.push('前端：AJAX+ArcGIS API for JS + JQUERY');
	for(var service_i = 0; service_i < img_service_detail.length; service_i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		var space = 0;
		if(service_i >= 3){
			space = 20;
		}
		if(service_i >=8){
			space = 40;
		}
		this.context.fillText(img_service_detail[service_i], 270, 630 + space + service_i*21);

	}

	//-----------------项目2
	//微旅行推荐系统
	var image_travel = new Image();
	image_travel.src = 'pic/travel.png';
	image_travel.onload = function(){
		_context.drawImage(image_travel,510,610,400,200);
	}
	var img_travel_detail = [];
	img_travel_detail.push('名称：微旅行推荐系统(南京市)');
	img_travel_detail.push('职责：组长(后端、部分前端及整个框架)');
	img_travel_detail.push('简介：通过分析新浪微博用户的个性特征，与景点的标签匹配，进行推荐。');

	for(var travel_i = 0; travel_i < img_travel_detail.length; travel_i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(img_travel_detail[travel_i], 510, 836 + travel_i*21);

	}
	//-----------------项目3
	//高德地图web App
	var image_amap = new Image();
	image_amap.src = 'pic/amap.png';
	image_amap.onload = function(){
		_context.drawImage(image_amap,30,940,90,90);
	}
	var img_amap_detail = [];
	img_amap_detail.push('项目：高德地图web app & JS API');
	img_amap_detail.push('职责：Node.js服务端、JS API');
	img_amap_detail.push('简介：移动设备访问http://mo.amap.com');
	img_amap_detail.push('其他：高德地图服务接口代码编写及地图相关探索');
	for(var amap_i = 0; amap_i < img_amap_detail.length; amap_i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(img_amap_detail[amap_i], 140, 960 + amap_i*21);
	}

	var schoolShow = [];
	this.context.fillStyle ='#E89640';
	this.context.font = '100px Arial';
	this.context.fillText('.',20,1100);

	var schoolShow = [];
	this.context.fillStyle ='#E89640';
	this.context.font = '100px Arial';
	this.context.fillText('.',20,1170);

	//-------------------其他项目
	var chuz = {
		name: "名称：县域国土一张图项目",
		lct : "公司：滁州市旅图信息科技有限责任公司（2013.7-2013.9）",
		renw: "职责：负责土地供应管理信息系统的后端开发"
	};

	var dilin = {
		name: "名称：公司平台",
		lct : "公司：北京地林伟业信息技术有限责任公司（2013.7-2013.9）",
		renw: "职责：研发部研发实习工程师主,平台空间数据库C++的跨平台调用"
	};

	this.context.fillStyle ='#898788';
	this.context.font = '12px Arial';
	var chuz_space =0;
	for(var k in chuz){
		this.context.fillText(chuz[k], 43, 1100 + chuz_space*21);
		chuz_space++;
	}

	var dilin_space =0;
	for(var d in dilin){
		this.context.fillText(dilin[d], 43, 1170 + dilin_space*21);
		dilin_space++;
	}

	var schoolShow = [];
	this.context.fillStyle ='#66D038';
	this.context.font = '20px Arial';
	this.context.fillText('...........',43,1234);

	//---------科研项目
	var schoolShow = [];
	this.context.fillStyle ='#66D038';
	this.context.font = '26px Arial';
	this.context.fillText('科研立项',500,960);

	this.context.strokeStyle = '#383838';
	this.context.beginPath();
	this.context.lineWidth = 1;
	this.context.moveTo(500,980);
	this.context.lineTo(900,980);
	this.context.stroke();
	this.context.closePath();

	var keyans = [];
	keyans.push('2013年主持国家级大学生创新训练项目，基于GIS滁州市公交线路优化分析');
	keyans.push('2012年主持校级科研项目：基于GIS的滁州市购房评价系统，主持');
	keyans.push('2011年主持校级科研项目：基于GIS滁州市公交线路优化分析，主持');
	keyans.push('2010年参与数据处理，国家自然科学基金项目(江汉平原早中全新世古洪水事');
	keyans.push('件考古地层学研究（40971115）)');

	for(var keyans_i = 0; keyans_i < keyans.length; keyans_i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(keyans[keyans_i], 500, 1000 + keyans_i*21);
	}

	var blog = [];
	blog.push('微博：vczero（地址http://weibo.com/u/2762275212）');
	blog.push('GitHub：vczero（地址：https://github.com/vczero）');

	for(var blog_i = 0; blog_i < blog.length; blog_i++){
		this.context.fillStyle ='#66CE39';
		this.context.font = '12px Arial';
		this.context.fillText(blog[blog_i], 500, 1147 + blog_i*21);
	}
}

MyChart.prototype.actrcle = function(){
	var ats = [];
	ats.push('        Hi,my name is vczero.我出生在一个小农村，是一个偏僻的山沟里的娃。每次最害怕的是长途的汽车导来导去，连换乘也要好多次。县里没有火车，是一个贫困县，');
	ats.push('唯一的省道还是坑坑洼洼。记得，08年南方大雪，年底回家的车都没有。尽管如此，我却不时怀念家乡，怀念儿时的玩伴。上次看到一位大牛写的文章，在IT行业里没');
	ats.push('有天才，只有苦才。呵呵，我知道肯定有聪资过人的同学，而我只是一个平常人。我相信，我不怕慢，只要 我肯往前走。从小，父亲一个人拉扯两个人(姐姐和我)上学，');
	ats.push('现在已经快60岁，或许在同伴的眼中都是爷爷辈的啦。现在，姐姐在一所学校当老师，而我已经毕业了，我终于可以扛起家庭的担子了。 感谢我老父亲把握抚养成人，');
	ats.push('感谢姐姐从小照顾不被人欺负。从小，都是好心人一路帮助我们，谢谢他们的关心照顾，谢谢初中(Mr Wang)、高中(Mr Bian)的教务主任、谢谢大学的班主任涛哥、');
	ats.push('、谢谢一路帮助我走过来的叔叔阿姨、谢谢你们!');
	ats.push('         编程上呢，大一开始写代码，大二拿了奖学金买了电脑，从此喜欢上了web，同时又蒙恩师教导(Mr Liu & Mr Jiang)。跟着C++大牛和web创新的博士一路走来，既有辛');
	ats.push('苦，又有感动。每一段过程都 倍感艰辛，但是谢谢他们的悉心指导和栽培。让明天的我感谢今天的努力。');
	ats.push('         Quit don’t quit. Noodles don’t noodles.There is a saying,Yesterday is historyTomorrow is a mystery.But today is a gift.That is why it’s called the gift');

	ats.push();
	for(var i = 0; i < ats.length; i++){
		this.context.fillStyle ='#898788';
		this.context.font = '12px Arial';
		this.context.fillText(ats[i], 30, 1300 + i*21);
	}
}

