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
	if($("#swiperBirght").find(".swiper-slide").length==3){
		$("#swiperBirght").removeClass("a1");
		$("#swiperBirght").removeClass("a2");
		$("#swiperBirght").addClass("a3");
	}else if ($("#swiperBirght").find(".swiper-slide").length==2){
		$("#swiperBirght").removeClass("a1");
		$("#swiperBirght").removeClass("a3");
		$("#swiperBirght").addClass("a2");
	}else if ($("#swiperBirght").find(".swiper-slide").length==1){
		$("#swiperBirght").removeClass("a2");
		$("#swiperBirght").removeClass("a3");
		$("#swiperBirght").addClass("a1");
	}
	
	$(".navBItem1 > a").tap(function(){
		var index = $(this).index();
		$(this).siblings("a").hide();
		$(this).parent().animate({width:"30%"},300);
		$(this).parent().siblings(".navBItem2").eq(index).animate({width:"70%"},300);
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
	$(".navBItem2.itemC .swiper-slide").tap(function(){
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

	//外观
	$("#a1").tap(function(){
	    kk(0)
	})
	
	//轮毂
	$("#a2").tap(function(){
	   kk(0)
	})
	
	//内饰
	$("#a3").tap(function(){
	    kk(1)
	})
	
	//配件
	$("#a4").tap(function(){
	    
	})

	//白色
	$("#a1_0").tap(function(){
	
	    $("#carColor").html("车身颜色 雪域白");
	    kk(3);
	})
	//棕色
	$("#a1_1").tap(function(){
	   $("#carColor").html("车身颜色 托帕石棕");
	    kk(4);
	})
	//红色
	$("#a1_2").tap(function(){
	    $("#carColor").html("车身颜色 玛瑙红");
	    kk(5);
	})
	//金色
	$("#a1_3").tap(function(){
	    $("#carColor").html("车身颜色 卡其金");
	    kk(6);
	})

	//l7轮毂
	$("#a2_0").tap(function(){
	    $("#carWheel").html("17寸十辐铝合金轮毂");
	    kk(7);
	})
	//l7轮毂
	$("#a2_1").tap(function(){
		$("#carWheel").html("17寸双五辐铝合金轮毂");
	    kk(8);
	})
	
	//棕色内饰
	$("#a3_0").tap(function(){
	    kk(9);
		$("#carIntColor").html("棕色高级真皮");
	})
	
	//黑色内饰
	$("#a3_1").tap(function(){
	    kk(10);
		$("#carIntColor").html("黑色高级真皮");
	})
	
	var peiJianJiaGe = 0;
	
	//行李架
	$("#a4_0").tap(function(){
	    
		if($(this).hasClass("active")){
			kk(11);
			$("#carConfig").append('<dd id="xinglijia"><div class="price">￥600</div>合金行李架</dd>');
			peiJianJiaGe += 600; 
		}else{
		    $("#xinglijia").remove();
			kk(14);
			peiJianJiaGe -= 600; 
		}
		
		$("#peiJianPrice").html("￥"+peiJianJiaGe);
		$("#zongJiaPrice").html("￥"+(peiJianJiaGe+245900));
		$("#pzbZongJia").html("￥"+(peiJianJiaGe+245900));
	})
	
	//踏板
	$("#a4_1").tap(function(){
	
	    if($(this).hasClass("active")){
			kk(12);
			$("#carConfig").append('<dd id="taban"><div class="price">￥4500</div>合金踏板</dd>');
			peiJianJiaGe += 4500; 
		}else{
		    $("#taban").remove();
			peiJianJiaGe -= 4500; 
			kk(15);
		}
		$("#peiJianPrice").html("￥"+peiJianJiaGe);
		$("#zongJiaPrice").html("￥"+(peiJianJiaGe+245900));
		$("#pzbZongJia").html("￥"+(peiJianJiaGe+245900));
	})
	
	//鲨鱼鳍
	$("#a4_2").tap(function(){
	    if($(this).hasClass("active")){
			kk(13);
			$("#carConfig").append('<dd id="shayuqi"><div class="price">￥100</div>鲨鱼鳍</dd>');
			peiJianJiaGe += 100; 
		}else{
		    $("#shayuqi").remove();
			kk(16);
			peiJianJiaGe -= 100;
		}
		$("#peiJianPrice").html("￥"+peiJianJiaGe);
		$("#zongJiaPrice").html("￥"+(peiJianJiaGe+245900));
		$("#pzbZongJia").html("￥"+(peiJianJiaGe+245900));
	})
	
	
	//更换背景
	$("#a5_0").tap(function(){
	  //  $("#container").style.background=url('models/json/car4/images/BJ1.jpg')
		//alert($("#container").style)
		document.getElementById("container").style.backgroundImage="url('http://192.168.6.145/web3D/demo/models/json/car4/images/BJ1.jpg')"
	})
	$("#a5_1").tap(function(){
	   document.getElementById("container").style.backgroundImage="url('http://192.168.6.145/web3D/demo/models/json/car4/images/BJ3.jpg')"
	})
	$("#a5_2").tap(function(){
	   // $("#container").style.background=url('models/json/car4/images/BJ2.jpg')
		//document.getElementById("container").style.background=url('models/json/car4/images/BJ2.jpg')
		document.getElementById("container").style.backgroundImage="url('http://192.168.6.145/web3D/demo/models/json/car4/images/BJ2.jpg')"
	})
	
    //打开亮点
	$("#a6_0").tap(function(){
	    
		liangDian_boo = true;
	})
	//关闭亮点
	$("#a6_1").tap(function(){
	    
		liangDian_boo = false;
		
		//document.getElementById("container").style.display = "";
		//document.getElementById("videoDiv").style.display = "none";
	})
	//亮点视频播放
	$("#a7_0").tap(function(){
	    
		//document.getElementById("container").style.display = "none";
		//document.getElementById("videoDiv").style.display = "";
		window.location.href = "ios:liangdian_0"
	})
	$("#a7_1").tap(function(){
	    //document.getElementById("container").style.display = "none";
		//document.getElementById("videoDiv").style.display = "";
		window.location.href = "ios:liangdian_1"
		
	})
	$("#a7_2").tap(function(){
	    //document.getElementById("container").style.display = "none";
		//document.getElementById("videoDiv").style.display = "";
		window.location.href = "ios:liangdian_1"
		
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


//弹出层
function showBox1(cla){
    $("#overlay1").show();
    $(".loader").show();
}
function closeBox1(cla){
	$("#overlay1").hide();
	$(".loader").hide();
}





function kk(value)
{
   buttonClick(value)
   //alert(value)
}






