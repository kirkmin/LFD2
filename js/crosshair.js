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

var crosshair = new Crosshair();
