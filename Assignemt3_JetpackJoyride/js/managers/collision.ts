/// <reference path="../objects/coins.ts" />
/// <reference path="../objects/barry.ts" />
/// <reference path="../objects/missles.ts" />
/**
File Name: collision.ts
Author: Chandan Dadral
Purpose: This file contains the manager for all collisions between objects like barry and Coins 
it detect the collision and do what actions to perform.
*/
module managers {
    // The Distance Function
    // Checks the distance between two objects
    export function distance(p1: createjs.Point, p2: createjs.Point): number {

        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));

    }

    // Check collision between bary and coin
    export function barryAndCoin() {
        var point1: createjs.Point = new createjs.Point();
        var point2: createjs.Point = new createjs.Point();

        point1.x = barry.image.x;
        point1.y = barry.image.y;

        point2.x = coins.image.x;
        point2.y = coins.image.y;
        if (distance(point1, point2) < ((barry.height * 0.5) + (coins.height * 0.5))) {
            scoreboard.score += 100;
            switch (scoreboard.score) {
                //when player has score in thousands then player gets  a life up and different sound is played.
               
                case 1000:
                    createjs.Sound.play('lifeUpAudio');
                    scoreboard.lives += 1;
                    break;
                case 2000:
                    createjs.Sound.play('lifeUpAudio');
                    scoreboard.lives += 1;
                    break;
                case 3000:
                    createjs.Sound.play('lifeUpAudio');
                    scoreboard.lives += 1;
                    break;
                case 4000:
                    createjs.Sound.play('lifeUpAudio');
                    scoreboard.lives += 1;
                    break;
                case 5000:
                    createjs.Sound.play('lifeUpAudio');
                    scoreboard.lives += 1;
                    break;
                default:
                    createjs.Sound.play("coinCollect");
                    break;
            }
            coins._reset();
        };
    }

    // Check collision between barry and missles
    export function barryAndMissles(enemy: objects.Missle) {
        var p1: createjs.Point = new createjs.Point();
        var p2: createjs.Point = new createjs.Point();
        p1.x = barry.image.x;
        p1.y = barry.image.y;
        p2.x = enemy.image.x;
        p2.y = enemy.image.y;
        if (distance(p1, p2) <= ((barry.height * 0.5) + (enemy.height * 0.5))) {
            createjs.Sound.play("explosionAudio");
            scoreboard.lives -= 1;
            enemy.reset();
        }
    }

    // Check all collisions
    export function collisionCheck() {
        barryAndCoin();

        for (var count = 0; count < constants.ENEMY_NUM; count++) {
            barryAndMissles(missles[count]);
            for (var i = 0; i < bullets.length; i++) {
                bulletAndMissle(missles[count], bullets[i]);
            }
        };
    }
    // Check collision between bullet and missles
    export function bulletAndMissle(enemy: objects.Missle, bullet: objects.Bullet) {
        var point1: createjs.Point = new createjs.Point();
        var point2: createjs.Point = new createjs.Point();

        point1.x = bullet.image.x;
        point1.y = bullet.image.y;

        point2.x = enemy.image.x;
        point2.y = enemy.image.y;
        if (distance(point1, point2) < ((bullet.height * 0.5) + (enemy.height * 0.5))) {
            createjs.Sound.play("explosionAudio");
            
            enemy.reset();
            bullet.bulletReset();
        };
    }


}