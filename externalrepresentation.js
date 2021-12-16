// Put the code that generates graphics here
function updateScene(state, tapestry) {
    let current_scene = tapestry.scene.clone();
    // Putting the trees on the scene
    state.treePositions.forEach(function ({x, z}) {
	let tree = Tree();
	tree.position.set(x, 0.5, z);
	current_scene.add(tree);
    });

    /* adding the skiier */ {
	let {x, z} = state.player.position;
	let skiier = Skiier();
	skiier.position.set(x, 0.5, z);
	current_scene.add(skiier);
	// console.log(skiier.position);
    }
    /* adding the monster */ {
	let {x, z} = state.monster.position;
	let monster = Monster();
	monster.position.set(x, 0.5, z);
	current_scene.add(monster);
    }
    
    current_scene.add(tapestry.camera);

    // const axes_helper = new THREE.AxesHelper();
    // current_scene.add(axes_helper);
    
    // Draw the game
    tapestry.renderer.render(current_scene, tapestry.camera);

    // Clear the UI
    tapestry.textContext.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    tapestry.textContext.font = UI_FONT;
    if (state.gameStarted) {
	// Draw a health bar
	tapestry.textContext.fillStyle = healthGradient;
	tapestry.textContext.fillText("Health", 20, 20);
	tapestry.textContext.fillRect(20, 40,
				      state.player.health
				      / PLAYER_BASE_HEALTH
				      * FULL_HEALTH_BAR_WIDTH, 10);
	tapestry.textContext.fillStyle = "white";
	tapestry.textContext.fillText(`Score: ${state.score}`,
				      Math.round(SCREEN_WIDTH / 2),
				      20);
	{
	    let {x, z} = state.player.position;
	    tapestry.textContext.fillText(`Player Coordinates: x=${x}, z=${z}`,
					  20,
					  Math.round(SCREEN_HEIGHT - 50));
	}				      
    } else {
	// Draw title screen
	drawTitleScreen(state, tapestry);

    }
    return;
}
function drawTitleScreen(state, tapestry) {
    tapestry.textContext.save();
    // Centering the text so that it looks readable
    tapestry.textContext.fillStyle = 'white';
    tapestry.textContext.textAlign = 'center';
    tapestry.textContext.font = '40px sans-serif';
    tapestry.textContext.fillText("Untitled Skiing Game",
				  Math.round(SCREEN_WIDTH / 2),
				  Math.round(SCREEN_HEIGHT / 2));

    tapestry.textContext.font= '20px sans-serif';
    tapestry.textContext.fillText("Press a key to continue",
				  Math.round(SCREEN_WIDTH / 2),
				  Math.round(SCREEN_HEIGHT / 2) + 50);

    // Returning the context to its original state
    tapestry.textContext.restore();
}

/* this customizes the behavior of the title screen */
function titleScreen(state, tapestry) {
    if (state.keyPressed)
	state.gameStarted = true;
    return;
}
