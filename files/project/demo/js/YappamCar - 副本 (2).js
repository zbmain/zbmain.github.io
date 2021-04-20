        var container = document.getElementById( 'container' );
		
		var SCREEN_WIDTH = $(".carFlash").width();
		var SCREEN_HEIGHT = $(".carFlash").height();
		
		console.log( "预设物体名称:", $(".carFlash").height());

		var renderer, scene, camera, clock = new THREE.Clock(), fov = 50;
		
		var _carMaterials = [];
		//环境光
		var _ambientLight;
	
	    //贴图
		var luntai = new THREE.TextureLoader().load( 'models/json/car4/images/luntai01.jpg' );
		var luntai2 = new THREE.TextureLoader().load( 'models/json/car4/images/luntai02.jpg' );
		var logo = new THREE.TextureLoader().load( 'models/json/car4/images/biao.jpg' );
		var qiandeng = new THREE.TextureLoader().load( 'models/json/car4/images/dadeng.jpg' );
		var houshijing = new THREE.TextureLoader().load( 'models/json/car4/images/houshijing.jpg' );
		var chepai = new THREE.TextureLoader().load( 'models/json/car4/images/chepaizi.jpg' );
		var weideng = new THREE.TextureLoader().load( 'models/json/car4/images/weideng.jpg' );
		var duge = new THREE.TextureLoader().load( 'models/json/car4/images/dugu.jpg' );
		
		//内饰
		
		var zhongKongTai = new THREE.TextureLoader().load( 'models/json/car4/images/ZhongKongTai.jpg' );
		var zhongKongTai2 = new THREE.TextureLoader().load( 'models/json/car4/images/ZhongKongTai2_1.jpg' );
		var fangXiangPan = new THREE.TextureLoader().load( 'models/json/car4/images/FangXiangPan.jpg' );
		var cheMen = new THREE.TextureLoader().load( 'models/json/car4/images/chemen.jpg' );
		var zuoyi_qian = new THREE.TextureLoader().load( 'models/json/car4/images/zuoyi_qian.jpg' );
		var zuoyi_hou = new THREE.TextureLoader().load( 'models/json/car4/images/zuoyi_hou.jpg' );
		var cheding = new THREE.TextureLoader().load( 'models/json/car4/images/cheding.jpg' );
		var fenghexian = new THREE.TextureLoader().load( 'models/json/car4/images/fenghexian.png' );
		var ZhongKongTaiHei = new THREE.TextureLoader().load( 'models/json/car4/images/ZhongKongTaiHei.jpg' );
		
		//控制器
		var gui, guiElements = [];
		var param = { example: 'fresnel' };
		var reflectance;
		var power
		var color
		var mtl

		//环境贴图
		var cubemap = function() {
	
			var path = "textures/cube/ft/";
			var format = '.jpg';
			var urls = [
					path + '20_b' + format, path + '20_f' + format,
					path + '20_u' + format, path + '20_d' + format,
					path + '20_r' + format, path + '20_l' + format
				];	

			var textureCube = new THREE.CubeTextureLoader().load( urls );
			textureCube.format = THREE.RGBFormat;

			return textureCube;

		}();
		//金属贴图
		var cubemapJinShu = function() {

			var path = "textures/cube/xx/";
			var format = '.png';
			var urls = [
					path + 'tarmac-diffuse.PX' + format, path + 'tarmac-diffuse.NX' + format,
					path + 'tarmac-diffuse.PY' + format, path + 'tarmac-diffuse.NY' + format,
					path + 'tarmac-diffuse.PZ' + format, path + 'tarmac-diffuse.NZ' + format
				];	

			var textureCube = new THREE.CubeTextureLoader().load( urls );
			textureCube.format = THREE.RGBFormat;

			return textureCube;

		}();
		
		var carView;
		
		var textureCube;
		var cameraCube, sceneCube;
		
		var directionalLight;
		var light;
		var hemiLight;
		var areaLight1, areaLight2,areaLight3;
		
		var wheelMesh;
		
		var loadInt;

		window.addEventListener( 'load', init );

		function init() {

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.autoClear = false;
			renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			container.appendChild( renderer.domElement );
		//	renderer.setClearColor(0xFFFFFF, 1.0);//设置canvas背景色(clearColor)
		
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000 );
			//车身
			camera.position.x = 50;
			camera.position.z = -50;
			camera.position.y = 30;
			camera.target = new THREE.Vector3();
			
			controls = new THREE.OrbitControls( camera, renderer.domElement );
			
			controls.target = new THREE.Vector3( 0, -5, 0 );
			//车身
			controls.minDistance = 50;
			controls.maxDistance = 200;
			
			//限制上下翻转
			//车身
			controls.minPolarAngle = 1.1; // radians
        	controls.maxPolarAngle = 1.5; // radians
			
			// SKYBOX
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
			sceneCube.add( cameraCube );
				/*
			var path = "textures/cube/ft/";
			var format = '.jpg';
			var urls = [
				path + '20_b' + format, path + '20_f' + format,
				path + '20_u' + format, path + '20_d' + format,
				path + '20_r' + format, path + '20_l' + format
			];

			textureCube = new THREE.CubeTextureLoader().load( urls );
			*/
			var shader = THREE.ShaderLib[ "cube" ];
		//	shader.uniforms[ "tCube" ].value = textureCube;
			shader.uniforms[ "tCube" ].value = cubemap;
			var material = new THREE.ShaderMaterial( {

				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide

			} ),
			mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), material );
			sceneCube.add( mesh );
			
			updateMaterial();
			initLights();
			window.addEventListener( 'resize', onWindowResize, false );
			onWindowResize();
			animate();
			initObjects();
		}
		
		//加载各个模型
		function initObjects() {
		    
			loadInt = 0;
		
			var loader = new THREE.JSONLoader();
			var callbackMale = function ( geometry , materials) 
			{
				//console.log( "加载的物体名称:", geometry.name);
				loadInt++;
				if(loadInt == modelList.length)
				{
				    console.log( "加载完毕");
					$("#overlay1").hide();
					$(".loader").hide();
				}
				
			    if(geometry.name == "cheshenGeometry" || geometry.name == "chedingGeometry" || geometry.name == "zuoqianmenGeometry" || geometry.name == "zuohoumenGeometry" || geometry.name == "youqianmenGeometry" || geometry.name == "youhoumenGeometry"
				|| geometry.name == "fadongjigaGeometry" || geometry.name == "youchuangdGeometry" || geometry.name == "houbeixia3Geometry" || geometry.name == "tongsebaowGeometry" || geometry.name == "zuohoushijGeometry" || geometry.name == "waihoushi0Geometry"
                || geometry.name == "youqianbasGeometry"|| geometry.name == "youhoubashGeometry"|| geometry.name == "zuoqianba0Geometry"|| geometry.name == "zuoqianme3Geometry"|| geometry.name == "youqianme0Geometry"|| geometry.name == "youhoumennGeometry"|| geometry.name == "zuohoumennGeometry"
				|| geometry.name == "zuohoubashGeometry"|| geometry.name == "dingfengyiGeometry")
				{
				    if(geometry.name == "cheshenGeometry")
					{
					   carView = geometry
					}
					if(geometry.name == "tongsebaowGeometry")
					{
					   return ;
					}
					createScene( geometry, mtl, null, 0, 0, 0, 0 );
					return ;
				}
				if(geometry.name == "cheboliGeometry" || geometry.name == "tianchuangGeometry.1" || geometry.name == "zuohouboliGeometry" || geometry.name == "zuoqianbolGeometry" || geometry.name == "youqianbo0Geometry" || geometry.name == "youhouboliGeometry"
				|| geometry.name == "waitianchuGeometry"|| geometry.name == "houboliGeometry"|| geometry.name == "zuoqianbo0Geometry"|| geometry.name == "youqianbolGeometry")
				{
				    createScene(geometry,_carMaterials[3], null, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "qianbiaoboGeometry")
				{
				    createScene(geometry,_carMaterials[14], null, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "luntaiGeometry")
				{
				    createScene(geometry,_carMaterials[0], luntai, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "duge03Geometry" || geometry.name == "qianjinqigugeGeometry" || geometry.name == "duge02Geometry" || geometry.name == "qinqidugeGeometry" || geometry.name == "chechuangdGeometry"
				|| geometry.name == "qianbiaoduGeometry"|| geometry.name == "wudengdugeGeometry"|| geometry.name == "houdugeGeometry"|| geometry.name == "xinglijiahGeometry"|| geometry.name == "paiziguanGeometry"|| geometry.name == "xuanchuangGeometry"
				|| geometry.name == "zi01Geometry"|| geometry.name == "20TGeometry"|| geometry.name == "zuoqiandugGeometry"|| geometry.name == "zuohoudugeGeometry"|| geometry.name == "youqiandugGeometry"|| geometry.name == "youhoudugeGeometry"
				|| geometry.name == "yingbinda0Geometry"|| geometry.name == "youqianba0Geometry"|| geometry.name == "youhoubas0Geometry"|| geometry.name == "zuoqianbasGeometry"|| geometry.name == "zuohoubahsGeometry")
				{
					createScene(geometry,_carMaterials[5], null, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "qiandengGeometry")
				{
					createScene(geometry,_carMaterials[1], null, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "chebiaoGeometry")
				{
				    createScene(geometry,_carMaterials[8], logo, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "qiandadeng01Geometry")
				{
				    createScene(geometry,_carMaterials[2], qiandeng, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "qiandadeng02Geometry")
				{
				    createScene(geometry,_carMaterials[4], qiandeng, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "baoweisuliaoGeometry" || geometry.name == "geshansuliaoGeometry"  || geometry.name == "xiajinqigeshanGeometry" || geometry.name == "dipanGeometry" || geometry.name == "BzhuGeometry" || geometry.name == "qiandiheiGeometry"
				|| geometry.name == "chexianGeometry" || geometry.name == "dadengqingGeometry" || geometry.name == "qianleidaGeometry" || geometry.name == "sanjiaochuGeometry"|| geometry.name == "chemenjie0Geometry"|| geometry.name == "houbiaoheiGeometry"|| geometry.name == "houleidaGeometry"
				|| geometry.name == "tianchuangGeometry")
				{
				    createScene(geometry,_carMaterials[9], null, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "wudengjinqGeometry" || geometry.name == "wudengGeometry" || geometry.name == "heibaoweiGeometry" || geometry.name == "houyushuaGeometry" || geometry.name == "houhuban00Geometry"
				||geometry.name == "zuoqianme1Geometry"||geometry.name == "zuohoumen0Geometry"||geometry.name == "youhouhumeGeometry"||geometry.name == "youqianme2Geometry" )
				{
				    createScene(geometry,_carMaterials[13], null, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "zuohoushi1Geometry"||geometry.name == "waihoushijGeometry")
				{
				    createScene(geometry,_carMaterials[10], houshijing, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "chepai01Geometry"||geometry.name == "yingbindabGeometry")
				{
				    createScene(geometry,_carMaterials[11], chepai, 0, 0, 0, 0);
					return ;
				}
				if( geometry.name == "weidengbolGeometry" || geometry.name == "weidengbo2Geometry")
				{
				    createScene(geometry,_carMaterials[6], null, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "weidengGeometry" || geometry.name == "weidenghbGeometry")
				{
				    createScene(geometry,_carMaterials[7], weideng, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "weidengbo0Geometry" || geometry.name == "weidengbo1Geometry")
				{
				    createScene(geometry,_carMaterials[15], null, 0, 0, 0, 0);
					return ;
				}	
				
				if(geometry.name == "houbolizhuGeometry" || geometry.name == "zuoqianme0Geometry" || geometry.name == "zuohoumenkGeometry" || geometry.name == "youqianme3Geometry" || geometry.name == "youhoumenkGeometry"|| geometry.name == "boliheiGeometry")
				{
				    createScene(geometry,_carMaterials[12], weideng, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "biaoGeometry" || geometry.name == "houbiaogwGeometry")
				{
				    createScene(geometry,new THREE.MeshPhongMaterial( { color: 0xffffff } ), logo, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "chepaiziGeometry" || geometry.name == "houchepaiGeometry")
				{
				    createScene(geometry,new THREE.MeshPhongMaterial( { color: 0xffffff } ), chepai, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "dadengboliGeometry")
				{
				    createScene(geometry,_carMaterials[15], null, 0, 0, 0, 0);
					return ;
				}
				
				if(geometry.name == "dadeng01Geometry"|| geometry.name == "dadeng02Geometry")
				{
				    createScene(geometry,_carMaterials[5], null, 0, 0, 0, 0);
					return ;
				}
				if(geometry.name == "dadeng03Geometry")
				{
				    createScene(geometry,_carMaterials[16], null, 0, 0, 0, 0);
					return ;
				}
				
				//内饰
				//中控台1
				if(geometry.name == "taomumianbGeometry" || geometry.name == "yibiaopanGeometry" || geometry.name == "zhongkongxGeometry" || geometry.name == "zhongyangtGeometry"|| geometry.name == "zhongyang0Geometry"
				||geometry.name == "chementao0Geometry"||geometry.name == "chementaomGeometry"||geometry.name == "chementao1Geometry"||geometry.name == "chementao2Geometry"||geometry.name == "dangshangGeometry"
				||geometry.name == "chukongbanGeometry"||geometry.name == "qianlabaGeometry"||geometry.name == "shoudangmiGeometry")
				{
				   createScene(geometry,_carMaterials[17], zhongKongTai, 0, 0, 0, 0);
				   return ;
				}
				//中控台2
				if(geometry.name == "yinxiangmiGeometry" ||geometry.name == "qiankongtiGeometry"||geometry.name == "kongtiaomiGeometry"||geometry.name == "dapingkuanGeometry"||geometry.name == "zhongkongpGeometry"
				||geometry.name == "shuangshanGeometry")
				{
				   createScene(geometry,_carMaterials[18], zhongKongTai2, 0, 0, 0, 0);
				   return ;
				}
				//方向盘
				if(geometry.name == "fangxiangpGeometry"||geometry.name == "fangxiang0Geometry"||geometry.name == "fangxiang1Geometry"||geometry.name == "FangXiangPGeometry"||geometry.name == "yijianqidoGeometry")
				{
				   createScene(geometry,_carMaterials[19], fangXiangPan, 0, 0, 0, 0);
				   return ;
				}
				//车门
				if(geometry.name == "chemenzhonGeometry"||geometry.name == "chemenxiaGeometry"||geometry.name == "chemenbashGeometry"||geometry.name == "chechuangnGeometry")
				{
				   createScene(geometry,_carMaterials[20], cheMen, 0, 0, 0, 0);
				   return ;
				}
				//座椅前
				if(geometry.name == "ZuoYi_Qia1Geometry"||geometry.name == "ZuoYi_QianGeometry"||geometry.name == "chemenbashGeometry"||geometry.name == "chechuangnGeometry"||geometry.name == "fujiadian0Geometry"||geometry.name == "ZuoYiQian_Geometry")
				{
				   createScene(geometry,_carMaterials[21], zuoyi_qian, 0, 0, 0, 0);
				   return ;
				}
				//座椅后
				if(geometry.name == "ZuoYi_HouPGeometry")
				{
				   createScene(geometry,_carMaterials[22], zuoyi_hou, 0, 0, 0, 0);
				   return ;
				}
				//车顶
				if(geometry.name == "CheKuangJiGeometry"||geometry.name == "NeiHouShiJGeometry"||geometry.name == "houshijingGeometry")
				{
				   createScene(geometry,_carMaterials[23], cheding, 0, 0, 0, 0);
				   return ;
				}
				//中控台镀铬
				if(geometry.name == "zhongkongmGeometry"||geometry.name == "zhongkong0Geometry"||geometry.name == "dangjinshuGeometry"||geometry.name == "shoudangjiGeometry")
				{
				   createScene(geometry,_carMaterials[24], duge, 0, 0, 0, 0);
				   return ;
				}
				//缝合线
				if(geometry.name == "ZuoYi_FengGeometry"||geometry.name == "fenghexia0Geometry"||geometry.name == "ZuoYi_Fen0Geometry"||geometry.name == "fenghexianGeometry")
				{
				   createScene(geometry,_carMaterials[25], fenghexian, 0, 0, 0, 0);
				   return ;
				}
				
				//杯架
				if(geometry.name == "gaobeituoGeometry")
				{
				   createScene(geometry,_carMaterials[26], ZhongKongTaiHei, 0, 0, 0, 0);
				   return ;
				}
				
				
				
				if(geometry.name == "dapingkua0Geometry"||geometry.name == "zhongyang2Geometry"||geometry.name == "xinglijiaGeometry"||geometry.name == "youhouhubeGeometry"
				||geometry.name == "youqianhubGeometry"||geometry.name == "zuohoumenhGeometry"||geometry.name == "zuoqianme2Geometry")
				{
				   return ;
				}
				
				
				
				
				createScene(geometry,new THREE.MeshPhongMaterial( { color: 0x000000 } ), null, 0, 0, 0, 0);
				console.log( "没有预设物体名称:", geometry.name);
				
			};
			
			var modelList = ["baoweisuliao","cheding","chejia","chelungu","cheneijia","dadongjicangkuang","diban","dugegeshan","fadongjigere","fadongjitietu","fenghexian","geshansuliao","houbeixianggai","houbeixiangheixian"
			
			,"houbeixiangkuang","houbeixiangkuang1","houbeixiangkuang2","houbeixiangweiyi","houdangfengboli","houpaizuoyi","menkuangshangfangjingshutiao","qianchebiao","qianchebiaokuang","qianchebiaopian","qiandangfengboli"
			,"qiandangfengheibaoli","qianhoubaowei","qianyushua","taban","tabanjinshubian","tianchuangboli","tianchuangxian","xiabufenghexian","xiabufenghexian2","xiajinqigeshan","xinglijia","xinglijia1","yinqinggai","youhouboli"
			,"youhoumen","youhoumenheiboli","youhoumenhuban","youhoumenhuban1","youhoumenjinshu","youhoumenjinshuxia","youhoumenkuang","youhoumenlashou","youhoumennei","youhoumenquan","youhoumenxian","youhoumenzhuangshi","youhoushijing"
			,"youqianboli","youqianmen","youqianmenheiboli","youqianmenhuban","youqianmenhuban1","youqianmenjinshu","youqianmenjinshuxia","youqianmenkuang","youqianmenlashou","youqianmennei","youqianmenquan","youqianmenxian","youqianmenzhuangshi"
			,"yousanjiaoboli","zhongkongfenghexian","zhongkongheixian","zhongkonglaba","zhongkongmuwen","zhongkongtai","zuohouboli","zuohoumen","zuohoumenheiboli","zuohoumenhuban","zuohoumenhuban1","zuohoumenjinshuxia","zuohoumenkuang"
			,"zuohoumenlashou","zuohoumenlashoujinshu","zuohoumennei","zuohoumenquan","zuohoumenxian","zuohoumenzhuangshi","zuohoushijing","zuoqianboli","zuoqianmen","zuoqianmenheiboli","zuoqianmenhuban","zuoqianmenhuban1","zuoqianmenjinshuxia"
			,"zuoqianmenkuang","zuoqianmenlashou","zuoqianmenlashoujinshu","zuoqianmennei","zuoqianmenquan","zuoqianmenxian","zuoqianmenzhuangshi","zuosanjiaoboli","zuoyoumenkuang","zuoyoumensuliao"
			,"dadengboli","dadengduge","dadengke","dadengneibuliangjian","dadengqingxi","dadengzhuti","houbeixiangduge","houchepaizi","jigaizhuangshi","menshangheisuliao","qianchepaizi","qianleida","shayuqi","wudeng","wudengduge","wudengheiquan","wudengjingshuhuan"
			,"houbeixiangzi","houbiao","houhuban","houleida","houyushua","paiqiguan","T","weideng","weideng2","weidengbaiboli","weidengbaiboli2","weidenghongboli","weidenghongboli2","youcehoushijingboli","youcehoushijingdeng","zuocehoushijingboli","zuocehoushijingdeng"
			,"danggan","danggantao","dapingmu","fangxiangpan","fangxiangpandizuo","fangxiangpanfenghexian","fangxiangpanjinshu","fangxiangpanzhongjian","fujiazuoyidizuo","houbiaodianpian","kongtiaomianban","neihoushijing","neihoushijingdizuo","qianpaizuoyidian"
			,"qianpaizuoyikaobei","yibiaopan","zhongkongcaozuomianban","zhongkongdaping","zhongkongmianban","zhongkongtaomu","zhongyangtongdao","zhongyangtongdaodi","zhongyangtongdaofenghexian","zhongyangtongdaomianban","zuoyidibufenghexian","zuoyidizuo","zuoyifenghexian"
			,"chukongban","dangmianban","gaopeibeijia","shoudangjinshu","shuangshan","yijianqidong"]
			for(var i=0;i<modelList.length;i++)
			{
		     	//console.log( "加载物体名称:", modelList.length);
				loader.load( "models/json/car4/"+modelList[i]+".json", callbackMale );
			}
			
		}
		
		//根据加载完成的模型设置材质和贴图
		function createScene( geometry, material, map, x, y, z, b ) {
		
			var mesh = new THREE.Mesh( geometry );
			scene.add( mesh );
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 200;
			
			if(material)
			{
			   mesh.material = material;
			}
			if(map)
			{
				mesh.material.map = map;
			}
			
			if(geometry.name == "luntaiGeometry")
			{
			  wheelMesh = mesh;
			}
		}
		
		//创建车漆材质
		function updateMaterial() {
		
		    mtl = new THREE.PhongNodeMaterial();
			reflectance = new THREE.FloatNode( 1.14 );
			power = new THREE.FloatNode( 1 );
			color = new THREE.CubeTextureNode( cubemap );
			var viewZ = new THREE.Math2Node(
				new THREE.NormalNode( THREE.NormalNode.VIEW ),
				new THREE.Vector3Node( 0, 0, - 1 ),
				THREE.Math2Node.DOT
			);

			var theta = new THREE.OperatorNode(
				viewZ,
				new THREE.FloatNode( 1 ),
				THREE.OperatorNode.ADD
			);

			var thetaPower = new THREE.Math2Node(
				theta,
				power,
				THREE.Math2Node.POW
			);

			var fresnel = new THREE.OperatorNode(
				reflectance,
				thetaPower,
				THREE.OperatorNode.MUL
			);

			mtl.color = new THREE.ColorNode( 0x574a42 );
			mtl.environment = color;
			mtl.environmentAlpha = new THREE.Math1Node( fresnel, THREE.Math1Node.SAT );
			
			//mtl.roughness = 0.97;
			//mtl.shininess = 0.97;
			//棕色
			mtl.specular = new THREE.ColorNode( 0x979593 );
			mtl.build();  

         //各种部件材质
			_carMaterials = [
			            
						// 轮毂 0
						new THREE.MeshPhongMaterial( { color: 0xffffff } ),

						// 大灯玻璃 1
						new THREE.MeshPhongMaterial( { color: 0x333333,	specular: 0xffffff,	opacity: 0.6, transparent: true ,envMap: cubemap} ),

						// 大灯内部 2
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	shininess: 500,envMap: cubemap} ),

						// 车窗玻璃 3
						//new THREE.MeshPhongMaterial( { color: 0x101046,	specular: 0xffffff,	opacity: 0.25, transparent: true } ),
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.74, transparent: true ,envMap: cubemap} ),

						// 大灯内部框 4
						new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 500 } ),

						// 镀铬 5
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	shininess: 500,  metalness:1.1 ,roughtness:0.1,opacity:5.1,envMap: cubemapJinShu} ),

						// 尾灯罩 6
						new THREE.MeshPhongMaterial( { color: 0xfd0606,	specular: 0xffffff,	shininess: 500,	opacity: 0.6, transparent: true,envMap: cubemap  } ),

						// 尾灯 7
						new THREE.MeshPhongMaterial( { color: 0xfd0606,	specular: 0xffffff,	shininess: 500 ,metal:true,reflectvity:1 } ),
						
						// Logo 8
						new THREE.MeshPhongMaterial( { color: 0xffffff } ),
						
						// 黑色塑料 9
						new THREE.MeshPhongMaterial( { color: 0x000000,	specular: 0x333333 } ),
						
						// 后视镜 10
						new THREE.MeshPhongMaterial( { color: 0xFFFFFF,	specular: 0x333333 } ),
						
						// 车牌子 11
						new THREE.MeshPhongMaterial( { color: 0x333333,	specular: 0x333333 } ),
						
						// 黑色亮反光塑料 12
						new THREE.MeshPhongMaterial( { color: 0x333333,	specular: 0xffffff,	shininess: 500,	envMap: cubemap	} ),
						
						// 稍微有些反光的黑色塑料 13
						new THREE.MeshPhongMaterial( { color: 0x1c1c1c,	specular: 0x7f7f7f } ),
						// logo玻璃 14
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.34, transparent: true ,envMap: cubemap} ),
						
						// 大灯玻璃 15
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.6, transparent: true ,envMap: cubemap} ),
						
						// 车灯内部 16
						new THREE.MeshPhongMaterial( { color: 0x222222,	specular: 0x333333,	shininess: 500,  metalness:1.1 ,roughtness:0.1,opacity:5.1,envMap: cubemapJinShu} ),
						
						//中控台  17
						new THREE.MeshPhongMaterial( { color: 0xcbcbcb,	specular: 0x282828 } ),
						//中控台2  18
						new THREE.MeshPhongMaterial( { color: 0xcbcbcb,shininess: 5} ),
						//方向盘  19
						new THREE.MeshPhongMaterial({color: 0xcbcbcb}),
						//车门  20
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0x333333 ,shininess: 5} ),
						//座椅前  21
						new THREE.MeshPhongMaterial( { color: 0xcbcbcb,	specular: 0x333333 } ),
						//座椅后  22
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0x333333 } ),
						//车顶  23
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0x000000} ),
						//中控台镀铬  24
						new THREE.MeshPhongMaterial({ color: 0xa5a5a5,	specular: 0x333333,	shininess: 500,  metalness:1.1 ,roughtness:0.1,opacity:5.1,envMap: cubemapJinShu}  ),
						//缝合线  25
						new THREE.MeshPhongMaterial( { color: 0xffffff,transparent: true } ),
						//杯架  26
						new THREE.MeshPhongMaterial( { color: 0xcbcbcb,	specular: 0x333333 } )

					];	
		}
		
		

		//初始化灯光
		function initLights() {
		    _ambientLight = new THREE.AmbientLight( 0x4c4c4c)
			scene.add(_ambientLight);
			
			directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
			directionalLight.position.set( 1, 0.75, 0.5 );
			scene.add( directionalLight );
			
			light = new THREE.DirectionalLight( 0xe9dcd0, 0.5 );
			light.position.set( - 1, 0.75, - 0.5 );
			scene.add( light );
		
			//addPointLight( 60, 70, 50, 0xccccff, 1.9, 150, scene );
			//左
			areaLight1 = addPointLight( 60, 70, 50, 0xffffff, 0.6, 150, scene );
			//右
			///addPointLight( 10, 30, -50, 0xffffff, 0.9, 350, scene );
			areaLight2 = addPointLight( 10, 30, -50, 0xffffff, 0.6, 350, scene );
			//addPointLight( 10, 70, 50, 0x00ffff, 0.9, 150, scene );
			
			areaLight3 = addPointLight( 0, 0, 0, 0xffffff, 0.3, 350, scene );
			areaLight3.visible = false;
			
		//	addPointLight( 120, 70, 10, 0x00ffff, 0.9, 0, scene );
		//	addPointLight( -120, 70, 10, 0xffffff, pointIntensity, 200, scene );
			
			//棕色
			hemiLight = new THREE.HemisphereLight(0x574a42,0x91745d,0.5);
			hemiLight.position.set(0,1500,0);
			scene.add(hemiLight);
						
		}
		
		//在场景里面添加灯光
		function addPointLight( x, y, z, color, intensity, distance, root ) {

					var point = new THREE.PointLight( color, intensity, distance );
					point.position.set( x, y, z );
					root.add( point );
					
					/*
					var lightGeo = new THREE.SphereGeometry( 1, 1);
					var emitter = new THREE.Mesh( lightGeo, new THREE.MeshBasicMaterial( { color: color } ) );
					emitter.position = point.position;
					root.add( emitter );*/
					
					return point;
		}
		
		
		function onWindowResize() {
		    SCREEN_WIDTH = $(".carFlash").width();
		    SCREEN_HEIGHT = $(".carFlash").height();
			
			var width = SCREEN_WIDTH, height = SCREEN_HEIGHT;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize( width, height );
			
			cameraCube.aspect = width / height;
			cameraCube.updateProjectionMatrix();
		}

		function animate() {
		
			//renderer.render( scene, camera );
			requestAnimationFrame( animate );
			renderer.clear();
			renderer.render( sceneCube, cameraCube );
			renderer.render( scene, camera );
			cameraCube.rotation.copy( camera.rotation );
			//--Angle();
			
		//	directionalLight.position = camera.position;
		}
		
		//判断场景方向角度
		function Angle()
		{
			var vector = new THREE.Vector3(0,0,0);
			var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
			//console.log(ray.ray.direction);
			param1 = ray.ray.direction;
			
			if(param1.x<-0.9)
			{
				console.log("后");
				_angle = "后";
			}
			if(param1.x>0.9)
			{
				console.log("前");
				_angle = "前";
			}
			
			if(param1.x>-0.5&&param1.x<0.5)
			{
				//前 或 后
				if(param1.z>0)
				{
					console.log("右");
					_angle = "右";
				}else{
					console.log("左");
					_angle = "左";
				}
			}
		}
		
		function buttonClick(value){
			
			//车身
			if(value == 0)
			{
			 _ambientLight.visible = false;
			 areaLight3.visible = false;
			 /*
			 directionalLight.visible = true;
			 light.visible = true;
			 areaLight1.visible = true;
			 areaLight2.visible = true;
			 hemiLight.visible = true;
			 */
			 
			 controls.target = new THREE.Vector3( 0, -5, 0 );
			 controls.minDistance = 50;
			 controls.maxDistance = 200;
			 controls.minPolarAngle = 1.1;
        	 controls.maxPolarAngle = 1.5;
			
			 camera.position.x = -70.82242149742207;
			 camera.position.z = 47.02789436819306;
			 camera.position.y = 11.028778780448798;
			 controls.update();
			}
			//内饰
			if(value == 1)
			{
			 _ambientLight.visible = true;
			 areaLight3.visible = true;
			 /*
			 directionalLight.visible = false;
			 light.visible = false;
			 areaLight1.visible = false;
			 areaLight2.visible = false;
			 hemiLight.visible = false;*/
			 
			 controls.target = new THREE.Vector3( 0, 5, 0 );
			 
			 controls.minDistance = 8;
			 controls.maxDistance = 8;
			 controls.minPolarAngle = 0.4; 
        	 controls.maxPolarAngle = 2.3; 
			 
			 camera.position.x = 7.984413288473055;
			 camera.position.z = 0.49259608077923756;
			 camera.position.y = 5.080582504651032;
			 controls.update()
			}	

			//打印相机位置
			if(value == 2)
			{
               console.log( "load time:PPPPPPPPPLKKKKK",camera.position,controls.target);
			}			
			//白色
			if(value == 3)
			{
			   reflectance.number = 0.9;
			   power.number = 1;
			   
			   mtl.color.value.setHex( 0xFFFFFF );
			   mtl.specular = new THREE.ColorNode( 0x000000 );
			   
			   directionalLight.visible = false;
			   
			   light.color = new THREE.ColorNode( 0xccccff );
			   light.intensity = 0.4;
			   
			   hemiLight.color = new THREE.ColorNode( 0xffffff );
			   hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			   hemiLight.intensity = 1.1;
			   
			   areaLight1.visible = true;
			   areaLight2.visible = false;
			   areaLight1.color = new THREE.ColorNode( 0xccccff );
			   areaLight1.intensity = 0.9;
			   console.log( "load time:PPPPPPPPPLKKKKK",hemiLight);
			}
			//棕色
			if(value == 4)
			{
			   reflectance.number = 1.1;
			   power.number = 1;
			   
			   mtl.color.value.setHex( 0x574a42 );
			   mtl.specular = new THREE.ColorNode( 0x979593 );
			   
			   directionalLight.visible = true;
			   
			   light.color = new THREE.ColorNode( 0xe9dcd0 );
			   light.intensity = 0.5;
			   
			   hemiLight.color = new THREE.ColorNode( 0x574a42 );
			   hemiLight.groundColor = new THREE.ColorNode( 0x91745d );
			   hemiLight.intensity = 0.5;
			   
			   areaLight1.visible = true;
			   areaLight2.visible = true;
			   areaLight1.color = new THREE.ColorNode( 0xffffff );
			   areaLight1.intensity = 0.6;
			}
			//红色
			if(value == 5)
			{
               reflectance.number = 0.75;
			   power.number = 0.6;
			   
			   mtl.color.value.setHex( 0xa4001d );
			   mtl.specular = new THREE.ColorNode( 0x979593 );
			   
			   directionalLight.visible = true;
			   
			   light.color = new THREE.ColorNode( 0xe9dcd0 );
			   light.intensity = 0.5;
			   
			   hemiLight.color = new THREE.ColorNode( 0xffffff );
			   hemiLight.groundColor = new THREE.ColorNode( 0x91745d );
			   hemiLight.intensity = 0.5;
			   
			   areaLight1.visible = true;
			   areaLight2.visible = true;
			   areaLight1.color = new THREE.ColorNode( 0xffffff );
			   areaLight1.intensity = 0.6;
			}
			//金色
			if(value == 6)
			{
               reflectance.number = 0.94;
			   power.number = 1.0;
			   
			   mtl.color.value.setHex( 0xb3a797 );
			   mtl.specular = new THREE.ColorNode( 0xffffff );
			   
			   directionalLight.visible = true;
			   
			   light.color = new THREE.ColorNode( 0xe9dcd0 );
			   light.intensity = 0.5;
			   
			   hemiLight.color = new THREE.ColorNode( 0xffffff );
			   hemiLight.groundColor = new THREE.ColorNode( 0x91745d );
			   hemiLight.intensity = 0.5;
			   
			   areaLight1.visible = true;
			   areaLight2.visible = true;
			   areaLight1.color = new THREE.ColorNode( 0xffffff );
			   areaLight1.intensity = 0.6;
			}
			
			//轮毂1
			if(value == 7)
			{
		    	wheelMesh.material.map = luntai;
			}
			//轮毂2
			if(value == 8)
			{
		    	wheelMesh.material.map = luntai2;
			}
		}