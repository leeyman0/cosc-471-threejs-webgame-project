function handleinput(state) {
    if (state.gameStarted) {
	if (state.leftPressed) {
	    if (state.player.position.x < MAP_SIZE)
		state.player.position.x += PLAYER_SPEED;
	}
	if (state.rightPressed) {
	    if (state.player.position.x > 0)
		state.player.position.x -= PLAYER_SPEED;
	}
	if (state.forwardPressed) {
	    if (state.player.position.z < MAP_SIZE)
		state.player.position.z += PLAYER_SPEED;
	}
	if (state.backPressed) {
	    if (state.player.position.z > 0)
		state.player.position.z -= PLAYER_SPEED;
	}
	if (state.spacePressed) {
	    state.projectileTrigger = true;
	} else {
	    state.projectileTrigger = false;
	}
    } else if (state.gameOver) {
	if (state.keyPressed && // 
	    state.ticksBeforeCooldown - COOLDOWN >= state.ticks) {
	    state.gameStarted = true;
	    state.newGame = true; // Tells the external loop to replace
	    // the old game with new game.
	}
    }
}

function advance(state) {
    if (state.gameStarted) { // If we are in game
	projectiles(state); // Moving projectiles forward
	hitdetection(state); // checking if any of the projectiles hit the trees or
	// the monster
	if (state.player.health <= 0) // When the player runs out of health, they
	    state.gameOver = true; // get a game over.
	if (state.monsterIn)
	    moveMonster(state);
	generateTrees(state);
    } else if (state.gameOver) {
	// The jig is up, people
	
    } else {
    }
}
function generateTrees(state) {
    
}

/* heuristic: projectiles only go forward 
   this heuristic is subject to change
 */
function projectiles(state) {
    // The good ole dummy loop
    for (let index = 0; index < state.projectilePositions.length; index++) {
	state.projectilePositions[index].z += PROJECTILE_SPEED;
	if (state.projectilePositions[index].z > MAP_SIZE)
	    // Despawn projectile
	    state.projectilePositions.splice(index, 1);
    }
    --state.projectileCooldownState;
    // Checking to see if a projectile has been fired
    if (state.projectileTrigger &&
	state.projectileCooldownState <= 0) {
	state.projectilePositions.push({
	    z : state.player.position.z + 1,
	    x : state.player.position.x,
	});
	state.projectileCooldownState = PROJECTILE_COOLDOWN;
    }
}
/* heuristic: trees are square */
function hitdetection(state) {
    // Checking to see if trees are damaged
    state.projectilePositions.forEach(function (position, index, reference) {
	state.treePositions.forEach(function (treepos, treeind, treeref) {
	    if (treepos.z - TREE_RADIUS < position.z &&
		treepos.z + TREE_RADIUS > position.z &&
		treepos.x - TREE_RADIUS < position.x &&
		treepos.x + TREE_RADIUS > position.x)
		// Bullets destroy trees
		treeref.splice(treeind, 1);
	});	    
    });
    
    // Checking to see if monster is damaged
    if (state.monsterIn)
	if (state.projectilePositions.some(function (position, index, reference) {
	    if (state.monster.position.x - MONSTER_RADIUS < position.x &&
		state.monster.position.x + MONSTER_RADIUS > position.x &&
		state.monster.position.z - MONSTER_RADIUS < position.z &&
		state.monster.position.z + MONSTER_RADIUS > position.z)
	    {
		// Monsters destroy bullets, but at the cost of PROJECTILE_DAMAGE
		reference.splice(index, 1);
		return true;
	    } else {
		return false;
	    }
	}))
	    state.monster.health -= PROJECTILE_DAMAGE;

    // Checking to see if human is damaged
    let damagedAlready = false;
    state.treePositions.forEach(function (position, index, reference) {
	if (!damagedAlready && !state.player.stunLocked)
	{
	    // Check for damage
	    if (position.z - TREE_RADIUS < state.player.position.z &&
		position.z + TREE_RADIUS > state.player.position.z &&
		position.x - TREE_RADIUS < state.player.position.x &&
		position.x + TREE_RADIUS > state.player.position.x)
	    {
		damagedAlready = true;
		state.player.health -= TREE_DAMAGE;
	    }
	}
    });
    if (!damagedAlready)
	state.player.stunLocked = false;

    // Check to see if the monster hits the person 
    if (!damagedAlready && state.monsterIn)
    {
	if (state.monster.position.z - MONSTER_RADIUS < state.player.position.z &&
	    state.monster.position.z + MONSTER_RADIUS > state.player.position.z &&
	    state.monster.position.x - MONSTER_RADIUS < state.player.position.x &&
	    state.monster.position.x + MONSTER_RADIUS > state.player.position.x)
	    state.player.health -= MONSTER_DAMAGE;
    }
}

function startMonster(state) {
    state.monsterIn = true;
    // The monster moves diagonally towards the player
    
}

function moveMonster(state) {
    let vector = { // This is the general direction that the monster needs to go
	x : state.player.position.x - state.monster.position.x,
	z : state.player.position.z - state.monster.position.z,
    };

    // The monster moves in a diagonal direction towards the player
    state.monster.position.x += (vector.x > 0)? MONSTER_SPEED : - MONSTER_SPEED;
    state.monster.position.z += (vector.z > 0)? MONSTER_SPEED : - MONSTER_SPEED;
}

function gameOver(state) {
    state.gameOver = true;
    state.gameStarted = false;
    // Start the cooldown counter
    state.ticksBeforeCooldown = state.ticks;
}






