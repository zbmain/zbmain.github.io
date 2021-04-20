$(function(){
	$(".carsPic").height($(window).height()-160);


	$(".secondFloorSwiperWrap,.tabList").hide();
	$(".JCcolorTab,.tabListJC,.WGcolorTab,.NScolorTab").show();
	// 初始化滑动
	var mySwiper1 = new Swiper('#swiper-container1',{
	    pagination: '.pagination1',
	    paginationClickable: true,
	    slidesPerView: 9,
	    loop: false
  	});
  	$(".swiper-button-prev").addClass("disabled");
  	$('.prev1').on('click', function(e){
	    e.preventDefault();
	    mySwiper1.swipePrev();
	    var length1 = $("#swiper-container1").find(".swiper-slide").length;
	    if(mySwiper1.activeIndex==0){
	    	$(this).addClass("disabled");
	    	$(this).siblings(".next1").removeClass("disabled");
	    }else {
	    	$(this).removeClass("disabled");
	    };
	});
	$('.next1').on('click', function(e){
	    e.preventDefault();
	    mySwiper1.swipeNext();
	    var length1 = $("#swiper-container1").find(".swiper-slide").length;
	    if(mySwiper1.slides[length1-9].isActive()){
	    	$(this).addClass("disabled");
	    	$(this).siblings(".prev1").removeClass("disabled");
	    }else {
	    	$(this).removeClass("disabled");
	    	$(this).siblings(".prev1").removeClass("disabled");
	    };
	});

	var mySwiperA = new Swiper('#swiper-container4',{
	    pagination: '.pagination4',
	    paginationClickable: true,
	    slidesPerView: 5,
	    loop: false
  	});
  	$('.prev4').on('click', function(e){
	    e.preventDefault();
	    mySwiperA.swipePrev();
	    var lengthA = $("#swiper-container4").find(".swiper-slide").length;
	    if(mySwiperA.activeIndex==0){
	    	$(this).addClass("disabled");
	    	$(this).siblings(".next4").removeClass("disabled");
	    }else {
	    	$(this).removeClass("disabled");
	    };
	});
	$('.next4').on('click', function(e){
	    e.preventDefault();
	    mySwiperA.swipeNext();
	    var lengthA = $("#swiper-container4").find(".swiper-slide").length;
	    if(mySwiperA.slides[lengthA-5].isActive()){
	    	$(this).addClass("disabled");
	    	$(this).siblings(".prev4").removeClass("disabled");
	    }else {
	    	$(this).removeClass("disabled");
	    	$(this).siblings(".prev4").removeClass("disabled");
	    };
	});


	// 左侧导航
	$(".nav a").click(function(){
		var index = $(this).index();
		var len = $(".nav a").length;
		for(var h=0;h<=len-1;h++){
			if(h<=index){
				$(".nav a").eq(h-1).find("i").addClass("right");
			}else if(h>index){
				$(".nav a").eq(h).find("i").removeClass("right");
			}
		}
		$(this).addClass("active").siblings().removeClass("active");
		$(".tabListWrap .tabList").hide();
		$(".tabListWrap .tabList").eq(index).show();
		$(".carsPic").hide();
	});
	// 继续下一步
	$(".btnBlock").click(function(){
		var aLen = $(".nav a").length;
		if($(".nav a").eq(3).hasClass("active")){
			$(".contWrap").hide();
			$(".configWrap").show();
		}else{
			$(".contWrap").show();
			$(".configWrap").hide();
			for(var i=0;i<aLen;i++){
				if($(".nav a").eq(i).hasClass("active")){
					var index = $(this).index();
					$(".nav a").eq(i+1).click();
					break;
				}
			}
		}
		
	})
	
	//firstFloorSwiper
	$(".firstFloorSwiper .swiper-slide").click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").hide();
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").eq(index).show();
	})
	
	//secondFloorSwiper
	$(".secondFloorSwiper .swiper-slide").click(function(){
		var index = $(this).index();
		if($(this).hasClass("notOptional")){
			$("#overlay,.conflictBox").show();
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parents(".secondFloorSwiper").siblings(".textWrap").find(".text").hide();
			$(this).parents(".secondFloorSwiper").siblings(".textWrap").find(".text").eq(index).show();
		}
	})
	
	
	$(".secondFloorSwiperWrap .text>i").click(function(){
		$("#overlay").show();
		$(".popBox").show();	
	});
	

	// 装备
	$(".subNav").eq(2).show();
	$(".ZBTitle").each(function(i){
	    $(this).click(function(){
	    	if(!$(this).find(".titleNav").hasClass("unfold")){
	    		$(this).find(".titleNav").addClass("unfold");
	    		$(this).siblings().show();
	    	}else{
	    		$(this).find(".titleNav").removeClass("unfold");
	    		$(this).siblings().hide();
	    	}
	        return false;
	    })
	});
	// 点击编辑回到选择页面
	$(".editIcon").click(function(){
		$(".configWrap").hide();
		$(".contWrap").show();
		if($(this).siblings("span").text()=="外观"){
			$(".nav a").eq(1).click();
		}else if($(this).siblings("span").text()=="内饰"){
			$(".nav a").eq(2).click();
		}else{
			$(".nav a").eq(3).click();
		}
	});
	// 选项卡
	$(".tabNavA li").each(function(){
		$(this).click(function(i){
			var index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parents(".subList,.popBoxCont").find(".tabListA").hide();	
			$(this).parent(".tabNavA").siblings(".tabListA").eq(index).show();
			return false;
		})
	})
	
	
})



//多选
function multiple(cla){
	$("."+cla).click(function(){
		$(this).addClass("active").siblings("."+cla).removeClass("active");
	})
}

//单选
function single(cla){
	$("."+cla).click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active")
		}else{
			$(this).addClass("active")
		}
	})
}




function showBox(cla){
	$("#overlay").show();
	$("."+cla).show();	
}

function closeBox(cla){
	$("#overlay").hide();	
	$("."+cla).hide();	
}






