
$(function(){
	//右上角的菜单
	$(".listMenu").on("touchstart", function(){
		$(".topMenu").toggle();
	})
	
	//回到顶部
    $(window).scroll(function(){
    	var scrollTop = $(window).scrollTop();
    	//console.log(scrollTop);
    	if( scrollTop >=1200 ){
    		$(".scrollTop").show();
    	}else {
    		$(".scrollTop").hide();
    	}
    	
    	$(".scrollTop").click(function(){
    		//console.log("scsl")
    		$(window).scrollTop(0);
    	})
    	
    })
    
    
    //遮盖层
	$(document).ajaxSend(function(){
		//遮盖层
		//console.log("send");
		$(".mask").show();
	}).ajaxComplete(function(){
		//取消遮盖层
		//console.log("complete");
		$(".mask").hide();
	})
    
})
