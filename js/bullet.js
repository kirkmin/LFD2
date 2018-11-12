var Bullet = function () {
  this.sprite = 'images/Rock.png'
  this.width = 45
  this.height = 45
  this.x = player.x + (player.width - this.width)/2
  this.y = player.y + (player.height - this.height)/2
  this.targetx = crosshair.x + (crosshair.width - this.width)/2
  this.targety = crosshair.y + (crosshair.height - this.height)/2
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
  // ctx.strokeRect(this.x, this.y, this.width, this.height);
}

var bullets;
