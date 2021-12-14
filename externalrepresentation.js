// Put the code that generates graphics here
function updateScene(state, tapestry) {

    // Draw the game
    tapestry.renderer.render(tapestry.scene, tapestry.camera);

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
