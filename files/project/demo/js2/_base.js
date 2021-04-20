	var init = function(){
		var screenWidth = $(window).width();
		if(screenWidth > 640){
			$("html").css({"font-size":"100px"})
		}else {
			$("html").css({"font-size":100*screenWidth/640 +"px"});
		};
	};
	init();
	
$(function(){
	
	$(window).resize(function(){
		init();
	});
	
	//navB点击
	

	$(".navBItem1 .spaceItem").tap(function(){
		
		$(this).siblings("a").hide();
		$(this).parent().animate({width:"30%"},300);
		$(this).parent().siblings(".navBItem2").animate({width:"70%"},300);
	});
	$(".navBItem2 .back").tap(function(){
		$(this).parents(".navBItem2").siblings(".navBItem1").animate({width:"100%"},300);
		$(this).parents(".navBItem2").siblings(".navBItem1").children("a").show("100");
		$(this).parents(".navBItem2").animate({width:"0"},300);
	});
	
	/*$(".navBItem2 a:not('.back')").tap(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});*/
	$(".navBItem2 a").not(".back").tap(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	//navA
	$(".navAItem1 a").tap(function(){
		var index = $(this).index();
		$(this).parents(".navAItem1").siblings(".navAItem2").children(".item").hide();
		$(this).parents(".navAItem1").siblings(".navAItem2").find(".item").eq(index).css("display","inline-block");
		$(this).parents(".navAItem1").animate({width:"0"},300);
		$(this).parents(".navAItem1").siblings(".navAItem2").animate({width:"100%"},300);
	});
	$(".navAItem2 .backIcon").tap(function(){
		$(this).parent().animate({width:"0"},300);
		$(this).parent().siblings(".navAItem1").animate({width:"100%"},300);
	});
	/*$(".navAItem2 .item:not('.item4') > a").tap(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});*/
	$(".navAItem2 .item > a").not(".navAItem2 .item.item4 > a").tap(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	$(".navAItem2 .item4 > a,.shareList > li").tap(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
	
	
	$("#a1").tap(function(){
	    kk(1)
	})
	$("#a2").tap(function(){
	    kk(2)
	})
	$("#a3").tap(function(){
	    kk(3)
	})
	$("#a4").tap(function(){
	    kk(4)
	})

	$("#a1_0").tap(function(){
	    kk(11)
	})
	$("#a1_1").tap(function(){
	    kk(12)
	})

	

	
	
	
	
	
	
	
	

	
	
	
});



//弹出层
function showBox(cla){
    $("#overlay").show();
    $(".lightBox").hide();
    $("."+cla).show();
    var $height=$("."+cla).height()/2;
    $("."+cla).css("margin-top",-$height);
}
function closeBox(cla){
	$("#overlay").hide();
	$("."+cla).hide();
}




function kk(value)
{
   if(value==12)
   {
     buttonClick(3)
   }
   if(value==1)
   {
     buttonClick(0)
   }
   if(value==3)
   {
     buttonClick(1)
   }
   //alert(value)
}







