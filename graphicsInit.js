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
};

tapestry.renderer.setClearColor( 0xAAAAEE, 1);
// 
let healthGradient
    = tapestry.textContext.createLinearGradient(10, 10,
						FULL_HEALTH_BAR_WIDTH,
						100);
healthGradient.addColorStop(0.0, "red");
healthGradient.addColorStop(1.0, "green");

// 3D Graphics
// The map will look like a white plane, like a skiing game should look
const mapGeometry = new THREE.PlaneGeometry(MAP_SIZE, MAP_SIZE);
const mapMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
});
const map = new THREE.Mesh(mapGeometry, mapMaterial);
map.rotateX(Math.PI * 0.5);
map.position.set(MAP_SIZE / 2, 0, MAP_SIZE / 2);
// There shall be some ambient
// light, to emulate the snow light reflecting off of snow
const ambience = new THREE.AmbientLight( 0x404040 );

// There shall be light
const directional = new THREE.DirectionalLight( 0xFFFFFF, 1 );
directional.position.set(MAP_SIZE, MAP_SIZE, MAP_SIZE);
directional.lookAt(map.position);

// Helps to visualize the direction of the directional light
// const directionalHelper = new THREE.DirectionalLightHelper(directional);
// tapestry.scene.add(directionalHelper);
// Adding all of the things
tapestry.camera.position.set(MAP_SIZE / 2, MAP_SIZE * 0.6, 0);
tapestry.camera.rotateX(-1.5707963267948961);
tapestry.camera.rotateZ(Math.PI * 1);
tapestry.camera.rotateX(Math.PI * 0.2);
// map.lookAt(tapestry.camera.position);
// tapestry.camera.pointAt(0, 0, 0); doesnt work
tapestry.scene.add(map);
tapestry.scene.add(ambience);
tapestry.scene.add(tapestry.camera);

// We are going to compose our assets using additive synthesis (i.e. sticking
// primitives together until we get the shapes that we want) because screw CORS.
// I'm tired of dealing with it.

// Fun fact: our skiier is actually snowboarding,
// Doesn't mean that he doesn't ski in his off hours though
function Skiier() {
    let skiier = new THREE.Group();
    // The head shall be a sphere
    const headGeometry = new THREE.SphereGeometry(0.75);
    const headMaterial = new THREE.MeshPhongMaterial({
	color : 0xAAAAFF,
	
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1;

    skiier.add(head);
    
    // The body shall be a cylinder
    const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
	color : 0x3333AA,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    skiier.add(body);
    
    // The board will be a box
    const boardGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const boardMaterial = new THREE.MeshLambertMaterial({
	color : 0x111111,
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.rotateX(Math.PI * 0.5);
    board.position.y = -0.5;
    
    skiier.add(board);
    // Return the skiier
    return skiier;
}
// // Testing the skiier
// let the_guy = Skiier();
// the_guy.position.set(0, 0, 0);
// the_guy.rotateY(Math.PI * 0.5);
// tapestry.scene.add(the_guy);

function Tree() {
    let tree = new THREE.Group();

    const tree_color = 0x669900; 

    const tree_material = new THREE.MeshPhongMaterial({
	color: tree_color
    });
    
    const tree_geom_part_1 = new THREE.BoxGeometry(TREE_RADIUS * 2,
						   1,
						   TREE_RADIUS * 2);

    const tree_geom_part_2 = new THREE.BoxGeometry(TREE_RADIUS * 1.8,
						   1.2,
						   TREE_RADIUS * 1.8);

    const tree1 = new THREE.Mesh(tree_geom_part_1, tree_material);
    tree1.position.y -= 0.1;
    
    const tree2 = new THREE.Mesh(tree_geom_part_2, tree_material);
    // tree2.position.x += TREE_RADIUS * 0.1;
    // tree2.position.z += TREE_RADIUS * 0.1;

    tree.add(tree1);
    tree.add(tree2);

    return tree;
}
// // Testing the tree
// let the_guy = Tree();
// the_guy.position.set(0, 0, 0);
// the_guy.rotateY(Math.PI * 0.25);
// tapestry.scene.add(the_guy);

// Our monster is vegetarian, he just chases the guy because he smells cheese
// puffs.
function Monster() {
    let monster = new THREE.Group();

    const monstermaterial = new THREE.MeshPhongMaterial({
	color : 0x990099,
    });
    
    const monsterbodygeometry = new THREE.SphereGeometry(1);

    const monsterlimbgeometry = new THREE.SphereGeometry(0.25);

    const monsterheadgeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    const monster_body = new THREE.Mesh(monsterbodygeometry, monstermaterial);
    
    const monster_right_arm = new THREE.Mesh(monsterlimbgeometry,
					     monstermaterial);
    const monster_left_arm = new THREE.Mesh(monsterlimbgeometry,
					    monstermaterial);
    const monster_right_leg = new THREE.Mesh(monsterlimbgeometry,
					     monstermaterial);
    const monster_left_leg = new THREE.Mesh(monsterlimbgeometry,
					    monstermaterial);

    const monster_head = new THREE.Mesh(monsterheadgeometry,
					monstermaterial);

    // Adjusting the positions of each part of the monster. until we get
    // the shapes that we want
    monster_head.position.y += MONSTER_RADIUS;

    monster_left_arm.position.x -= MONSTER_RADIUS;
    monster_left_arm.position.y += MONSTER_RADIUS;
    monster_left_leg.position.x -= MONSTER_RADIUS;
    monster_left_leg.position.y -= MONSTER_RADIUS;
    monster_right_arm.position.x += MONSTER_RADIUS;
    monster_right_arm.position.y += MONSTER_RADIUS;
    monster_right_leg.position.x += MONSTER_RADIUS;
    monster_right_leg.position.y -= MONSTER_RADIUS;
    
    monster.add(monster_body);
    monster.add(monster_left_arm);
    monster.add(monster_right_arm);
    monster.add(monster_left_leg);
    monster.add(monster_right_leg);
    monster.add(monster_head);

    return monster;
}

// // Testing the monster
// let the_guy = Monster();
// the_guy.position.set(0, 0, 0);
// the_guy.rotateY();
// tapestry.scene.add(the_guy);
