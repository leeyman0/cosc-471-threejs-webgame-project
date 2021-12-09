function handleinput(state) {
    if (state.gameStarted) {
	if (state.leftPressed) {
	    if (state.player.position.x > 0)
		state.player.position.x -= PLAYER_SPEED;
	}
	if (state.rightPressed) {
	    if (state.player.position.x < MAP_SIZE)
		state.player.position.x += PLAYER_SPEED;
	}
	if (state.forwardPressed) {
	    if (state.player.position.y < MAP_SIZE)
		state.player.position.y += PLAYER_SPEED;
	}
	if (state.backPressed) {
	    if (state.player.position.y > 0)
		state.player.position.y -= PLAYER_SPEED;
	}
	if (state.spacePressed) {
	    state.projectileTrigger = true;
	} else {
	    state.projectileTrigger = false;
	}
    } else {
	if (state.keyPressed) {
	    state.gameStarted = true;
	}
    }
}

function advance(state) {
    projectiles(state); // Moving projectiles forward
    hitdetection(state); // checking if any of the projectiles hit the trees or
    // the monster
}

/* heuristic: projectiles only go forward */
function projectiles(state) {
    // The good ole dummy loop
    for (let index = 0; index < state.projectilePositions.length; index++) {
	state.projectilePositions[index].z += PROJECTILE_SPEED;
	if (state.projectilePositions[index].z > MAP_SIZE)
	    // Despawn projectile
	    state.projectilePositions.splice(index, 1);
    }
    if (state.projectileTrigger &&
	state.projectileCooldownState <= 0) {
	state.projectilePositions.push({
	    z : state.player.position.z + 1,
	    x : state.player.position.x,
	});
    }
}
/* heuristic: trees are square */
function hitdetection(state) {
    state.projectilePositions.forEach(function (position, index, reference) {
	state.treePositions.forEach(function (treepos, treeind, treeref) {
	    if (treepos.z - TREE_RADIUS < position.z &&
		treepos.z + TREE_RADIUS > position.z &&
		treepos.x - TREE_RADIUS < position.x &&
		treepos.x + TREE_RADIUS > position.x)
		treeref.splice(treeind, 1);
	});	    
    });
}

function startMonster(state) {
    state.monsterIn = true;
    // The monster moves diagonally towards the player
    
}

function gameOver(state) {
    
}
