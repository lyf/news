var app = angular.module("APP",[])
	app.controller("CON",function($scope){
		$scope.show_edit = false; //是否打开编辑
		$scope._title = true; //改变标题样式（宽度）
		$scope.sel = false; //是否选中该收藏
		$scope.Not_sel_del = "glyphicon"+ " " +"glyphicon-ok-circle"; //没有被选中的类名
		$scope.sel_del = "glyphicon"+ " " +"glyphicon-ok-circle" + " " + "sel" ;//被选中的类名
		$scope.collect = "";//收藏的数据
		$scope.hasCollect = true;
		$scope.edit = function(){
			$scope.show_edit = !$scope.show_edit;
			$scope._title = !$scope._title;
		}

		$scope.sel_this = function(x){
			x.sel = !x.sel;
		}

		$scope.showStorage = function(){//获取本地存储收藏
			var col = window.localStorage.getItem("collect");
			if(col){
				$scope.hasCollect = !$scope.hasCollect;
				var data = JSON.parse(col);
				$scope.collect = data.data;
				console.log($scope.collect)
			}
		}
		$scope.showStorage();
		//window.localStorage.removeItem("collect")
		$scope.delete_sel = function(){
			window.localStorage.removeItem("collect");
			window.location.reload();
		}

	})