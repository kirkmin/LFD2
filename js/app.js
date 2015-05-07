var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor((Math.random() * 600) - 100);
    this.y = y
    this.speed = 300
}

var fillEnemies = function () {
  var result = []
  for (var i = 0; i < 0; i++) {
    result.push(new Enemy(60 + i * 83))
  }
  return result;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x > 500) {
    this.x = -100
  }
  this.x = this.x + this.speed * dt
  if ((player.x < this.x + 50 && player.x > this.x - 50) &&
    (player.y < this.y + 50 && player.y > this.y - 50)) {
    player.x = 100
    player.y = 400
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  this.map = {}
  this.sprite = 'images/char-boy.png'
  this.x = 335
  this.y = 225
}

Player.prototype.handleInput = function (keycode, status) {
  this.map[keycode] = status
}

Player.prototype.update = function (dt) {
}

Player.prototype.render = function (dt) {
  if (this.map['left'] && this.map['up']) {
    this.x = this.x - 3.54
    this.y = this.y - 3.54
  } else if (this.map['left'] && this.map['down']) {
    this.x = this.x - 3.54
    this.y = this.y + 3.54
  } else if (this.map['right'] && this.map['up']) {
    this.x = this.x + 3.54
    this.y = this.y - 3.54
  } else if (this.map['right'] && this.map['down']) {
    this.x = this.x + 3.54
    this.y = this.y + 3.54
  } else if (this.map['left']) {
    this.x = this.x - 5
  } else if (this.map['right']) {
    this.x = this.x + 5
  } else if (this.map['up']) {
    this.y = this.y - 5
  } else if (this.map['down']) {
    this.y = this.y + 5
  }

  if (this.x < -50) {
    this.x = -50
  } else if (this.x > 720) {
    this.x = 720
  }

  if (this.y < -100) {
    this.y = -100
  } else if (this.y > 550) {
    this.y = 550
  }

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Crosshair = function () {
  this.sprite = 'images/crosshair.png'
  this.x = 335
  this.y = 225
}

Crosshair.prototype.update = function (dt) {
}

Crosshair.prototype.render = function (dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Bullet = function () {
  this.sprite = 'images/Rock.png'
  this.x = player.x
  this.y = player.y
  this.targetx = crosshair.x - 20
  this.targety = crosshair.y - 90
  if (this.targetx - this.x > 0) {
    this.mag = 10
  } else {
    this.mag = -10
  }
  this.angle = Math.atan((this.targety - this.y) / (this.targetx - this.x))
  this.movex = Math.cos(this.angle) * this.mag
  this.movey = Math.sin(this.angle) * this.mag
}

Bullet.prototype.update = function (dt) {
  this.x = this.x + this.movex
  this.y = this.y + this.movey
}

Bullet.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player = new Player();
var allEnemies = fillEnemies();
var crosshair = new Crosshair();
var bullets = [];

document.addEventListener('keydown', function(e) {
  e.preventDefault();
  var allowedKeys = {
    65: 'left',
    83: 'down',
    68: 'right',
    87: 'up',
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

  player.handleInput(allowedKeys[e.keyCode], true);
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  var allowedKeys = {
    65: 'left',
    83: 'down',
    68: 'right',
    87: 'up',
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right'
  };

  player.handleInput(allowedKeys[e.keyCode], false);
});
