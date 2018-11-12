var Crosshair = function () {
  this.sprite = 'images/crosshair.png'
  this.width = 48
  this.height = 48
  this.x = -1000
  this.y = -1000
}

Crosshair.prototype.update = function (dt) {
}

Crosshair.prototype.render = function (dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var crosshair;
