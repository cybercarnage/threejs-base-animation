class BaseAnimation {
	constructor(scene = null, camera = null, renderer = null) {
    // console.log('constructor init');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.tempData = {};
  }

  setup() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.tempData.cube = new THREE.Mesh(geometry, material); // cube
    // this.scene.add(this.tempData.cube);

    this.camera.position.z = 4;

    //Load the GLSL code from the HTML as a string
    let shaderCode = document.getElementById("fragShader").innerHTML;

    //Load an image
    THREE.ImageUtils.crossOrigin = ''; //Allows us to load an external image
    let texture = new THREE.TextureLoader().load('https://tutsplus.github.io/Beginners-Guide-to-Shaders/Part2/SIPI_Jelly_Beans.jpg');


    //Our data to be sent to the shader
    this.tempData.uniforms = {};
    this.tempData.uniforms.resolution = {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)};
    this.tempData.uniforms.texture = {
      type: 't',
      value: texture
    };

    //Create an object to apply the shaders to
    let materialSprite = new THREE.ShaderMaterial({
      uniforms: this.tempData.uniforms,
      fragmentShader: shaderCode
    });
    // let geometry = new THREE.BoxGeometry(1, 1, 1);
    this.tempData.sprite = new THREE.Mesh(geometry, materialSprite);
    this.scene.add(this.tempData.sprite);
    this.tempData.sprite.position.z = 2;//Move it back so we can see it
  }

	animate() {
    const self = this;
    // console.log('animate init');

    requestAnimationFrame(() => {
    	self.animate();
    });

    this.tempData.sprite.rotation.x += 0.03;
    this.tempData.sprite.rotation.y += 0.02;
    this.tempData.uniforms.resolution.value.x = window.innerWidth;
    this.tempData.uniforms.resolution.value.y = window.innerHeight;
    // this.tempData.cube.rotation.x += 0.03;
    // this.tempData.cube.rotation.y += 0.05;

    self.renderer.render(self.scene, self.camera);
	}
}

const newAnimation = new BaseAnimation();
newAnimation.setup();
newAnimation.animate();