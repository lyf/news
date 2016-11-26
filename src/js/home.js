//请求
var jsonp = document.createElement("script");
jsonp.type = "text/javascript";
jsonp.src = "http://api.jisuapi.com/news/get?channel=头条&num=20&appkey=c5f0fc140f289859&callback=fun";
document.head.appendChild(jsonp);

function fun(data){
	$("#mask").hide();
	//清空内容
	$('.swiper-container .swiper-wrapper').html('');
	$('.keyContent ul').html('');
	
	//轮播内容
	var html = '';
	for(var i=1;i<8;i++){
		if( !data.result.list[i].pic ){
			continue;
		}
		html += "<div class='swiper-slide'><a href='"+data.result.list[i].weburl+"'><img src='"+data.result.list[i].pic+"'/></a></div>";
	}
	$('.swiper-container .swiper-wrapper').append(html);

	//新闻内容
	for(var i=0;i<data.result.list.length;i++){
		if( !data.result.list[i].pic ){
			var _html ='';
			_html += '<li class="noPic">';
			_html += '<p class="title">'+ data.result.list[i].title +'</p>';
			_html += '<div class="prod">'+ data.result.list[i].content + '</div>';
			_html += '<div class="proBottom"><div>来源：'+ data.result.list[i].src + '</div>';
			_html += '<div class="time">'+ data.result.list[i].time +'</div></div></li>';

			var contentHTML = $('.noPic .prod>p').eq(0);
			$('.prod').html('').html(contentHTML);
			$('.keyContent ul').append(_html);
			continue;
		}else {
			var _html = '';
			_html += '<li  class="hasPic"><div class="picture">';
			_html += '<a href="'+ data.result.list[i].weburl +'"><img src="'+ data.result.list[i].pic +'"/></a><p>来源：'+ data.result.list[i].src +'</p></div>';
			_html += '<div class="product">';
			_html += '<p class="title"><a href="'+ data.result.list[i].weburl +'">'+ data.result.list[i].title +'</a></p>';
			_html += '<div class="prod">'+ data.result.list[i].content + '</div>';
			_html += '<div class="time">'+ data.result.list[i].time +'</div></div></li>';
			
			$('.keyContent ul').append(_html);
		}
	}

}


$(function(){

//横滑动
	var myScroll;
	function loaded () {
		myScroll = new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
	};
	loaded();

	// 滚动
	$(window).scroll(function(){
		console.log(11)
	})
	// 页面滚动
	//Swiper JS
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });

    // 频道转换
    $('.classifyList li>a').click(function(){
		$("#mask").show();
		$(this).parent().addClass('classifyActive').siblings().removeClass('classifyActive');
		var HTML = $(this).text();					
		var jsonp = document.createElement("script");
		jsonp.type = "text/javascript";
		jsonp.src = "http://api.jisuapi.com/news/get?channel="+ HTML +"&num=20&appkey=c5f0fc140f289859&callback=fun";
		document.head.appendChild(jsonp);
	})
	
})





