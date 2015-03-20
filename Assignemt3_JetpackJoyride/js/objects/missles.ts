/**
File Name: missles.ts
Author: Chandan Dadral
Purpose: This file contains all details to initalize a missles object
Last Modified : March 19, 2015
*/
module objects {
    // missles Class
    export class Missle {
        image: createjs.Bitmap;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        dx: number;
        //constructor++++++++++++++++
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(queue.getResult("missles"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;


            game.addChild(this.image);
            this.reset();
        }

        // Function to reset missles off screen
        reset() {
            this.image.x = 892;
            this.image.y = Math.floor(Math.random() * 480);
            this.dx = Math.floor(Math.random() * 5 + 5);
        }

        // Function to missles position of enemy.
        update() {
            this.image.x -= this.dx;
            if (this.image.x < 0) {
                this.reset();
            }
        }

        // Function to remove missles from the game
        destroy() {
            game.removeChild(this.image);
        }

    }
}