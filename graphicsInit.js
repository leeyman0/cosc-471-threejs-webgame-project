
console.log("Setting up the graphics");
// Setting up the graphics
const canvas = document.getElementById(CANVAS_ID);
const textCanvas = document.getElementById(TEXT_OVERLAY_ID);
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
textCanvas.width = SCREEN_WIDTH;
textCanvas.height = SCREEN_HEIGHT;
let tapestry = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera(75,
					 window.innerWidth
					 / window.innerHeight,
					 0.1,
					 1000),
    renderer : new THREE.WebGLRenderer({canvas}),
    textContext : textCanvas.getContext('2d'),
    light : new THREE.DirectionalLight(0xFFFFFF, 1),
}

tapestry.renderer.setClearColor( 0xAAAACC, 1);

let healthGradient
    = tapestry.textContext.createLinearGradient(10, 10,
						FULL_HEALTH_BAR_WIDTH,
						100);
healthGradient.addColorStop(0.0, "red");
healthGradient.addColorStop(1.0, "green");

// 3D Graphics
// The map will look like a white plane, like a skiing game should look
const mapGeometry = new THREE.PlaneGeometry(MAP_SIZE, MAP_SIZE);
const mapMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
});
const map = new THREE.Mesh(mapGeometry, mapMaterial);

// There shall be some ambient
// light, to emulate the snow light reflecting off of snow
const ambience = new THREE.AmbientLight( 0x404040 );

// There shall be light
const directional = new THREE.DirectionalLight( 0xFFFFFF, 0.6 );
directional.position.set(100, -300, 400);
// Adding all of the things
tapestry.scene.add(map);
tapestry.scene.add(ambience);
tapestry.scene.add(tapestry.camera);
