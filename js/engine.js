var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        init_menu_element = doc.getElementById("init-menu"),
        game_over_menu_element = doc.getElementById("game-over-menu"),
        reset_buttons = doc.getElementsByClassName("reset-button"),
        menu_button = doc.getElementById('menu-button'),
        lastTime;

    canvas.width = 960;
    canvas.height = 540;
    doc.body.appendChild(canvas);
    for (var i = 0; i < reset_buttons.length; i++) {
        reset_buttons[i].addEventListener('click', reset);
    }
    menu_button.addEventListener("click", menu)

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000;
        update(dt);
        renderEntities();
        lastTime = now;
        if (player.alive){
            win.requestAnimationFrame(main);
        } else {
            gameOver();
        }
    };

    function gameOver () {
        game_over_menu_element.style.display = "block"
    }

    function menu() {
        ctx.drawImage(Resources.get('images/background.jpeg'), 0, 0)
        game_over_menu_element.style.display = "none"
        init_menu_element.style.display = "block"
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions() {
      bullets.forEach(function(bullet, i) {
        if (bullet.x < -100 || bullet.x > 960 || bullet.y < -170 || bullet.y > 540) {
          bullets.splice(i,1)
        }
        allEnemies.forEach(function(enemy, j) {
          if (Math.abs(enemy.x - bullet.x) < 30 && Math.abs(enemy.y - bullet.y) < 30) {
            bullets.splice(i,1);
            allEnemies.splice(j, 1);
          }
        })
      });
    }

    function updateEntities(dt) {
        player.update(dt);
        crosshair.update(dt);
        bullets.forEach(function(bullet, i) {
          bullet.update(dt);
        });
        allEnemies.forEach(function(enemy) {
          enemy.update(dt);
        });
    }

    function renderEntities() {
        ctx.drawImage(Resources.get('images/background.jpeg'), 0, 0)
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
        crosshair.render();
        bullets.forEach(function(bullet) {
          bullet.render();
        });
        if (allEnemies.length < 30) {
          var enemy = new Dumbzombies();
          allEnemies.push(enemy);
        }
    }

    function reset() {
        removeEventListeners();
        player = new Player();
        allEnemies = [];
        for (var i = 0; i < 30; i++) {
          var enemy = new Dumbzombies();
          allEnemies.push(enemy)
        }
        crosshair = new Crosshair();
        bullets = [];
        game_over_menu_element.style.display = "none"
        init_menu_element.style.display = "none"
        addEventListeners();
        lastTime = Date.now();
        main();
    }

    Resources.load([
        'images/background.jpeg',
        'images/Rock.png',
        'images/crosshair.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(menu);

    global.ctx = ctx;
})(this);
