$(function(){

	// 后退
	$(function(){
		$(".back").click(function(){window.history.back(-1)})
	})

	$( "#register" ).validate({
	 	rules: {
				firstname: "required",
      			lastname: "required",
      			tel: {
					required: true,
					rangelength:[11,11],
					isMobile:true
				},
				email: {
					required: true,
					email:true
				},
				username: {
					required: true,
					rangelength:[4,10]
				},
				password: {
					required: true,
					rangelength:[6,18]
				},
				repassword: {
					required: true,
					rangelength:[6,18],
					equalTo: "#password"
				}
			},
	 	errorPlacement: function(error, element) {
	 		$("#hint").html(" ");
    		error.appendTo($("#hint"));
    		$(element).closest("div").removeClass('has-success').addClass('has-error');
    		$(element).siblings('span').removeClass('glyphicon-ok').addClass('glyphicon-remove');
		},
		success:function(label,element){
			$(element).closest("div").removeClass("has-error").addClass('has-success')
			$(element).siblings('span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
		},
		messages:{
			tel:{
				required:"手机格式不正确",
				rangelength:"手机长度不正确",
				isMobile:"请正确输入手机"
			},
			email:{
				required:"请输入你的邮箱",
				email:"邮箱格式错误"
			},
			username:{
				required:"请输入用户名",
				rangelength:"用户名4-10位，包括数字、字母、中文"
			},
			password:{
				required:"请输入密码",
				rangelength:"密码长度6-18位"
			},
			repassword:{
				required: "请再次输入密码",
				rangelength:"密码长度6-18位",
				equalTo: "两次密码不符，请重新输入"
			}
		},
	 });
	//window.localStorage.removeItem("newsData")
	$("#submit").on("touchstart",function() {
	 	if($("#register").valid()){
	 		var obj = {
	 			username:$("#username").val(),
	 			password:$("#password").val(),
	 			email:$("#email").val(),
	 			tel:$("#tel").val()
	 		}
	 		var data = localStorage.getItem("newsData");
	 		if(data){
	 			var data = JSON.parse(data);
	 			var attr = [] //生成数组判断用户是否存在
					for(var i = 0;i<data.user.length;i++){
						attr.push(data.user[i].username)
					}
		 		if($.inArray(obj.username,attr)!=-1){
						alert("用户名已存在，请重新输入")
				}else{
		 			data.user.push(obj);
	 				var userData = JSON.stringify(data);
					localStorage.setItem("newsData",userData);
					console.log(localStorage.getItem("newsData"));
				}
	 		}else{
	 			var data = {
	 				"user":[]
	 			}
	 			data.user.push(obj)
	 			userData = JSON.stringify(data)
				localStorage.setItem("newsData",userData)
				console.log(localStorage.getItem("newsData"))
	 		}
	 	};
	});
})