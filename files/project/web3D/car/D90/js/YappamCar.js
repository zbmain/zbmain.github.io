        var container = document.getElementById( 'container' );
		var SCREEN_WIDTH = $(".carsFlash").width();
		var SCREEN_HEIGHT = $(".carsFlash").height();
		var renderer, scene, camera, clock = new THREE.Clock(), fov = 30;
		var _carMaterials = [];
		//环境光
		var _ambientLight;
	    //贴图
		var shadow = new THREE.TextureLoader().load( 'car/models/awd/car4/map/shadow.png' );
		var jinqikou = new THREE.TextureLoader().load( 'car/models/awd/car4/map/jinqikou.jpg' );
		
		var lungu = new THREE.TextureLoader().load( 'car/models/awd/car4/map/luntai011.jpg' );
		
		var luntai_1 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/a.jpg' );
		var luntai_2 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/a1.jpg' );
		var luntai_3 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/b.jpg' );
		var luntai_4 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/b1.jpg' );
		var luntai_5 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/c.jpg' );
		var luntai_6 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/c1.jpg' );
		var luntai_7 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/d.jpg' );
		var luntai_8 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/d1.jpg' );
		var luntai_9 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/e.jpg' );
		var luntai_10 = new THREE.TextureLoader().load( 'car/models/awd/car4/map/e1.jpg' );
		//控制器
		var reflectance;
		var power;
		var color;
		var mtl;
		//环境贴图
		var cubemap = function() {
			var path = "car/textures/cube/ft/6/2/";
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
		//灯光
		var directionalLight;
		var light,light1,light2,light3,light4,light5,light6,light7,light8,light9;
		var hemiLight;
		var areaLight1, areaLight2,areaLight3;
		var objects = [];
		var mouseX = 0, mouseY = 0;
		var raycaster = new THREE.Raycaster();
		var mouse = new THREE.Vector2();
		var _angle;
		//亮点开关
		var liangDian_boo = true;
		//车身模型
		var trunk;
		var trunk_objects=[];
		//车色
		var car_main_color = 0x8c7b47;
		//车色高光色
		var car_highlight_color = 0xe0daca;
		var deviceType="iphone";
		var _emitter;
		var autorotation = false;
		var indexBG_id = 0;
		var color_id=-3;
		var wheel_id=0;
		var hsp = "h";
		var renderBoo = true;
		var tween;
		var currentPosition; 
		var _spherical;
		var cameraCube, sceneCube;
		var MAIN_CONTENT_WIDTH = 200;
        var CAMERA_TO_MAIN_DIS = 200;
			
		function calcFov(d, w, r) {
			var f;
			var vertical = w;
			if (r < 1) {
				vertical = vertical/r;
			}
			f = Math.atan(vertical/d/2)*2 * (180 / Math.PI);
			return f;
		}	

		function initCarFun() {
			if(getQueryString("color"))
			{
			   color_id = getQueryString("color");
			   //console.log( "URL参数:",getQueryString("color"));
			}
			if(getQueryString("wheel"))
			{
			   wheel_id = getQueryString("wheel");
			   //console.log( "URL参数:",getQueryString("wheel"));
			}
			renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true,preserveDrawingBuffer:false} );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.domElement.style.position = "relative";
			renderer.autoClear = false;
			renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			container.appendChild( renderer.domElement );
			scene = new THREE.Scene();
			
			// SKYBOX
			sceneCube = new THREE.Scene();
			cameraCube = new THREE.PerspectiveCamera( 45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100 );
			sceneCube.add( cameraCube );
			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = cubemap;

			var material = new THREE.ShaderMaterial( {
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			} );

			var mesh = new THREE.Mesh( new THREE.BoxGeometry( 5, 5, 5 ), material );
			sceneCube.add( mesh );
			camera = new THREE.PerspectiveCamera( 30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000 );
			//车身
			camera.position.x = 511;
			camera.position.z = -340;
			camera.position.y = 38;
			camera.target = new THREE.Vector3();
			camera.lookAt({
					x: 0,
					y: 0,
					z: 0
				});
			camera.updateProjectionMatrix();
			controls = new THREE.OrbitControls( camera, container );
			controls.autoRotate = false;
			controls.target = new THREE.Vector3( 0, 15, 0 );
			//controls.addEventListener( 'change', render );
			controls.minDistance = 430;
			controls.maxDistance = 890;
			controls.minPolarAngle = 1.1; // radians
        	controls.maxPolarAngle = 1.5; // radians
			updateMaterial();
			window.addEventListener( 'resize', onWindowResize, false );
			container.addEventListener( 'touchmove', onDocumentMouseMove, false );
			
			onWindowResize();
			animate();
			initObjects();
		}
		
		//加载各个模型
		function initObjects() {
			// LOADER 
			var loader = new THREE.AWDLoader();
			loader.load( './car/models/awd/car4/myModel.awd', function ( _trunk ) {
			_trunk.position.x +=20;
			
			for(var i=0;i<_trunk.children[0].children.length;i++)
			{
			   var geometry = _trunk.children[0].children[i];
			   trunk_objects[geometry.name] = geometry;
			  //车漆
			   if(geometry.name == "chedingquan"||geometry.name == "cheshen"||geometry.name == "waihoushijing01")
			   {
			      createScene( geometry, mtl, null, 0, 0, 0, 0 );
			   }
			   //车窗玻璃
			   if(geometry.name == "cheboli"||geometry.name == "chedingquanboli")
			   {
				    createScene(geometry,_carMaterials[3], null, 0, 0, 0, 0);
			   }
			   //镀铬
				if(geometry.name == "chechuangzhuangshi"||geometry.name == "yizibanzhuangshi01"
				||geometry.name == "xinglijia"||geometry.name == "menbashou"||geometry.name == "dadenggaoduge"||geometry.name == "jinqiL02"||geometry.name == "chebiao"
				||geometry.name == "paiqiguan01"||geometry.name == "wudenggao")
				{
					createScene(geometry,_carMaterials[5], null, 0, 0, 0, 0);
				}
				//B柱亮塑料
				if(geometry.name == "ABCzhu"||geometry.name == "houchechuangzhuangshi01"||geometry.name == "dadenggaokaoqi")
				{
				    createScene(geometry,_carMaterials[12], null, 0, 0, 0, 0);
				}
				//不反光黑塑料
				if(geometry.name == "xingli"||geometry.name == "buxiugangfanggunjiaxia"||geometry.name == "yushua"||geometry.name == "chediduan"||geometry.name == "hei"||geometry.name == "chexian"||geometry.name == "dangniban")
			   {
			      createScene( geometry, _carMaterials[9], null, 0, 0, 0, 0 );
			   }
			   //反光黑塑料
			    if(geometry.name == "qianhuban01" || geometry.name == "houhuban01"|| geometry.name == "lunmei"|| geometry.name == "suliao01" )
				{
				    createScene(geometry,_carMaterials[13], null, 0, 0, 0, 0);
				}
				//前大灯玻璃
				if(geometry.name == "dadengboli"||geometry.name == "weidengbolibai"||geometry.name == "qianwudengboligao"||geometry.name == "wudenggaoboli")
				{
					createScene(geometry,_carMaterials[1], null, 0, 0, 0, 0);
				}
				//阴影
				if(geometry.name == "shadow"||geometry.name == "shadowchang")
				{
				   createScene(geometry,new THREE.MeshBasicMaterial( { color: 0x000000,transparent: true } ), shadow, null, 0, 0, 0, 0);
				}
				//进气口
				if(geometry.name == "jinqi001====+"||geometry.name == "jinqiL01=====+"||geometry.name == "taban01")
				{
				   createScene(geometry,new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000 } ), jinqikou, null, 0, 0, 0, 0);
				}
				
				//尾灯玻璃红
				if(geometry.name == "weidengbolihong")
				{
					createScene(geometry,_carMaterials[6], null, 0, 0, 0, 0);
				}
				
				//轮胎
				if(geometry.name == "luntai001"||geometry.name == "luntai002")
				{
				   createScene(geometry,new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,shininess: 1 ,metal:false,ambient:0xffffff,emissive:0x000000} ), lungu, null, 0, 0, 0, 0);
				}
				//轮毂盖高
				if(geometry.name == "lungu005")
				{
				   createScene(geometry,new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} ), luntai_1, null, 0, 0, 0, 0);
				}
				//轮毂盖低
				if(geometry.name == "dilungu"||geometry.name == "dilungu02")
				{
				  // createScene(geometry,new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} ), luntai_2, null, 0, 0, 0, 0);
				}
				
				//铝
				if(geometry.name == "wudengzhuangshi"||geometry.name == "jinqi001"||geometry.name == "jinqiL01")
				{
				   createScene(geometry,_carMaterials[17], null, null, 0, 0, 0, 0);
				}
				
				//前大灯贴图
				if(geometry.name == "dadenggao")
				{
				   createScene(geometry,_carMaterials[16], dadenggao, null, 0, 0, 0, 0);
				}
				
				//双面
				if(geometry.name == "dangyupan"||geometry.name == "waishenggou"||geometry.name == "paiqiguan01"||geometry.name == "dangniban")
				{
				   geometry.material.side = THREE.DoubleSide;
				}
				
				//初始隐藏物体
				if( geometry.name == "luntai001" || geometry.name == "lungu001"|| geometry.name == "lungu002"|| geometry.name == "lungu003"|| geometry.name == "lungu004")
				{
					geometry.visible = false;
				}
				
			}
			
			initLights();
				
			trunk = _trunk;
			scene.add( trunk );
			//初始颜色
			buttonClick(3);
			//初始轮毂
			//buttonClick2(wheel_id);
			carStartFunc();
			} );	
		}
		
		
		//根据加载完成的模型设置材质和贴图
		function createScene( geometry, material, map, x, y, z, b ) {
		
			var mesh = geometry;
			if(material)
			{
			   mesh.material = material;
			}
			if(map)
			{
				mesh.material.map = map;
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
				//new THREE.Vector3Node( -0.1, -0.2, - 0.99 ),
				new THREE.Vector3Node( 0, -0.4, - 1 ),
				THREE.Math2Node.DOT
			);

			var theta = new THREE.OperatorNode(
				viewZ,
				//new THREE.FloatNode( 1.0 ),
				new THREE.FloatNode( 1.1 ),
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

			mtl.color = new THREE.ColorNode( 0xffffff );
			mtl.environment = color;
			mtl.environmentAlpha = new THREE.Math1Node( fresnel, THREE.Math1Node.SAT );
			mtl.shininess = new THREE.FloatNode( 25 );
			mtl.shadow = new THREE.FloatNode( 3.9 );
			mtl.specular = new THREE.ColorNode( 0x000000 );
			mtl.build();  
         //各种部件材质
			_carMaterials = [
			            
						// 镀铬 0
						new THREE.MeshPhongMaterial( { color: 0x8a8a8b,	specular: 0xffffff,	shininess: 650,  metalness:1.1 ,roughtness:0.0,opacity:1.1,envMap: cubemap,emissive:0x6c6c6c} ),

						// 大灯玻璃 1
						new THREE.MeshBasicMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.4, transparent: true ,envMap: cubemap,emissive:0xffffff} ),

						// 大灯内部 2
						new THREE.MeshBasicMaterial( { color: 0xffffff,	specular: 0xffffff,	shininess: 500,envMap: cubemap} ),

						// 车窗玻璃 3
						new THREE.MeshPhongMaterial( { color: 0x1d1d1d,	specular: 0x000000,	opacity: 1, transparent: true ,envMap: cubemap,shininess:10,emissive:0x343c42} ),

						// 大灯内部框 4
						new THREE.MeshBasicMaterial( { color: 0x000000, specular: 0xffffff, shininess: 50,emissive:0x000000,shininess:10,envMap: cubemap} ),

						// 镀铬 5
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0x000000,	shininess: 0,  metalness:0.1 ,roughtness:0.0,opacity:10.1,envMap: cubemap,emissive:0x626262} ),

						// 尾灯罩 6
						new THREE.MeshLambertMaterial( { color: 0x320606,	specular: 0xffffff,	shininess: 500,opacity: 0.4, metalness:0.01,transparent: true,envMap: cubemap ,emissive:0x821919} ),

						// 尾灯 7
						new THREE.MeshLambertMaterial( { color: 0xffffff,emissive:0x000000,shininess: 500,specular: 0x00ffff } ),
						
						// 镀铬 8
						new THREE.MeshPhongMaterial( { color: 0x605f5f,	specular: 0xffffff,	shininess: 650,  metalness:1.1 ,roughtness:0.0,opacity:1.1,envMap: cubemap,emissive:0x6f6f6f} ),
						
						// 黑色塑料 9
						new THREE.MeshPhongMaterial( { color: 0x000000,	specular: 0x333333 } ),
						
						null,
						
						null,
						
						// 黑色亮反光塑料 12
						new THREE.MeshPhongMaterial( { color: 0x333333,	specular: 0xffffff,	shininess: 0.5,	envMap: cubemap	} ),
						
						// 稍微有些反光的黑色塑料 13
						new THREE.MeshPhongMaterial( { color: 0x212121,	specular: 0xd9effc,shininess: 10 ,metal:false,ambient:0xffffff,emissive:0x000000} ),
						
						// logo玻璃 14
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.24, transparent: true ,envMap: cubemap,shininess:100,emissive:0x343c42} ),
						
						// 大灯玻璃 15
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	opacity: 0.6, transparent: true ,envMap: cubemap} ),
						
						// 大灯贴图 16
						new THREE.MeshPhongMaterial( { color: 0xffffff,	specular: 0xffffff,	shininess: 1500,  metalness:1.1 ,roughtness:0.1,opacity:5.1,emissive:0x444545} ),
						
						// 铝 17
					//	new THREE.MeshLambertMaterial( { color: 0x696969,	specular: 0x000000,	shininess: 0.0,  metalness:0 ,emissive:0x444545,envMap: cubemap,ambient:0.5,refractionRatio:0.1,reflectivity:0.1,shading:THREE.SmoothShading} )
						new THREE.MeshLambertMaterial( { color: 0xbcbcbc,	specular: 0x000000,	shininess: 0.0,  metalness:0 ,emissive:0x444545,envMap: cubemap,ambient:0.5,refractionRatio:0.5,reflectivity:0.5,shading:THREE.SmoothShading} )
						
						
					];	
		}
		
		//初始化灯光
		function initLights() {
		
			 //黑色
			car_main_color = 0x000000;
			car_highlight_color = 0xffffff;
			
			hemiLight = new THREE.HemisphereLight(0xffffff,0x000000,2.00);
			hemiLight.position.set(0,5000,0);
			scene.add(hemiLight);
			
			light9 = addDirectionalLight(-200,200.75,300.5,0x727272,0.20,150,scene);
			
			light = addDirectionalLight(-0.65,0.5,0.85,0x1c1c1c,0.30,5,scene);
			directionalLight = addDirectionalLight(-0.65,0.5,-0.85,0x1c1c1c,0.30,5,scene);
			
			 reflectance.number = 0.60;
			 power.number = 1.1;
			 
             mtl.color.value.setHex( car_main_color);
			 mtl.specular = new THREE.ColorNode( car_highlight_color );
			 mtl.build();
			 
			 light1 = addDirectionalLight(350,550,200,0x3b3a3a,0.22,500,scene);
			 light2 = addDirectionalLight(350,550,-200,0x3b3a3a,0.22,500,scene);
			 		 
		}
		
		//在场景里面添加灯光
		function addPointLight( x, y, z, color, intensity, distance, root ) {

			var point = new THREE.PointLight( color, intensity, distance );
			point.shadowCameraVisible = true;
			point.position.set( x, y, z );
			root.add( point );	
			point.castShadow = true;
			return point;
		}
		function addDirectionalLight( x, y, z, color, intensity, distance, root ) {
			var directional = new THREE.DirectionalLight( color, intensity ,distance);
			directional.position.set( x, y, z );
			directional.castShadow = true;
			directional.shadowCameraVisible = true;
			directional.shadowDarkness = 10.5;
			root.add( directional );	
			return directional;
		}
		
		
		function onWindowResize() {
			var width =  $(".carsFlash").width(), height = $(".carsFlash").height();
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize( width, height );
		}
		
		//pc
		function onWindowResize2() {
			 controls.minDistance = 430;
			 controls.maxDistance = 890;
			 
			 controls.minPolarAngle = 1.1;
        	 controls.maxPolarAngle = 1.5;
			
			 camera.position.x = 337.7962825253696;
			 camera.position.z = 680.0008141362788;
			 camera.position.y = 48.844284498989914;
			 controls.update();
			 
			 var tween = new TWEEN.Tween(camera.position)
			 .to({ x: 657.948049325882,y: 48.844284498989836,z: 378.9614757494833 }, 1500)
			 .start();
			 
			 tween.onUpdate(function() {
			    controls.update();
			 })
		}
		
		
		function onWindowResize3()
		{
			 controls.minDistance = 500;
			 controls.maxDistance = 800;
			 
			 controls.minPolarAngle = 1.1;
        	 controls.maxPolarAngle = 1.5;
			 
			 camera.position.x = 920.6215775598179;
			 camera.position.z = 177.86117038114068;
			 camera.position.y = 81.49296956764073;
			 controls.update();

			  tween = new TWEEN.Tween(camera.position)
			 .to({ x: 649.21460,y: 67.85931,z: 796.3114466 }, 2000)
			 .start();
			 
			 tween.onUpdate(function() {
			    controls.update();
			 })
		}
			

		function animate() {
		
		    if(!renderBoo)
			{
			   return ;
			}
			//console.log( "车身开始渲染");
			requestAnimationFrame( animate );
			cameraCube.rotation.copy( camera.rotation );
			renderer.clear();
			//renderer.render( sceneCube, cameraCube );
			renderer.render( scene, camera );
			if(autorotation)
			{
			  controls.update();
			  if(camera.position.x > 53 && camera.position.x < 55)
			  {
				 tweenFn("down",0,0,70,returnTop);
			  }
			}
			Angle();
			TWEEN.update();
			controls.update();
			
		}
		
		function setRenderOpen(value)
		{
		   renderBoo = value;
		   if(value)
		   {
		     animate();
		   }
		}
		
		function returnTop()
		{
		  controls.autoRotate_up = false;
		  tweenFn("up",0,0,60,returnDown);
		}
		
		function returnDown()
		{
		  controls.autoRotate_down = false;
		}
		
		function tweenFn(obj,start,value,endT,endFn)
		{
			var tween = new TWEEN.Tween(currentPosition)
				.to({ x: 380.1151277834234,y: 284.9503803900076,z: -628.9207156246974 }, 1500)
				.start();
				
			tween.onUpdate(function() {
				camera.lookAt({
					x: 0,
					y: 0,
					z: 0
				});
				
				camera.position.x = this.x;
				camera.position.y = this.y;
				camera.position.z = this.z;
				camera.lookAt({
					x: 0,
					y: 0,
					z: 0
				});
				
			});	
				
		}
		
		function toTurnTo(value)
		{
		   switch(value)
		   {
		     case "qian":
			 
			 if(_deviceType == "Windows")
			 {
				tween = new TWEEN.Tween(camera.position)
				.to({ x: 711.742830086375,y: 54.383687081585244,z: 263.2534220412243 }, 1500)
				.start();
				
			 }else{
			    tween = new TWEEN.Tween(camera.position)
				.to({ x: 830.1418050285754,y: 64.2622097467097,z: 307.04583413468345 }, 1500)
				.start();
			 }
			 
			 break;
			 case "ce":
			 
			 if(_angle)
			 {
				if(_angle == "右")
				 {
					
					if(_deviceType == "Windows")
					{
						tween = new TWEEN.Tween(camera.position)
						.to({ x: 649.21460,y: 67.85931,z: 796.3114466 }, 1500)
						.start();
					}else{
						tween = new TWEEN.Tween(camera.position)
						.to({ x: 649.21460,y: 67.85931,z: 796.3114466 }, 1500)
						.start();
					}
				 
				 }else{
				 
					
					if(_deviceType == "Windows")
					{
						tween = new TWEEN.Tween(camera.position)
						.to({ x: 341.4738578624717,y: 48.84428449899045,z: -678.1615147665732 }, 1500)
						.start();
					}else{
						tween = new TWEEN.Tween(camera.position)
						.to({ x: 679.970929,y: 118.5799000,z: -763.719541 }, 1500)
						.start();
					}
				 }
			 }
			 break;
			 case "hou":
			 
			 break;
		   }
		   if(tween)
		   {
				tween.onUpdate(function() {
					controls.update();
				})
		   }
		   
		
		}
		
		function moveComplete()
		{
		}
		
		function getQueryString(name) {
		//    alert("(^|&)" + name + "=([^&]*)(&|$)");
			var reg = new RegExp("^" + name + "=(\\d+)", "i");
			var LocString = String(window.document.location.href);
			var t = LocString.split("&&");
			if(t&&t.length>1)
			{
				var r = t[1].match(reg);
				if (r != null) return unescape(r[1]); return null;
			}
			return null;
		}
		
		function onDocumentMouseMove(event)
		{
			if(tween)
			{
				tween.stop();
			}
		}
		
		//判断场景方向角度
		
		function Angle()
		{
			var vector = new THREE.Vector3(0,0,0);
			var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
			var param1 = ray.ray.direction;
			if(light9)
			{
				light9.position.set( -camera.position.x-700, camera.position.y+1500, camera.position.z );
				//light9.intensity = Math.abs(Math.abs(param1.x-0.2)-0.4);
				//console.log(param1.y)
			}
			
			if(!liangDian_boo)
			{
			  return ;
			}
		
			if(param1.x<-0.9)
			{
				_angle = "前";
			}
			if(param1.x>0.9)
			{
				_angle = "后";
			}
			
			if(param1.x>-0.5&&param1.x<0.5)
			{
				if(param1.z>0)
				{
					_angle = "左";
				}else{
					_angle = "右";
				}
			}
		}
		
		
		
		function meshVisible(name,boo)
		{
		
		}
		
		function buttonClick(value){
			
			//车身
			if(value == 100)
			{
			 controls.target = new THREE.Vector3( 0, -5, 0 );
			 var width = $(".carsFlash").width(), height = $(".carsFlash").height();
			 if(width>height)
			 {
				hsp = "h"; 
			 }else{
				hsp = "s";
			 }
			 
			 if(hsp == "h")
			 {
				onWindowResize3();
				return ;
                				
			 }
			 if(hsp == "s")
			 {
				onWindowResize3();
                return ;				
			 }
			 
			 controls.minDistance = 330;
			 controls.maxDistance = 790;
			 controls.minPolarAngle = 1.1;
        	 controls.maxPolarAngle = 1.5;
			
			 camera.position.x = 337.0007215888911;
			 camera.position.z = 290.80212643803344;
			 camera.position.y = 72.01692611163857;
			 controls.update();
			}
			
			//打印相机位置
			if(value == 33332)
			{
			
               console.log( "load time:PPPPPPPPPLKKKKK",controls);
               console.log( "load time:PPPPPPPPPLKKKKK",camera.position,controls.position0);
               controls.pppk();
			}
			
						
			//白色
			if(value == 0)
			{

				console.log( "load time:PPPPPPPPPLKKKKK",camera.position,controls.position0);
			  if(color_id == 0) 
			  {
			    return ;
			  }
			   color_id = value;

			    light9.visible = false;
				car_main_color = 0xffffff;
				car_highlight_color = 0xffffff;
				hemiLight.color = new THREE.ColorNode( 0xffffff );
				hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
				hemiLight.intensity = 1.0;

				light.color = new THREE.ColorNode( 0xbbbcbc );
				directionalLight.color = new THREE.ColorNode( 0xbbbcbc );
				light.intensity = 0.12;
				directionalLight.intensity = 0.12;
							   
				reflectance.number = 0.50;
				power.number = 1.6;

				mtl.color.value.setHex( car_main_color);
				mtl.specular = new THREE.ColorNode( car_highlight_color );
				
				
				mtl.shininess = new THREE.FloatNode( 30 );
				mtl.shadow = new THREE.FloatNode( 0.6 );
			    mtl.build();
			   
			}
			//红色
			if(value == 1)
			{
			
			  if(color_id == 1) 
			  {
			    return ;
			  }
			  color_id = value;
			  
			    light9.visible = true;
				light9.color = new THREE.ColorNode( 0x535454 );

				car_main_color = 0x860303;
				car_highlight_color = 0xffffff;
				hemiLight.color = new THREE.ColorNode( 0x4f4f4f );
				hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
				hemiLight.intensity = 3.50;

				//light.color = new THREE.ColorNode( 0xf45555 );
				light.color = new THREE.ColorNode( 0x802020 );
				directionalLight.color = new THREE.ColorNode( 0x802020 );
				light.intensity = 0.15;
				directionalLight.intensity = 0.15;
							   
				reflectance.number = 0.6;
				power.number = 1.1;

				mtl.color.value.setHex( car_main_color);
				mtl.specular = new THREE.ColorNode( car_highlight_color );
				mtl.shininess = new THREE.FloatNode( 25 );
				mtl.shadow = new THREE.FloatNode( 4.6 );
				light1.color = new THREE.ColorNode( 0x2c2b2b );
				light2.color = new THREE.ColorNode( 0x2c2b2b );
			
			   mtl.build();
			}
			//绿色
			if(value == 2)
			{
			
			   if(color_id == 2) 
			  {
			    return ;
			  }
			  color_id = value;
			
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x535454);
			car_main_color = 0x0c231b;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0x686868 );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 3.50;
			light.color = new THREE.ColorNode( 0x1e4a3b );
			directionalLight.color = new THREE.ColorNode( 0x1e4a3b );
			light.intensity = 0.20;
			directionalLight.intensity = 0.20;
			reflectance.number = 0.9;
			power.number = 1.1;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );
			mtl.shininess = new THREE.FloatNode( 25 );
			mtl.shadow = new THREE.FloatNode( 4.6 );
			
			light1.color = new THREE.ColorNode( 0x2c2b2b );
			light2.color = new THREE.ColorNode( 0x2c2b2b );
			 mtl.build();
			}
			//蓝色
			if(value == 3)
			{
			
			   if(color_id == 3) 
			  {
			    return ;
			  }
			  color_id = value;
			  
			    light9.visible = true;
				light9.color = new THREE.ColorNode( 0x363737 );

				car_main_color = 0x0a3174;
				car_highlight_color = 0xffffff;
				hemiLight.color = new THREE.ColorNode( 0x767677 );
				hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
				hemiLight.intensity = 3.50;

				light.color = new THREE.ColorNode( 0x393939 );
				directionalLight.color = new THREE.ColorNode( 0x393939 );
				light.intensity = 0.22;
				directionalLight.intensity = 0.22;
							   
				reflectance.number = 0.60;
				power.number = 1.1;

				mtl.color.value.setHex( car_main_color);
				mtl.specular = new THREE.ColorNode( car_highlight_color );
				mtl.shininess = new THREE.FloatNode( 25 );
				mtl.shadow = new THREE.FloatNode( 4.6 );
				
			    mtl.build();
				light1.color = new THREE.ColorNode( 0x2c2b2b );
				light2.color = new THREE.ColorNode( 0x2c2b2b );
				
			}
			//灰色
			if(value == 4)
			{
			
			   if(color_id == 4) 
			  {
			    return ;
			  }
			  color_id = value;
			
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x5e5e5e );

			car_main_color = 0x222222;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0x979797 );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 2.0;

			light.color = new THREE.ColorNode( 0x242424 );
			directionalLight.color = new THREE.ColorNode( 0x242424 );
			light.intensity = 0.20;
			directionalLight.intensity = 0.20;
						   
			reflectance.number = 0.60;
			power.number = 1.1;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );  
			mtl.shininess = new THREE.FloatNode( 25 );
			mtl.shadow = new THREE.FloatNode( 4.6 );
			  
			  
			mtl.build();
			light1.color = new THREE.ColorNode( 0x2c2b2b );
			light2.color = new THREE.ColorNode( 0x2c2b2b );
			   
			}
			//黑色
			if(value == 5)
			{
			
			   if(color_id == 5) 
			  {
			    return ;
			  }
			  color_id = value;
			  
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x727272 );

			car_main_color = 0x000000;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0xffffff );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 2.0;

			light.color = new THREE.ColorNode( 0x1c1c1c );
			directionalLight.color = new THREE.ColorNode( 0x1c1c1c );
			light.intensity = 0.20;
			directionalLight.intensity = 0.20;
						   
			reflectance.number = 0.60;
			power.number = 1.1;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );  
			mtl.shininess = new THREE.FloatNode( 25 );
			mtl.shadow = new THREE.FloatNode( 3.9 );
			  
			  
			mtl.build();
			light1.color = new THREE.ColorNode( 0x3b3a3a );
			light2.color = new THREE.ColorNode( 0x3b3a3a );
			   
			   
			}
			//银色
			if(value == 6)
			{
			
			
			   if(color_id == 6) 
			  {
			    return ;
			  }
			  color_id = value;
			
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x414141 );

			car_main_color = 0x393939;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0x979797 );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 3.00;

			light.color = new THREE.ColorNode( 0x4e4d4d );
			directionalLight.color = new THREE.ColorNode( 0x4e4d4d );
			light.intensity = 0.30;
			directionalLight.intensity = 0.30;
						   
			reflectance.number = 0.55;
			power.number = 1.3;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );
			mtl.shininess = new THREE.FloatNode( 20 );
			mtl.shadow = new THREE.FloatNode( 2.9 );
  
			mtl.build();
			light1.color = new THREE.ColorNode( 0x777676 );
			light2.color = new THREE.ColorNode( 0x777676 );
			   
			}
			
			//深金色
			if(value == 7)
			{
			
			
			   if(color_id == 7) 
			  {
			    return ;
			  }
			  color_id = value;
			
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x424141 );

			car_main_color = 0x44352b;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0x767677 );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 3.50;

			light.color = new THREE.ColorNode( 0x4e4d4d );
			directionalLight.color = new THREE.ColorNode( 0x4e4d4d );
			light.intensity = 0.30;
			directionalLight.intensity = 0.30;
						   
			reflectance.number = 0.55;
			power.number = 1.3;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );
			mtl.shininess = new THREE.FloatNode( 20 );
			mtl.shadow = new THREE.FloatNode( 2.9 );
  
			mtl.build();
			light1.color = new THREE.ColorNode( 0x878787 );
			light2.color = new THREE.ColorNode( 0x878787 );
			
			}
			
			//浅金色
			if(value == 8)
			{
			
			
			   if(color_id == 8) 
			  {
			    return ;
			  }
			  color_id = value;
			
			light9.visible = true;
			light9.color = new THREE.ColorNode( 0x424141 );

			car_main_color = 0x6b615a;
			car_highlight_color = 0xffffff;
			hemiLight.color = new THREE.ColorNode( 0x767677 );
			hemiLight.groundColor = new THREE.ColorNode( 0x000000 );
			hemiLight.intensity = 3.50;

			light.color = new THREE.ColorNode( 0x4e4d4d );
			directionalLight.color = new THREE.ColorNode( 0x4e4d4d );
			light.intensity = 0.20;
			directionalLight.intensity = 0.20;
						   
			reflectance.number = 0.55;
			power.number = 1.3;

			mtl.color.value.setHex( car_main_color);
			mtl.specular = new THREE.ColorNode( car_highlight_color );
			mtl.shininess = new THREE.FloatNode( 20 );
			mtl.shadow = new THREE.FloatNode( 2.9 );
  
			mtl.build();
			light1.color = new THREE.ColorNode( 0x878787 );
			light2.color = new THREE.ColorNode( 0x878787 );
			   
			}
			
			
		}
		
		function wheelClick(value)
		{
		    toTurnTo("ce");
			if(value == 0)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = true;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu001"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu001"].material.map = luntai_5;
				
			}
			if(value == 1)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = true;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu001"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu001"].material.map = luntai_6;
			}
			if(value == 2)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = true;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu002"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu002"].material.map = luntai_7;
			}
			if(value == 3)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = true;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu002"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu002"].material.map = luntai_8;
			}
			if(value == 4)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = true;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu003"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu003"].material.map = luntai_9;
			}
			if(value == 5)
			{
				trunk_objects["luntai001"].visible = true;
				trunk_objects["luntai002"].visible = false;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = true;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu003"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu003"].material.map = luntai_10;
			}
			if(value == 6)
			{
				trunk_objects["luntai001"].visible = false;
				trunk_objects["luntai002"].visible = true;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = true;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu004"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu004"].material.map = luntai_3;
			}
			if(value == 7)
			{
				trunk_objects["luntai001"].visible = false;
				trunk_objects["luntai002"].visible = true;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = true;
				trunk_objects["lungu005"].visible = false;
				
				trunk_objects["lungu004"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu004"].material.map = luntai_4;
			}
			if(value == 8)
			{
				trunk_objects["luntai001"].visible = false;
				trunk_objects["luntai002"].visible = true;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = true;
				
				trunk_objects["lungu005"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu005"].material.map = luntai_1;
			}
			if(value == 9)
			{
				trunk_objects["luntai001"].visible = false;
				trunk_objects["luntai002"].visible = true;
				
				trunk_objects["lungu001"].visible = false;
				trunk_objects["lungu002"].visible = false;
				trunk_objects["lungu003"].visible = false;
				trunk_objects["lungu004"].visible = false;
				trunk_objects["lungu005"].visible = true;
				
				trunk_objects["lungu005"].material = new THREE.MeshBasicMaterial( { color: 0xffffff,specular: 0xffffff,	shininess: 100,emissive:0x000000} );
				trunk_objects["lungu005"].material.map = luntai_2;
			}
		
		}
		
		
		
		