
import * as THREE from 'three';
//导入环境贴图解析器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//导入控制器,轨道控制器,也可以是别的控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls"
//导入模型解析器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Group } from 'three'




class Base3d {
    constructor(selector, finishLoading) {
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.renderer;
        this.model;
        this.finishLoading = finishLoading;
        // this.changeTexture = this.changeTexture.bind(this);
        this.init();
        this.animate();
    }

    init() {
        //初始化场景
        this.createScene();

        //初始化相机
        this.createCamera();

        //初始化渲染器
        this.createRenderer();

        //初始化控制器
        this.initControls();

        //添加物体
        this.addMesh();


        //监听场景大小变化,调整渲染尺寸
        window.addEventListener('resize', this.onWindowResize.bind(this));


    }

    createScene() {
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x333);
        // this.scene.background = new THREE.Color(0xDCE2F1);

        // 自然光
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        // 平行光
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(80, 100, 50);
        this.scene.add(directionalLight);

        // 添加聚光灯
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(1, 1, 1);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

    }

    createCamera() {
        /*45度视角
        * 宽高比
        * 近裁剪面(最近能看到多少)
        * 远裁剪面(最远能看到多少)
        */
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1, 1000);

        //设置相机位置
        this.camera.position.set(150, 100, -20);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            //设置抗锯齿打开
            antialias: true,
            //设置透明度,更改为ture之后不会盖住背景
            alpha: true
        });
        //设置屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //设置渲染器尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight - 60);
        //色调设置,官网有枚举值,这里是电影级别的色调
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        //曝光程度,数字越大,图片越亮
        this.renderer.toneMappingExposure = 2;
        //添加到页面
        this.container.appendChild(this.renderer.domElement);
    }

    // 设置环境贴图,天空盒,这里暂时用不到
    setEnviromentMap(hdr) {
        new RGBELoader().setPath("./hdr/").load(hdr + '.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;

        });
    }

    //渲染
    render() {
        this.renderer.render(this.scene, this.camera);
        this.renderer.setClearAlpha(0);
    }


    //不断渲染(一般稳定在60帧左右)
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    //控制器
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // 禁用水平平移


        // 禁止垂直旋转
        this.controls.minPolarAngle = Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2;

        // 设置缩放限制
        this.controls.minDistance = this.size / 2;
        this.controls.maxDistance = this.size * 2;
    }

    //加载模型
    setModel(modelName) {
        const loader = new GLTFLoader().setPath('./gltf/');
        loader.load(modelName + '.gltf', (gltf) => {

            // 判断当前场景是否有模型,不要重复添加
            this.model && this.model.removeFromParent();
            this.model = gltf.scene;
            console.log(gltf);
            this.scene.add(this.model);

            //模型居中
            this.setModelPosition(gltf);

            this.finishLoading(); //加载完成才显示模型,加载完成之前显示过渡动画



        }, (e) => {
            console.log(e);
        });
    }

    //添加物体
    async addMesh(modelName) {
        let result = await this.setModel('suit000');
        // this.finishLoading();
    }

    //监听窗口变化,根据窗口变化自动渲染
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight - 60);

    }

    //加载模型自动居中
    setModelPosition(object) {
        // 将模型的中心点设置到canvas坐标系的中心点，保证模型显示是居中的
        let box = new THREE.Box3().setFromObject(object.scene); // 获取模型的包围盒
        let mdlen = box.max.x - box.min.x; // 模型长度
        let mdwid = box.max.z - box.min.z; // 模型宽度
        let mdhei = box.max.y - box.min.y; // 模型高度
        let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
        let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
        let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z

        // 获取模型整体对角线长度,这里获取模型模型对角线的目的是为了保证模型可以完全的展示在视线范围内
        let diagonal = Math.sqrt(Math.pow(mdlen, 2) + Math.pow(mdwid, 2) + Math.pow(mdhei, 2));
        this.setControls(diagonal);

        // 保证模型的正面面向用户
        object.scene.rotateY(Math.PI / 2);

        // 设置相机位置
        this.controls.object.position.set(x1 + diagonal * 1.3, y1, z1)
        this.controls.target.set(x1, y1, z1); // 设置控制器的视角方向，面向模型的中心点
        this.controls.update(); // 更新控制器
    }

    // 调整支持的缩放大小
    setControls(diagonal) {
        this.controls.minDistance = diagonal / 1.7;
        this.controls.maxDistance = diagonal * 2;
    }

    // 更改模型贴图,在加载之前读取本地json文件,更改后重新渲染模型
    changeTexture(textureName) {
        this.setModel(textureName);
    }

}



export default Base3d;