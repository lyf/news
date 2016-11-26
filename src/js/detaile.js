//截取参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
var id = getQueryString("id");//频道id
var source = getQueryString("source");//新闻来源
var _title = getQueryString("title");//搜索关键字	
var page = getQueryString("page");//页码
var _ntitle = getQueryString("ntitle");//新闻标题
var channel = getQueryString("channel");
if(_title){
	console.log(page+' '+ _ntitle+ " " + _title)
}else{
	console.log(page+" "+_ntitle+ " " +channel)
}

var app = angular.module('myApp', ['ui.router']);
	app.controller('myCtrl', function($scope,$http){
		$scope.mask = true;//打开遮罩层
		$scope.news_data = "";
		if(_title){
			params = {
				title:_title,
				page:page,
				needHtml:1,
				maxResult:10
			}
		}else{
			params = {
				channelName:channel,
				page:page,
				needHtml:1,
				maxResult:10
			}
		}
		
		$http({
			method: "get",
			url: "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
			headers: {
				apikey: '9a0377f67476733b42ea794a4c9a9efa'
			},
			async: true,
			params:params
		}).success(function(data) {
			$scope.myLook = "";
			$scope.mask = false;
			console.log(data)
			$scope.news_data = data.showapi_res_body.pagebean.contentlist;
			for(var i=0;i<10;i++){
				if($scope.news_data[i].title == _ntitle){
						$scope.myLook = $scope.news_data[i];
						console.log($scope.myLook)
				}
			}
			if($scope.myLook){
				$scope.title = $scope.myLook.title;
				$scope.imgUrl = [];//请求回来图片的数量
				var imgNum =  $scope.myLook.imageurls.length;
				for(var i=0;i<imgNum;i++){
					$scope.imgUrl.push($scope.myLook.imageurls[i].url);
				}
				//把得到的文字还有内容放到数组中
				$scope.word = [];
				if($scope.myLook.allList){//判断新闻是否有图片
					for(var j=0;j< $scope.myLook.allList.length;j++){
						if(typeof $scope.myLook.allList[j]=="string"){
							$scope.word.push($scope.myLook.allList[j]);
						}else{
							$scope.word.push($scope.myLook.allList[j].url);
						}
						
					}
				}
				var wordNum = $scope.word.length;
				//图片文字区分开来
				$scope.judge = function(x){
					if(x.charAt(0)=="h"){
						return true;
					}else{
						return false;
					}
				}
			}
		});
		
		//收藏
		//window.localStorage.removeItem("collect")
		$scope.collect = function(){
			obj = {
				id:id,
				_title:_title,
				page:page,
				_ntitle:_ntitle,
				img:$scope.myLook.imageurls
			}
			var col = window.localStorage.getItem("collect");
			if(col){
				var attr = JSON.parse(col);
					attr.data.push(obj);
				var trr = JSON.stringify(attr);
				window.localStorage.setItem("collect",trr);
				window.alert('已收藏')
				console.log(window.localStorage.getItem("collect"))
			}else{
				var col_json = {data:[]};
				col_json.data.push(obj);
				var arr = JSON.stringify(col_json);
				window.localStorage.setItem("collect",arr);
				window.alert('已收藏')
				console.log(window.localStorage.getItem("collect"))
			}
		}
	});
	app.controller('comment',function($scope,$http){
		//点击查看评论
		// $http("comments.txt").success(function(response){
		// 	console.log(response);
		// });
	});
	app.config(function($stateProvider,$urlRouterProvider){
		//$urlRouterProvider.when("","/comments");
		// $stateProvider
		// .state("comments",{
		// 	url:"/comments",
		// 	templateUrl:"comments.html?_"+Math.random(),
		// 	controller:"comment"
		// })
	});

$(function(){
	$('#edit').click(function(){
		var txt = $(this).text(); 
		var input = $("<input id='e_input' type='text' value=' " + txt + "'/>");
		$(this).html(input);
		input.click(function(){
			return false;
		});
		input.trigger("focus");
		input.trigger("bulr",function(){
			var newtxt = $(this).val();
			$("#edit").text(newtxt);
			console.log(1);
		});
	});
	
});
