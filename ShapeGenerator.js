// Thought I would need this more often but I don't
const circle_radians = 2 * Math.PI;

function random_3D_rotation() {
    return {
	theta : Math.random() * Math.PI,
	phi : Math.random() * circle_radians,
    };
}

// Some constants to set up the camera
const ortho_camera_size = 4; // This matters because we cannot model shapes bigger
// than this
const ortho_camera_far_distance = 100;
const ortho_camera_near_distance = 1;
const ortho_camera_origin_distance = 10;

// A simple algorithm that returns a 2D shape of a random orientation of an object
function object_flatten(shape) { 
    let flatten_scene = new THREE.Scene();
    // Setting up the orthographic projection camera
    let camera = THREE.OrthographicCamera(ortho_camera_size / 2,
					  ortho_camera_size / -2,
					  ortho_camera_size / 2,
					  ortho_camera_size / -2,
					  ortho_camera_near_distance,
					  ortho_camera_far_distance);
    // Setting the position of the camera
    {
	let rotation = random_3D_rotation();
	// It doesn't really matter the order of the coordinates as we are doing
	// a random position.
	camera.position = new THREE.Vector3(ortho_camera_origin_distance *
					    Math.cos(rotation.phi) *
					    Math.sin(rotation.theta),
					    ortho_camera_origin_distance *
					    Math.sin(rotation.phi) *
					    Math.sin(rotation.theta),
					    ortho_camera_origin_distance *
					    Math.cos(rotation.theta));
    }
    // Looking at the origin in order to observe the object
    camera.lookAt(0, 0, 0);

    // Adding the shape to the scene
    flatten_scene.add(shape);

    // Actually getting the image
    let renderer = new THREE.WebGlRenderer();
    let target = new THREE.WebGlRenderTarget(ortho_camera_size, ortho_camera_size);

    // I am not sure if this is necessary, but I am doing it anyways
    renderer.setClearAlpha(0);
    // Aiming the renderer at the target
    renderer.setRenderTarget(target);
    renderer.render(camera, flatten_scene);
    
    return target.texture;
}

function make_hole(shape) {
    // First, iron out the shape in a random position.
    let flat_shape = object_flatten(shape);
    // Process the image
    // How can I incorporate WebGL into this :thinking:
    // More like, How can I incorporate Discord emoji shorthand into this
}
