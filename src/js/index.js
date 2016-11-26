var app = angular.module("home",[])
	app.controller("CON",function($scope,$http,_request){
		$scope.news_data = [];//存储返回数据
		$scope.channel = '健康';//默认频道
		$scope.page = 1;
		_request.request($scope,$http);
		var scroll = new IScroll('.content', { 
				bounceTime: 1200,
				scrollbars:false,
				 mouseWheel: true,
				 click:true
			});
		$(window).on("touchstart",function(){
			scroll.refresh();
		})
		
		scroll.on("scrollEnd",function(){
			scroll.refresh();
			if(scroll.y == scroll.maxScrollY&&scroll.maxScrollY!=0){
				$scope.page++;
				_request.request($scope,$http);
				scroll.refresh();
			}		
		})

		$scope.chang_channel = function(evt,n){//换频道
			$scope.channel = $(evt.target).html();
			$scope.news_data = [];
			n = $(evt.currentTarget).parent('li').index()
			$("#scroller .classifyList li").removeClass('classifyActive').eq(n).addClass('classifyActive')
			_request.request($scope,$http);
		}
		$scope.look_detail = function(x){//跳转详情页
			var ntitle = escape(x.title);
			var source = escape(x.source);
			var channel = escape($scope.channel )
			window.location.href = "detail.html?id="+x.channelId+"&&source="+source + "&&channel="+channel + "&&page=" +$scope.page+"&&ntitle="+ntitle;
		}
	})

	app.factory("_request",function(){
		var obj = {};
			obj.request = function($scope,$http){
				$scope.mask = true;
				var params = {
						channelName: $scope.channel,
						page:$scope.page,
						needHtml:1,
						maxResult:10
					}
				$http({
					method: "get",
					url: "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
					headers: {
						apikey: '9a0377f67476733b42ea794a4c9a9efa'
					},
					async: true,
					params:params,	
				}).success(function(data){
					$scope.mask = false;
					for(var i=0;i<data.showapi_res_body.pagebean.contentlist.length;i++){
						$scope.news_data.push(data.showapi_res_body.pagebean.contentlist[i]);
					}
					console.log($scope.news_data)
					//滚动加载

				})
			}
		return obj;
	})
$(function(){

//横滑动
	var myScroll;
	function loaded () {
		myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
	};
	loaded();

	//Swiper JS
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: 2500,
		autoplayDisableOnInteraction: false
	}); 	

    // 频道转换
 //    $('.classifyList li>a').click(function(){
	// 	$("#mask").show();
	// 	$(this).parent().addClass('classifyActive').siblings().removeClass('classifyActive');
	// 	var HTML = $(this).text();					
	// 	var jsonp = document.createElement("script");
	// 	jsonp.type = "text/javascript";
	// 	jsonp.src = "http://apis.baidu.com/showapi_open_bus/channel_news/search_news="+ HTML +"&maxResult=20&apikey=9a0377f67476733b42ea794a4c9a9efa&callback=fun";
	// 	document.head.appendChild(jsonp);
	// })
	
})