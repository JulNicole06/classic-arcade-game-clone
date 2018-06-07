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
        /* TODO:
         * 1. update Enemy location
         * 2. handle collision with the Player
         */
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

    //receive user input, allowedKeys, and move player
    handleInput(allowedKeys) {
        //ensure that player cannot move off-screen
        const xPositions = [0, 100, 200, 300, 400];
        const yPositions = [400, 320, 240, 155, 75, -10];
        let yidx, xidx;
        //handle key inputs
        switch(allowedKeys) {
            case 'up':
                yidx = yPositions.indexOf(this.y) + 1;
                if (yidx == 6) {
                    yidx = 5;
                }
                this.y = yPositions[yidx];
                break;
            case 'down':
                yidx = yPositions.indexOf(this.y) - 1;
                if (yidx < 0) {
                    yidx = 0;
                }
                this.y = yPositions[yidx];
                break;
            case 'left':
                xidx = xPositions.indexOf(this.x) - 1;
                if (xidx < 0) {
                    xidx = 0;
                }
                this.x = xPositions[xidx];
                break;
            case 'right':
                xidx = xPositions.indexOf(this.x) + 1;
                if (xidx == 5) {
                    xidx = 4;
                }
                this.x = xPositions[xidx];
                break;
        }
    }

    //reset game when player reaches the water
    resetPlayer() {

    }
}

// Now instantiate your objects.
const enemy1 = new Enemy(0,65, 50);
const enemy2 = new Enemy(100,145, 100);
const enemy3 = new Enemy(200,230, 150);

// Place all enemy objects in an array called allEnemies
let allEnemies = new Set();
allEnemies.add(enemy1);
allEnemies.add(enemy2);
allEnemies.add(enemy3);

// Place the player object in a variable called player
const player = new Player(200, 400);


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
