var Smartzombie = function() {
  var randomIndex = Math.floor(Math.random() * 4);
  this.change_direction_on = 10
  this.update_count = Math.floor(Math.random() * this.change_direction_on)
  this.change_sprite_animation = 5
  this.leeway = 10
  this.hitpoints = 1
  this.alive = true
  this.width = 32
  this.height = 50
  this.speed = 2
  this.direction_number = 0
  this.walkNumber = Math.floor(Math.random() * 4) + 1
  this.sprite = 'images/zombie_n_skeleton2.png';
  this.angle = Math.floor(Math.random() * 360) - 180;
  this.score = 10

  if (randomIndex === 0) {
    this.x = 0 - this.width
  } else if (randomIndex === 1) {
    this.x = 960
  } else {
    this.x = (Math.random() * 960)
  }

  if (randomIndex === 2) {
    this.y = 0 - this.height
  } else if (randomIndex === 3) {
    this.y = 540
  } else {
    this.y = (Math.random() * 540)
  }
}

Smartzombie.prototype.update = function() {
  this.update_count += 1

  this.getDirection(this.update_count % this.change_direction_on == 0);

  if (this.update_count % this.change_sprite_animation == 0) {
    if (this.walkNumber >= 4) {
      this.walkNumber = 1
    } else {
      this.walkNumber += 1
    }
  }
    
  if ((player.x > this.x - player.width + this.leeway && player.x < this.x + this.width - this.leeway) &&
    (player.y > this.y - player.height + this.leeway && player.y < this.y + this.height - this.leeway)) {
    player.alive = false
  }
}

Smartzombie.prototype.getDirection = function (new_direction) {
  if (new_direction) {
    this.angle = Math.atan2(this.y - player.y, this.x - player.x) * 180 / Math.PI;
  }

  if (this.angle >= -22.5 && this.angle < 22.5) {
    this.x = this.x - this.speed
    this.direction_number = 1
  } else if (this.angle >= 22.5 && this.angle < 67.5) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
    this.direction_number = 1
  } else if (this.angle >= 67.5 && this.angle < 112.5) {
    this.y = this.y - this.speed
    this.direction_number = 3
  } else if (this.angle >= 112.5 && this.angle < 157.5) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
    this.direction_number = 3
  } else if (this.angle >= 157.5 || this.angle < -157.5) {
    this.x = this.x + this.speed
    this.direction_number = 2
  } else if (this.angle >= -157.5 && this.angle < -112.5) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
    this.direction_number = 2
  } else if (this.angle >= -112.5 && this.angle < -67.5) {
    this.y = this.y + this.speed
    this.direction_number = 0
  } else if (this.angle >= -67.5 && this.angle < -22.5) {
    this.x = this.x -(this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
    this.direction_number = 0
  }
}

Smartzombie.prototype.takeHit = function(bullet) {
  this.hitpoints -= 1
  this.x += bullet.movex
  this.y += bullet.movey
  if (this.hitpoints <= 0) {
    this.alive = false
    player.score += this.score
  }
  return this.alive
}

Smartzombie.prototype.render = function() {
  if (this.walkNumber == 4) {
    var calculatedWalkNumber = 2
  } else {
    var calculatedWalkNumber = this.walkNumber
  }
  ctx.drawImage(Resources.get(this.sprite), (calculatedWalkNumber - 1) * 32 + 192, (this.direction_number) * 64 + 16, this.width, this.height, this.x, this.y, this.width, this.height);
  // ctx.strokeRect(this.x, this.y, this.width, this.height);
}

var smartZombies;