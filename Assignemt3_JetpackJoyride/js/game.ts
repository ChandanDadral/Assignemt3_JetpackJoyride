/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="constants.ts" />
/// <reference path="states/mainmenuscreen.ts" />
/// <reference path="states/gamePlay.ts" />
/// <reference path="states/gameoverscreen.ts" />
/// <reference path="states/winscreen.ts" />

/// <reference path="objects/barry.ts" />
/// <reference path="objects/missles.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/coins.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/bullet.ts" />



/**
File Name: game.ts
Author: Chandan Dadral
Purpose: This file contains initialization, preload, and state machine for the
arcade game
Last Modified : March 19, 2015
Version History:
VERSION #1.0 – MARCH 19, 2015
	 Selected the Assets for the game and the process has been initiated. 
VERSION #1.1 - MARCH 19, 2015
	Added all the Objects to the Console with the accurate position.
	Even the Background of factory is scrolling the side direction continuously.							        
VERSION #1.2 – MARCH 19, 2015
	Made collisions for the object by the distance between center points of the images.
	 Added some sound effects on the object collisions.
	Bug fixed: Background was not scrolling in the proper way changed the axis for resetting it.
VERSION #1.3 - MARCH 19, 2015
	Made Score board displayed on the Top of the game. 
	Scores are updating with the proper manner. 
	Added Labels for the game.
	Bug fixed: Player was only moved in one direction only, now player is changing position throughout the screen.   
VERSION #1.4 - MARCH 19, 2015
	Created a States for the game and added Gameplay state to the game.
VERSION #1.5 - MARCH 19, 2015
	Added Game Over Screen to the game.
	Game over Screen shows the Player Scores and it has the Play again button which resets the game.
VERSION #1.6 – MARCH 19, 2015
	     Now in this version a Main Menu Screen is added to the game. 
	 	In this Main menu Screen the play button is displayed and the Instruction button.
	Now user can navigate throughout the game.                                           
VERSION #1.7 – MARCH 19, 2015
	     Now, created a winning stage as well which shows the winning message to the User. 
	     Sets the end point to the game, which is player has to get 7000 scores. 
	     Bug fixed: Background was not updating in the game over screen.
VERSION #1.8 – MARCH 19, 2015
	     Added the Bullets object to the game. 
	 	Now Barry can fire the bullets to game to kill the missiles.
VERSION #1.9 – MARCH 19, 2015
	     Made the Collisions for the Bullet Objects and Missiles. 
	Added the Sound for the Collision of the 
	 	Bug fixed: Fixed the Bugs for the firing the Bullets.
VERSION #1.10 – MARCH 20, 2015
	     Proper commenting on the code was done and defined the functionality of the each function. 
	 	Bug fixed: No sound was played on the game over screen fixed that.
VERSION #1.11 – MARCH 20, 2015
	     Did some css alignment for the gameplay and added a background image
	     Bug fixed: made the coins to comes frequent on the screen after proper interval. 
*/

var stage: createjs.Stage;
var game: createjs.Container;
var queue;



// Game Objects
var barry: objects.Barry;
var coins: objects.Coins;
var background: objects.Background;
var scoreboard: objects.scoreBoard;
var bullet: objects.Bullet;

// Missles Array
var missles = [];
//Bullets Array
var bullets = [];


// State variables
var currentState: number;
var currentStateFunction;

// Pre-load function - this loads all of the assets ahead of time
function preload(): void {
    queue = new createjs.LoadQueue();
    // Load the sound plugin
    queue.installPlugin(createjs.Sound);
   

    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "backAudio", src: "assets/audio/backsound.mp3" },
        { id: "coinCollect", src: "assets/audio/coin_collect.mp3" },
        { id: "lifeUpAudio", src: "assets/audio/lifeUp.mp3" },
        { id: "explosionAudio", src: "assets/audio/Explosion.mp3" },
        { id: "mainMenu", src: "assets/audio/back.mp3" },
        { id: "hover", src: "assets/audio/hover.mp3" },
        { id: "shoot", src: "assets/audio/Laser_Shoot.wav" },
        { id: "barry", src: "assets/img/game_char.png" },
        { id: "background", src: "assets/img/background.png" },
        { id: "missles", src: "assets/img/missles.png" },
        { id: "coins", src: "assets/img/StarCoin.png" },
        { id: "gameLogo", src: "assets/img/Logo.png" },
        { id: "playButton", src: "assets/img/playButton.png" },
        { id: "instructionsButton", src: "assets/img/instructionsButton.png" },
        { id: "okButton", src: "assets/img/okButton.png" },
        { id: "gameOver", src: "assets/img/gameOver.png" },
        { id: "playAgainButton", src: "assets/img/playAgainButton.png" },
        { id: "bullet", src: "assets/img/bull.png" }
    ]);
}

// Initialization function - This is where the stage gets created, everything gets set up
function init(): void {
    stage = new createjs.Stage(document.getElementById("gameCanvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    // When game begins, current state will be opening menu (MENU_STATE)
    currentState = constants.MENU_STATE;
    changeState(currentState);
}



// Game Loop
function gameLoop(event): void {
    // Check current state, then update stage
    currentStateFunction();
    stage.update();
}

// This is the state machine function, that allows the game to switch to different 
// screens, or states, depending on where the player is in the game
function changeState(state: number): void {
    // Launch Various "screens"

    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;
        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;
        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            // instantiate game over screen
            states.gameOver();
            break;
        case constants.WIN_STATE:
            // instantiate win screen
            currentStateFunction = states.gameWinState();
            states.gameWin();
            break;

    }
}