"use strict";

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = "images/enemy-bug.png";
        //set enemy start location
        this.x = x;
        this.y = y;
        this.speed = speed;
        //set speed
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x >= 500){
            this.x = -100;
        }
        this.x += (this.speed*dt);

        //handle collision with the Player
        let enemyRight = this.x + 101;
        let enemyLeft = this.x;
        let playerLeft = player.x;
        let playerRight = player.x + 101;
        if(enemyRight >= playerLeft & enemyLeft <= playerRight & this.y == player.y){
            player.resetPlayer();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    //instantiate Player with image and initial location
    constructor(x, y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
    }

    //update Player location and handle collision with Enemy
    update() {

    }

    //use the same as the enemy render method
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //receive user input (allowedKeys), and move player
    handleInput(allowedKeys) {
        //ensure that player cannot move off-screen
        const border = {
            left: 0,
            right: 404,
            top: -10,
            bottom: 405
        }

        const yIncrement = (border.bottom - border.top) / 5;
        const xIncrement = (border.right - border.left) / 4;

        //handle key inputs
        switch(allowedKeys) {
            case 'up':
                this.y -= yIncrement;
                if (this.y == border.top) {
                    setTimeout(function(){
                        player.resetPlayer();
                    }, 500);
                    break;
                }
                break;
            case 'down':
                if (this.y == border.bottom) {
                    break;
                }
                this.y += yIncrement;
                break;
            case 'left':
                if (this.x == border.left) {
                    break;
                }
                this.x -= xIncrement;
                break;
            case 'right':
                if (this.x == border.right) {
                    break;
                }
                this.x += xIncrement;
                break;
        }
    }

    //reset game when player reaches the water
    resetPlayer() {
        this.x = 202;
        this.y = 405;
    }
}

// Now instantiate your objects and place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 73, 50),
    new Enemy(101, 156, 100),
    new Enemy(202, 239, 150)];

// Place the player object in a variable called player
const player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
