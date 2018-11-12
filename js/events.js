function keyDownHandler(e) {
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
}

function keyUpHandler(e) {
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
}

function mouseMoveHandler(e) {
  e.preventDefault();
  crosshair.x = e.clientX - ctx.canvas.offsetLeft;
  crosshair.y = e.clientY - ctx.canvas.offsetTop;
}

function clickHandler(e) {
  e.preventDefault();
  var bullet = new Bullet();
  bullets.push(bullet)
}

function addEventListeners() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('click', clickHandler);
}

function removeEventListeners() {
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('keyup', keyUpHandler);
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('click', clickHandler);
}
