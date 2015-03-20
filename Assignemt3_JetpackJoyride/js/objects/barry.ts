/// <reference path="bullet.ts" />
/**
File Name: barry.ts
Author: Chandan Dadral
Purpose: This file contains all details to initalize a Barry object and it has the features so that player can fire Bullets aswell
Last Modified : March 19, 2015
*/

module objects {
    // Barry Class
    export class Barry {
        stage: createjs.Stage;
        game: createjs.Container;
        image: createjs.Bitmap;
        width: number;
        height: number;
        dx: number;

        //Constructor+++++++++++++++++++++++
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(queue.getResult("barry"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;
            this.dx = 5;

            //Event Listner when the Bitmap is Clicked
            this.image.addEventListener("click", function (e) {
                createjs.Sound.play("shoot");
                //Creates new Bullet Object
                bullet = new objects.Bullet(stage, game);
                bullets.push(bullet);
                bullets[bullets.length - 1].fireBullet();
            });

            game.addChild(this.image);  

            // Play background sound through out the game
            createjs.Sound.play("backAudio", 0, 0, 0, -1, 1, 0);
        }

        // Function to update position of Barry.
        update() {
            this.image.x = stage.mouseX;
            this.image.y = stage.mouseY;
        }

        // Function to destroy barry object from Canvas.
        destroy() {
            game.removeChild(this.image);
        }

    }
}