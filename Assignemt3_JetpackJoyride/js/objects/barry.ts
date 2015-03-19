/// <reference path="bullet.ts" />
/**
File Name: barry.ts
Author: Chandan Dadral
Website Name: Plane object class for Star Savior Side-Scrolling Arcade Game
Purpose: This file contains all details to initalize a plane object
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
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(queue.getResult("barry"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;
            this.dx = 5;

            this.image.addEventListener("click", function (e) {
                 createjs.Sound.play("shoot");
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

        // Function to destroy plane object.
        destroy() {
            game.removeChild(this.image);
        }

    }
}