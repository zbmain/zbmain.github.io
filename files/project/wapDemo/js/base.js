	var init = function(){
		var screenWidth = $(window).width();
		if(screenWidth > 750){
			$("html").css({"font-size":"100px"})
		}else {
			$("html").css({"font-size":100*screenWidth/750 +"px"});
		};
	};
	init();
	
$(function(){
	
	$(window).resize(function(){
		init();
	});
	
	$(".highlightText").mCustomScrollbar({
		scrollEasing:"easeOutBack"
	});
	
var cccc = 0;	

	//左侧导航
	$(".nav a").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tabList").removeClass("active");
		$(this).parents(".carsFlash").siblings(".contWrap").find(".tabList").eq(index).addClass("active");
		cccc = index;
		if(index == 0)
		{
			//隐藏外观：
			/*
			$("#container").show();
			deleteSelf();
			initLoaderMode();
			setRenderOpen(true);
			*/
			
			addExt();
			//initLoaderMode();

			//显示内饰：
			showPano(false);
		}
		if(index == 1)
		{
			//隐藏外观：
			/*
			$("#container").hide();
			setRenderOpen(false);
			deleteSelf();
			*/
	
			deleteExt();
			
			
			//显示内饰：
			showPano(true);
		}
		
		//alert(1);
		
	})

	
	//firstFloorSwiper
	$(".firstFloorSwiper .swiper-slide").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").removeClass("active");
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").eq(index).addClass("active");
	})
	
	//secondFloorSwiper
	$(".secondFloorSwiper .swiper-slide").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	
	//颜色
	$(".colorTab .swiper-slide").click(function(){
		var index = $(this).index();
		//alert(6)
		switch(index)
		{
			case 0:
				text="金属灰";
				setFeatureList(["A001"]);
				break;
			case 1:
				text="蓝色";
				setFeatureList(["B001"]);
				break;
			case 2:
				text="深金色";
				setFeatureList(["C001"]);
				break;
		  	case 3:
				text="浅金色";
				setFeatureList(["C002"]);
		  		break;
		  	case 4:
				text="橄榄绿";
				setFeatureList(["E002"]);
				break;
			case 5:
				text="金属黑";
				setFeatureList(["F081"]);
				break;
		  	case 6:
				text="玛瑙红";
				setFeatureList(["K003"]);
		  		break;
			case 7:
				text="暖银";
				setFeatureList(["L001"]);
		  		break;
			case 8:
				text="暖白";
				setFeatureList(["M001"]);
		  		break;	
		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	//轮毂
	$(".lgTab .swiper-slide").click(function(){
		var index = $(this).index();
		//alert(5)
		switch(index)
		{
			case 0:
				text="6辐条状越野轮辐";
				setWheelValue("J07A","J05E");
				break;
			case 1:
				text="6V辐条状轮辐";
				setWheelValue("J07A","J05F");
				break;
			case 2:
				text="12辐条状轮辐";
				setWheelValue("J07A","J05G");
				break;
		  	case 3:
		  		text="非对称式轮辐";
				setWheelValue("J07A","J05H");
		  		break;
		  	case 4:
				text="旋转辐条状运动轮辐";
				setWheelValue("J07B","J05K");
				break;


		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	//normalTab
	$(".normalTab .swiper-slide").click(function(){
		var img;
		var text;
		var index = $(this).index();
		//alert(4)
		if(cccc == 0)
		{
			switch(index)
			{
				case 0:
					text="低配散热器格栅";
					setFeatureList(["K15M"]);
					break;
				case 1:
					text="高配散热器格栅";
					setFeatureList(["K15N"]);
					break;
				case 2:
					text="满天星散热格栅";
					setFeatureList(["K15P"]);
					break;
				case 3:
					text="波浪型散热格栅";
					setFeatureList(["K15Q"]);
					break;
			};
		}
		
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	
	//内饰格调
	$(".NScolorTab .swiper-slide").click(function(){
		var index = $(this).index();
		
		switch(index)
		{
			case 0:
				text="内饰色调/米色";
				setIntFeatureList(["A35B"]);
				break;
			case 1:
				text="内饰色调/黑色";
				setIntFeatureList(["A35E"]);
				break;
			case 2:
				text="内饰色调/棕色";
				setIntFeatureList(["A35F"]);
				break;
		};
		//alert(1)
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});

	//座椅面料
	$(".ZYTab .swiper-slide").click(function(){
		var index = $(this).index();
		//alert(2)
		switch(index)
		{
			case 0:
				text="普通纹路";
				setIntFeatureList(["N56A"]);
				break;
			case 1:
				text="菱形格纹路";
				setIntFeatureList(["N56B"]);
				break;

		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});

	//IP内饰
	$(".ipnsTab .swiper-slide").click(function(){
		var index = $(this).index();
		//alert(3)
		switch(index)
		{
			case 0:
				text="喷漆";
				setIntFeatureList(["M76J"]);
				break;
			case 1:
				text="水转印1";
				setIntFeatureList(["M76L"]);
				break;
			case 2:
				text="水转印2";
				setIntFeatureList(["M76N"]);
				break;
			case 3:
				text="水转印3";
				setIntFeatureList(["M76P"]);
				break;
			case 4:
				text="全包覆";
				setIntFeatureList(["M76Q"]);
				break;

		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	
	
	
	$(".secondFloorSwiperWrap .text>i").click(function(){
		$("#overlay").show();
		$(".popBox").show().css("top",($(window).height()-$(".popBox").height())/2-20);	
	});
	
	$(".listUl>li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
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




function showBoxImg(cla,img){
	$("#overlay").show();
	$("."+cla).show().css("top",($(window).height()-$("."+cla).height())/2);

	$("#imgID").attr('src',img);
	console.log(img);
}
function showBoxVideo(cla,video,h1,p){
	$("#overlay").show();
	$("."+cla).show().css("top",($(window).height()-$("."+cla).height())/2);

	$("#videoID").attr('src',video);
	$("#h1ID").html(h1);
	$("#pID").html(p);

	console.log(video);
	console.log(h1);
	console.log(p);
}


function closeBox(){
	$("#overlay, .popBox").hide();	
	document.getElementsByTagName('video')[0].pause();
}






