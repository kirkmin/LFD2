var Bullet = function () {
  this.alive = true
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

var bullets;
