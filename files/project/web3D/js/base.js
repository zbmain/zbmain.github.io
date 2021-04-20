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
	$(".secondFloorSwiperWrap").hide();
	$(".colorTab").show();
	$(".tabList").hide();
	$(".tabListWG").show();
	$(".NScolorTab").show();
	$(".SSTab").show();
	
	$(".nav a").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tabListWrap .tabList").hide();
		$(".tabListWrap .tabList").eq(index).show();
		$(".carsPic").hide();
		switchGroup(index);
	})
	
	//firstFloorSwiper
	$(".firstFloorSwiper .swiper-slide").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").hide();
		$(this).parents(".firstFloorSwiper").siblings(".secondFloorSwiperWrap").eq(index).show();
	})
	
	//secondFloorSwiper
	$(".secondFloorSwiper .swiper-slide").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	
	//颜色
	$(".colorTab .swiper-slide").click(function(){
		var index = $(this).index();
		switch(index)
		{
			case 0:
				text="宝石蓝<span>￥0</span>";
				buttonClick(3);
				break;
			case 1:
				text="锆石红<span>￥0</span>";
				buttonClick(1);
				break;
			case 2:
				text="极光银<span>￥0</span>";
				buttonClick(6);
				break;
		  	case 3:
		  		text="曜石黑<span>￥0</span>";
				buttonClick(5);
		  		break;
		  	case 4:
				text="熔岩灰<span>￥0</span>";
				buttonClick(4);
				break;
			case 5:
				text="翡翠绿<span>￥0</span>";
				buttonClick(2);
				break;
		  	case 6:
		  		text="勃朗白<span>￥0</span>";
				buttonClick(0);
		  		break;
			case 7:
		  		text="琥珀金<span>￥0</span>";
				buttonClick(7);
		  		break;
			case 8:
		  		text="香槟金<span>￥0</span>";
				buttonClick(8);
		  		break;	
		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	//轮毂
	$(".lgTab .swiper-slide").click(function(){
		var index = $(this).index();
		wheelClick(index);
		switch(index)
		{
			case 0:
				text="6幅战斧款轮毂<span>￥0</span>";
				wheelClick(8);
				break;
			case 1:
				text="轮毂1<span>￥0</span>";
				wheelClick(9);
				break;
			case 2:
				text="轮毂2<span>￥0</span>";
				wheelClick(0);
				break;
		  	case 3:
		  		text="轮毂3<span>￥0</span>";
		  		wheelClick(1);
		  		break;
		  	case 4:
				text="轮毂4<span>￥0</span>";
				wheelClick(2);
				break;
			case 5:
				text="轮毂5<span>￥0</span>";
				wheelClick(3);
				break;
		  	case 6:
		  		text="轮毂6<span>￥0</span>";
		  		wheelClick(4);
		  		break;
		  	case 7:
		  		text="轮毂7<span>￥0</span>";
		  		wheelClick(5);
		  		break;
		  	case 8:
		  		text="轮毂8<span>￥0</span>";
		  		wheelClick(6);
		  		break;
		  	case 9:
		  		text="轮毂9<span>￥0</span>";
		  		wheelClick(7);
		  		break;
		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	//normalTab
	$(".normalTab .swiper-slide").click(function(){
		var img;
		var text;
		var index = $(this).index();
		switch(index)
		{
			case 0:
				text="<span>￥0</span>";
				break;
		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	$(".tabListGX .normalTab .swiper-slide,.navItme3").click(function(){
		var img = "url(images/noneBig.jpg)";
		$(".carsPic").show().css("background-image",img);
	});
	
	
	//内饰
	$(".NScolorTab .swiper-slide").click(function(){
		var index = $(this).index();
		switch(index)
		{
			case 0:
				text="棕色内饰<span>￥0</span>";
				break;
			/*case 1:
				text="棕色内饰<span>￥0</span>";
				break;*/
		};
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
	});
	
	//胎压监测
	$(".TYTab .swiper-slide").click(function(){
		var index = $(this).index();
		var img;
		var text;
		switch(index)
		{
			case 0:
				text="胎压检测<span>￥1000</span>";
				img="url(images/bgTY.jpg)";
				setPrice("胎压检测",1000);
				break;
			case 1:
				text="<span>￥0</span>";
				img="url(images/bgTY1.jpg)";
				subtractPrice("胎压检测",-1000);
				break;
		};
		//img="url(images/bgTY.jpg)";
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
		$(".carsPic").show().css("background-image",img);
	});
	
	//方向盘材质
	$(".fxpCzTab .swiper-slide").click(function(){
		var index = $(this).index();
		var img;
		var text;
		switch(index)
		{
			case 0:
				text="运动平底真皮多功能方向盘<span>￥2000</span>";
				img="url(images/bgFXP.jpg)";
				subtractPrice("运动平底革面方向盘",-1000);
				setPrice("运动平底真皮多功能方向盘",2000);
				break;
			case 1:
				text="运动平底革面方向盘<span>￥1000</span>";
				img="url(images/bgFXP1.jpg)";
				setPrice("运动平底革面方向盘",1000);
				subtractPrice("运动平底真皮多功能方向盘",-2000);
				break;
		};
		//img="url(images/bgFXP.jpg)";
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
		$(".carsPic").show().css("background-image",img);
	});
		
	//音响
	$(".YXTab .swiper-slide").click(function(){
		var index = $(this).index();
		var img;
		var text;
		switch(index)
		{
			case 0:
				text="6喇叭高品质音响<span>￥1000</span>";
				img="url(images/bgYX.jpg)";
				setPrice("6喇叭高品质音响",1000);
				subtractPrice("8喇叭高品质音响",-2000);
				subtractPrice("11喇叭高品质音响",-3000);
				break;
			case 1:
				text="8喇叭高品质音响<span>￥2000</span>";
				img="url(images/bgYX1.jpg)";
				subtractPrice("6喇叭高品质音响",-1000);
				setPrice("8喇叭高品质音响",2000);
				subtractPrice("11喇叭高品质音响",-3000);
				break;
			case 2:
				text="11喇叭高品质音响<span>￥3000</span>";
				img="url(images/bgYX2.jpg)";
				subtractPrice("6喇叭高品质音响",-1000);
				subtractPrice("8喇叭高品质音响",-2000);
				setPrice("11喇叭高品质音响",3000);
				break;
		};
		//img="url(images/bgYX.jpg)";
		$(this).parents(".secondFloorSwiper").siblings(".text").find(".textSpan").html(text);
		$(".carsPic").show().css("background-image",img);
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




function showBox(cla){
	$("#overlay").show();
	$("."+cla).show().css("top",($(window).height()-$("."+cla).height())/2);	
}

function closeBox(){
	$("#overlay, .popBox").hide();	
}




//======================================


var price = 180000;  //裸车初始价格
var priceList = [];  //增加价格

function setPrice(value_name,value_price)
{
   if(priceList.indexOf(value_name)>-1)
   {
		console.log("当前已经添加");
   }else{
		priceList.push(value_name);
		price+=value_price;
   }
   getPrice();
}
function subtractPrice(value_name,value_price)
{
	if(priceList.indexOf(value_name)>-1)
   {
		console.log("当前已经添加,可以减去");
		priceList.remove(value_name);
		price+=value_price;
   }else{
		
		console.log("当前没有,不可以减去");
   }
   getPrice();
}


function getPrice()
{
	console.log("当前价格:"+price);
	$(".totalPrice>span>span").html(price);
}

/**
*删除数组指定下标或指定对象
*/
Array.prototype.remove=function(obj){
	for(var i =0;i <this.length;i++){
		var temp = this[i];
		if(!isNaN(obj)){
			temp=i;
		}
		if(temp == obj){
			for(var j = i;j <this.length;j++){
				this[j]=this[j+1];
			}
			this.length = this.length-1;
		}
	}
} 


function switchGroup(value)
{

    $("#container").hide();
	setRenderOpen(false);
    showPano(false);
	//点击组
	if(value == 0)
	{
		//外观
	  $("#container").show();
	  setRenderOpen(true);
	}
	if(value == 1)
	{
		//内饰
		showPano(true);
	}
	if(value == 2)
	{
		//个性化装饰
	}
}

//显示内饰
function showPano(value)
{
	if(value)
	{
		$("#pano").show();
		if(!_panoBoo)
		{
			embedpano({swf:"pano/krpano.swf", xml:"pano/dt_pano/contextmenu.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,onready: krpanoReady,id:"pano1"});
			_panoBoo = true;
			panoStart();
		}
	}else{
		$("#pano").hide();
	}
		
}

