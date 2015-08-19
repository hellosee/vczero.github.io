var App = (function() {
	var pages = {};
	var run = function() {
		$.each(pages, function(k, v) {
			var sectionId = '#' + k + '_section';
			$('body').delegate(sectionId, 'pageinit', function() {
				v.init && v.init.call(v);
			});
			$('body').delegate(sectionId, 'pageshow', function(e, isBack) {
				//页面加载的时候都会执行
				v.show && v.show.call(v);
				//后退时不执行
				if (!isBack && v.load) {
					v.load.call(v);
				}
			});
		});

		J.Transition.add('flip', 'slideLeftOut', 'flipOut', 'slideRightOut', 'flipIn');
		Jingle.launch({
			showWelcome: false,
			welcomeSlideChange: false,
			showPageLoading: false,
			remotePage: {
				'#about_section': 'remote/about_section.html'
			}
		});

	};
	var page = function(id, factory) {
		return ((id && factory) ? _addPage : _getPage).call(this, id, factory);
	}
	var _addPage = function(id, factory) {
		pages[id] = new factory();
	};
	var _getPage = function(id) {
		return pages[id];
	}

	//动态计算chart canvas的高度，宽度，以适配终端界面
	var calcChartOffset = function() {
		return {
			height: $(document).height() - 44 - 30 - 60,
			width: $(document).width()
		}

	};
	return {
		run: run,
		page: page,
		calcChartOffset: calcChartOffset
	}
})();



//打开监控页面
function AppMonitor() {
	var $lineChart = null;
	var $barChart = null;
	var $delay = null;
	var $request_c = null;
	var $request_vs = null;
	var $success_c = null;
	var $success_vs = null;
	var $request_A_c = null;
	var $request_A_vs = null;
	var $dely_c = null;
	var $dely_vs = null;
	
	var renderChart = function(type, data, data3) {
		if (type == 'request') {
			$lineChart.show();
			$barChart.hide();
			$delay.hide();
			new JChart.Line(data, {
				id: 'chart_drag_line_canvas',
				smooth: false,
				fill: false,
				datasetGesture: true,
				datasetOffsetNumber: 10
			}).draw(true);
			$('#chartTitle_sp').text('请求数（个/每分钟）');
			$success_c.text('95.736%');
			$success_vs.text('95.484%');
			$request_c.text('93,984');
			$request_vs.text('202,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('215.188%');
			$dely_c.text('12,614');
			$dely_vs.text('8,605');

		}

		if (type === 'success') {
			$lineChart.hide();
			$delay.hide();
			$barChart.show();
			new JChart.Line(data, {
				id: 'chart_drag_bar_canvas',
				datasetGesture: true,
				datasetOffsetNumber: 10
			}).draw(true);
			$('#chartTitle_sp').text('成功率（％/每分钟）');
			$success_c.text('96.736%');
			$success_vs.text('95.34%');
			$request_c.text('91,984');
			$request_vs.text('102,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('165.188%');
			$dely_c.text('12,634');
			$dely_vs.text('8,905');
		}

		if (type === 'delay') {
			$lineChart.hide();
			$barChart.hide();
			$delay.show();
			new JChart.Line(data3, {
				id: 'chart_drag_delay_canvas',
				datasetGesture: true,
				datasetOffsetNumber: 10,
				smooth: false,
				fill: false
			}).draw(true);
			$('#chartTitle_sp').text('超时平均值（毫秒/每分钟）');
			$success_c.text('97.736%');
			$success_vs.text('99.34%');
			$request_c.text('92,984');
			$request_vs.text('109,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('195.188%');
			$dely_c.text('12,834');
			$dely_vs.text('9,905');
		}
	};

	(function() {
		var wh = App.calcChartOffset();
		$lineChart = $('#chart_drag_line_canvas');
		$barChart = $('#chart_drag_bar_canvas');
		$delay = $('#chart_drag_delay_canvas');
		$success_c = $('#success_value_c');
		$success_vs = $('#success_value_vs');
		$request_c = $('#success_request_c');
		$request_vs = $('#success_request_vs');
		$request_A_c = $('#success_requestA_c');
		$request_A_vs = $('#success_requestA_vs');
		$dely_c = $('#success_delay_c');
		$dely_vs = $('#success_delay_c');
		
		var LINE_HEIGHT = 200;
		$lineChart.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);
		$barChart.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);
		$delay.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);

		var data = {
			labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			datasets: [{
				name: '当前值',
				color: "#368CE9",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [65, 59, 90, 81, 56, 55, 40, 20, 13, 20, 11, 60, 65, 59, 90, 81, 56, 55, 40, 20, 11, 20, 10, 60, 11, 60, 65]
			}, {
				name: '对比值',
				color: "#FFBB00",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [28, 48, 40, 19, 96, 27, 100, 40, 40, 70, 11, 89, 28, 48, 40, 19, 96, 27, 100, 40, 40, 70, 10, 89, 28, 48, 40]
			}]
		};

		var data3 = {
			labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			datasets: [{
				name: '当前值',
				color: "#3C9BFD",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [165, 159, 90, 81, 56, 55, 40, 120, 13, 20, 11, 60, 165, 59, 390, 81, 56, 55, 840, 20, 11, 20, 10, 60, 11, 60, 65]
			}, {
				name: '对比值',
				color: "#FACC02",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [28, 48, 140, 19, 96, 227, 100, 40, 40, 770, 11, 89, 28, 48, 40, 19, 96, 327, 100, 40, 40, 470, 10, 89, 28, 48, 40]
			}]
		};
		$('#changeDragChartType').on('change', function(e, el) {
			$lineChart.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);
			$barChart.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);
			$delay.attr('width', wh.width).attr('height', wh.height - LINE_HEIGHT);

			renderChart(el.data('type'), data, data3);

		})
		renderChart('request', data);
	})();
}



App.page('index', function() {
	this.init = function() {
		J.Scroll('#index_section nav.header-secondary', {
			hScroll: true,
			hScrollbar: false
		});
		AppMonitor();
		$('#App_article').css('overflow', 'scroll');
		$('#index_section nav.header-secondary a').on('tap', function(e) {
			if (!$(this).hasClass("active")) {
				$(this).parent().find(".active").removeClass("active");
				$(this).addClass("active");
			}

			var text = $(this).text();
			var id = "#" + text + "_article";
			var noid = "#No_article";
			if ($(id).length) {
				J.Router.showArticle(id, $(id));
			} else {
				J.Router.showArticle(noid, $(noid));
			}


			if ($(e.srcElement).text() === 'App') {
				AppMonitor();
				$('#App_article').css('overflow', 'scroll');
			}

		})
		$('#index_section #btn_add_module').on('tap', function() {
			J.Router.goTo('#add_module');
		});

	}
});

$(function() {
	App.run();
});