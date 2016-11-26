
var app = angular.module("APP",[])
	app.controller("CON",function($scope,$http,_request){
		$scope.search_content = "云南"; //默认搜索内容
		$scope.news_data = ""; 	//返回默认内容
		$scope.channelName = '国内焦点';
		_request.request($scope,$http)
		$scope.search = function(){
			_request.request($scope,$http);
			//escape() 方法，它用于转义不能用明文正确发送的任何字符
			window.location.href = "search_result.html?word="+escape($scope.search_content);
		}
		$scope._detail = function(x){
			var channel = escape($scope.channelName);
			var ntitle = escape(x.title);
			window.location.href = "detail.html?channel="+channel + "&&page=" +1+"&&ntitle="+ntitle;
		}
	})

	app.factory("_request",function(){
		var obj = {};
			obj.request = function($scope,$http,search_word){
				$scope.mask = true;
				var params = {
						channelName: $scope.channelName,
						page:1,
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
					$scope.news_data = data.showapi_res_body.pagebean.contentlist;
				})
			}
		return obj;
	})

	


