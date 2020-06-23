// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we"ve provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we"ve provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy"s position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. 
    this.x += this.speed * dt;

    //if enemy reach at the right wall, return back start position and speed up 
    if (this.x > 550) {
        this.x = -100;
        this.speed = 150 + Math.floor(Math.random() * 35);
    }

    // if any collision, player must return start position
    if (collides(this, player)) {
        player.x = 200;
        player.y = 380;
    }
};

function collides(enemy, player)
{
    if (enemy.x < player.x + 45 &&
        enemy.x + 50 > player.x &&
        enemy.y < player.y + 30 &&
        enemy.y + 25 > player.y) 
        return true;
    return false;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    // player can not move out wall
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // Check player reach the water then go to start position
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        alert("You win");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case "left":
            this.x -= 60;
            break;
        case "up":
            this.y -= 40;
            break;
        case "right":
            this.x += 60;
            break;
        case "down":
            this.y += 40;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(200, 380, 50);

//create enemies with randomNumber
var randomArray = [50, 90, 210, 240];
randomArray.forEach(function(random) {
    let x =  Math.floor(Math.random() - random);
    let y = Math.floor(Math.random() + random);
    let speed = Math.floor(Math.random() * random);
    let enemy = new Enemy(x, y, speed);
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
