var Player = function () {
  this.speed = 5
  this.alive = true
  this.kills = 0
  this.map = {}
  this.sprite = 'images/char-boy.png'
  this.x = 410
  this.y = 150
}

Player.prototype.handleInput = function (keycode, status) {
  this.map[keycode] = status
}

Player.prototype.update = function (dt) {
    if (this.map['left'] && this.map['up']) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
  } else if (this.map['left'] && this.map['down']) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
  } else if (this.map['right'] && this.map['up']) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
  } else if (this.map['right'] && this.map['down']) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
  } else if (this.map['left']) {
    this.x = this.x - this.speed
  } else if (this.map['right']) {
    this.x = this.x + this.speed
  } else if (this.map['up']) {
    this.y = this.y - this.speed
  } else if (this.map['down']) {
    this.y = this.y + this.speed
  }

  if (this.x < -50) {
    this.x = -50
  } else if (this.x > 960) {
    this.x = 960
  }

  if (this.y < -100) {
    this.y = -100
  } else if (this.y > 540) {
    this.y = 540
  }
}

Player.prototype.render = function (dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player;
var reset;