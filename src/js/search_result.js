
//截取参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
var word = getQueryString("word");//搜索值

var app = angular.module("search_app",[])
	app.controller("search_con",function($scope,$http,_request){
		$scope.data = ""; //搜索返回数据
		$scope.search_word = word;
		$scope.page = 1;//当前页码
		_request.request($scope,$http,$scope.search_word,$scope.page,function(){
			var scroll = new IScroll('.content', { //滚动加载
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
		});//搜索请求

		$scope.load_detail = function(x){
			if(!$scope.search_word){
				$scope.search_word = "北京";
			}
			var tit =escape($scope.search_word);
			var ntitle = escape(x.title);
			console.log(tit)
			window.location.href = "detail.html?title="+escape($scope.search_word) + "&&page=" +$scope.page+"&&ntitle="+ntitle;
		}
	})

	app.factory("_request",function(){
		var obj = {};
		obj.request = function($scope,$http,search_word,page,fun){
			$scope.mask = true;
			params = {
				page:page,
				needHtml:1,
				title:search_word,
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
			}).success(function(response){
				$scope.mask = false;
				data = response.showapi_res_body.pagebean.contentlist;
				if(page == 1){
					$scope.data = data;
				}else{
					for(var i=0;i<data.length;i++){
						$scope.data.push(data[i])
					}
				}
				console.log($scope.data)
				if(fun){
					fun()
				}
			})
		}
	return obj;
	})
