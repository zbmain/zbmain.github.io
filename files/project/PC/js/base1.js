$(function(){

	$(".tabList,.secondFloorSwiperWrap").hide();
	$(".tabListJC,.JCcolorTab,.WGcolorTab,.NScolorTab,.ZBcolorTab").show();
	

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
	$(".firstFloorSwiper .bd li").click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").hide();
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").eq(index).show();
	})
	
	//secondFloorSwiper
	$(".secondFloorSwiper li,.subList li").click(function(){
		var index = $(this).index();
		if($(this).hasClass("notOptional")){
			return false;
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parents(".secondFloorSwiper").siblings(".text").hide();
			$(this).parents(".secondFloorSwiper").siblings(".text").eq(index).show();
		}
	})
	
	
	$(".secondFloorSwiperWrap .text>i").click(function(){
		$("#overlay").show();
		$(".popBox").show();	
	});
	

	// 装备
	$(".subNav").eq(2).show();
	$(".titleNav").each(function(i){
	    $(this).click(function(){
	        $(".subNav").hide();
	        $(this).parent().siblings().show();
	        $(".titleNav").removeClass("unfold");
	        $(this).addClass("unfold");
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






