/**
File Name: background.ts
Author: Chandan Dadral
Purpose: This file contains all details to initalize a background for the game
IT is  a continous background of Labouratory.
*/
module objects {
    // Background  Class
    export class Background {
        image: createjs.Bitmap;
        image2: createjs.Bitmap;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        _dx: number;

        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(queue.getResult("background"));

            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this._dx = 5;

            game.addChild(this.image);
            game.addChild(this.image2);
            this.reset();

        }

        // Function to reset position of first background image.
        reset() {
            this.image.x = 0;
            this.image.y = 0;
        }

       

        // Function to update position of background.
        update() {
            this.image.x -= this._dx;

            this._checkBounds();

        }

        private _checkBounds() {
            if (this.image.x < -892) {
                this.reset();
                

            }
        }

        // Function to destroy background object.
        destroy() {
            this.game.removeChild(this.image);
            this.game.removeChild(this.image2);

        }
    }


}