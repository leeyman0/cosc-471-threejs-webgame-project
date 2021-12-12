// Put the code that generates graphics here
function updateScene(state, tapestry) {
    tapestry.renderer.render(tapestry.scene, tapestry.camera);

    tapestry.textContext.font = "15pt Helvetica";
    tapestry.textContext.fillStyle = healthGradient;
    tapestry.textContext.fillText("Health", 20, 20);
    tapestry.textContext.fillRect(20, 40,
				  state.player.health
				  / PLAYER_BASE_HEALTH
				  * FULL_HEALTH_BAR_WIDTH, 10);
    return;
}

function titleScreen(state) {
    return;
}
