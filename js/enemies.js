var Dumbzombies = function() {
  var randomIndex = Math.floor(Math.random() * 4);
  this.alive = true
  this.sprite = 'images/enemy-bug.png';

  if (randomIndex === 0) {
    this.x = -100
  } else if (randomIndex === 1) {
    this.x = 770
  } else {
    this.x = (Math.random() * 870) - 50
  }

  if (randomIndex === 2) {
    this.y = -150
  } else if (randomIndex === 3) {
    this.y = 600
  } else {
    this.y = (Math.random() * 750) - 100
  }

  this.speed = 5
}

Dumbzombies.prototype.update = function() {
  this.getDirection();
  if ((player.x < this.x + 50 && player.x > this.x - 50) &&
    (player.y < this.y + 50 && player.y > this.y - 50)) {
      alert('YOUR DEAD')
      player.alive = false
  }
}

Dumbzombies.prototype.getDirection = function () {
  var number = Math.floor(Math.random() * 8)

  if (number === 0) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
  } else if (number === 1) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
  } else if (number === 2) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
  } else if (number === 3) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
  } else if (number === 4) {
    this.x = this.x - this.speed
  } else if (number === 5) {
    this.x = this.x + this.speed
  } else if (number === 6) {
    this.y = this.y - this.speed
  } else if (number === 7) {
    this.y = this.y + this.speed
  }

  if (this.x < -100) {
    this.x = -100
  } else if (this.x > 770) {
    this.x = 770
  }

  if (this.y < -150) {
    this.y = -150
  } else if (this.y > 600) {
    this.y = 600
  }
}

Dumbzombies.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var allEnemies = [];
for (var i = 0; i < 30; i++) {
  var enemy = new Dumbzombies();
  allEnemies.push(enemy)
}
