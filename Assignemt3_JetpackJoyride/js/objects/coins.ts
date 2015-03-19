/**
File Name: coins.ts
Author: Chandan Dadral
Purpose: This class has the details of the Coins object 
- coins are given to the player throughout the game.
*/
module objects {
    // coin Class
    export class Coins {
        image: createjs.Bitmap;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        dy: number;

        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;

            this.image = new createjs.Bitmap(queue.getResult("coins"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;
            this.dy = 5;

            game.addChild(this.image);
            this._reset();
        }


        // Function to reset coins off screen
        _reset() {
            this.image.x = 630;
            this.image.y = Math.floor(Math.random() * 480);
        }

        // Function to update position of coins.
        update() {
            this.image.x -= this.dy;
            if (this.image.x < 0) {
                this._reset();
            }
        }

        // Function to remove coins from the game
        destroy() {
            game.removeChild(this.image);
        }
    }
}