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


document.addEventListener('mousemove', function (event) {
  event.preventDefault();
  crosshair.x = event.clientX - ctx.canvas.offsetLeft;
  crosshair.y = event.clientY - ctx.canvas.offsetTop;
});

document.addEventListener('click', function (event) {
  event.preventDefault();
  var bullet = new Bullet();
  bullets.push(bullet)
});
