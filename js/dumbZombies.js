var Dumbzombie = function() {
  var randomIndex = Math.floor(Math.random() * 4);
  this.change_direction_on = 10
  this.update_count = Math.floor(Math.random() * this.change_direction_on)
  this.change_sprite_animation = 5
  this.leeway = 10
  this.hitpoints = 3
  this.alive = true
  this.width = 32
  this.height = 40
  this.speed = 3
  this.direction_number = 0
  this.walkNumber = Math.floor(Math.random() * 4) + 1
  this.sprite = 'images/zombie_n_skeleton2.png';

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

Dumbzombie.prototype.update = function() {
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

Dumbzombie.prototype.getDirection = function (new_direction) {
  if (new_direction) {
    this.number = Math.floor(Math.random() * 8)
  }

  if (this.number === 0) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
    this.direction_number = 1
  } else if (this.number === 1) {
    this.x = this.x - (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
    this.direction_number = 0
  } else if (this.number === 2) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y - (this.speed / Math.sqrt(2))
    this.direction_number = 3
  } else if (this.number === 3) {
    this.x = this.x + (this.speed / Math.sqrt(2))
    this.y = this.y + (this.speed / Math.sqrt(2))
    this.direction_number = 2
  } else if (this.number === 4) {
    this.x = this.x - this.speed
    this.direction_number = 1
  } else if (this.number === 5) {
    this.x = this.x + this.speed
    this.direction_number = 2
  } else if (this.number === 6) {
    this.y = this.y - this.speed
    this.direction_number = 3
  } else if (this.number === 7) {
    this.y = this.y + this.speed
    this.direction_number = 0
  }

  if (this.x <= 0 - this.width) {
    this.x = 0 - this.width
  } else if (this.x >= 960) {
    this.x = 960
  }

  if (this.y <= 0 - this.height) {
    this.y = 0 - this.height
  } else if (this.y >= 540) {
    this.y = 540
  }
}

Dumbzombie.prototype.takeHit = function(bullet) {
  this.hitpoints -= 1
  this.x += bullet.movex
  this.y += bullet.movey
  if (this.hitpoints <= 0) {
    this.alive = false
  }
  return this.alive
}

Dumbzombie.prototype.render = function() {
  if (this.walkNumber == 4) {
    var calculatedWalkNumber = 2
  } else {
    var calculatedWalkNumber = this.walkNumber
  }
  ctx.drawImage(Resources.get(this.sprite), (calculatedWalkNumber - 1) * 32, (this.direction_number) * 64 + 24, this.width, this.height, this.x, this.y, this.width, this.height);
  // ctx.strokeRect(this.x, this.y, this.width, this.height);
}

var dumbZombies;