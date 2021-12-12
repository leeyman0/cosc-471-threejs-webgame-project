// The suffering is the point, says JS
let ticks = 0;

// global state
let state = {
    // Input state
    ticks,
    ticksBeforeCooldown : ticks,

    leftPressed : false,
    rightPressed : false,
    forwardPressed : false,
    backPressed : false,
    keyPressed : false,
    spacePressed: false,

    gameStarted : false, // This is what tells the game to advance the state
    newGame : false, // This is the kill switch for the current state that
    gameOver : false, // says to move to the next state

    // These handle the initialization of each thing
    titleGenerated : false,
    gameOverGenerated : false,

    /* GAMETIME VARIABLES */
    score: 0,

    player : {
	position : {
	    x : 50,
	    z : 10,
	},
	health : PLAYER_BASE_HEALTH,
	stunLocked : false, // This handles 
    },

    // The state of the projectiles fired by the player
    projectileTrigger : false,
    projectilePositions : [],
    projectileCooldownState : -1,
    
    // The state of the trees in the area
    treePositions : [],

    // The state of the monster
    monsterIn: false,
    monster: {
	position: { // The monster always spawns at the edge of the scene
	    x : MAP_SIZE,
	    z : MAP_SIZE,
	},
	health: MONSTER_BASE_HEALTH,
    },
};

// Saving initial state to a variable so that the player can play the game over
// and over again.
let initial_state = {...state};
