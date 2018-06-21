"use strict";

// global variables
let active = true;
const congrats = document.querySelector("#congrats-modal");
const restartButton = document.querySelector("#restart-button");

// enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // the image/sprite for the enemies, this uses
        // a helper provided to easily load images
        this.sprite = "images/enemy-bug.png";

        //set enemy start location and speed
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // update the enemy's position
    // parameter: dt, a time delta between ticks
    update(dt) {
        // have enemy restart at the left side of the play area after
        // moving across the screen
        if(this.x >= 500){
            this.x = -100;
        }

        // to ensure the game runs at the same speed for all computers
        // multiply any movement by the dt parameter
        this.x += (this.speed*dt);

        // set parameters for collision between player and enemy
        // width of box is 101px, space between player and box is approx 15px
        const enemyRight = this.x + 101 - 15;
        const enemyLeft = this.x + 15;
        const playerLeft = player.x + 15;
        const playerRight = player.x + 101 - 15;
        if(enemyRight >= playerLeft && enemyLeft <= playerRight && this.y == player.y){
            player.resetPlayer();
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// main player class
class Player {
    constructor(x, y) {
        // the image/sprite for the player, this uses
        // a helper provided to easily load images
        this.sprite = 'images/char-cat-girl.png';

        // set player starting position
        this.x = x;
        this.y = y;
    }

    // same as the enemy render method
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // receive user input (allowedKeys), and move player
    handleInput(allowedKeys) {
        // ensure that player cannot move off-screen
        const border = {
            left: 0,
            right: 404,
            top: -10,
            bottom: 405
        };

        // increment player up/down based on height/width of each box
        const yIncrement = (border.bottom - border.top) / 5;
        const xIncrement = (border.right - border.left) / 4;

        // handle key inputs
        switch(allowedKeys) {
            case 'up':
                this.y -= yIncrement;

                // when player reaches the water, show popup
                if (this.y == border.top) {
                    player.winGame();
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

    // congrats modal popup when player reaches water
    winGame() {
        restartButton.addEventListener("click", player.resetPlayer);

        // prevent player from being able to move
        // while pop up is visible
        active = false;
        congrats.style.visibility = 'visible';
    }

    // reset game player to start position,
    // hide congrats pop up and allow player movement
    resetPlayer() {
        active = true;
        congrats.style.visibility = 'hidden';
        player.x = 202;
        player.y = 405;
    }
}

// instantiate player and allEnemies array
const allEnemies = [new Enemy(0, 73, 50),
    new Enemy(101, 156, 100),
    new Enemy(202, 239, 150)];

const player = new Player(202, 405);

// listen for key presses and send the keys to player.handleInput() method
document.addEventListener('keyup', function(e) {
    if(active){
        const allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode])
    };
});
