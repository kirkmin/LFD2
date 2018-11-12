var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        init_menu_element = doc.getElementById("init-menu"),
        game_over_menu_element = doc.getElementById("game-over-menu"),
        reset_buttons = doc.getElementsByClassName("reset-button"),
        menu_button = doc.getElementById('menu-button'),
        score_span = doc.getElementById('score-span'),
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
        canvas.style.cursor = "auto"
    }

    function menu() {
        ctx.drawImage(Resources.get('images/background.jpeg'), 0, 0)
        game_over_menu_element.style.display = "none"
        init_menu_element.style.display = "block"
        canvas.style.cursor = "auto"
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
        dumbZombies.forEach(function(dumbZombie, j) {
            if ((bullet.x > dumbZombie.x - bullet.width + dumbZombie.leeway && bullet.x < dumbZombie.x + dumbZombie.width - dumbZombie.leeway) &&
            (bullet.y > dumbZombie.y - bullet.height + dumbZombie.leeway && bullet.y < dumbZombie.y + dumbZombie.height - dumbZombie.leeway)) {
                bullets.splice(i,1);
                if (!dumbZombie.takeHit(bullet)) {
                    dumbZombies.splice(j, 1);
                }
            }
        })
        smartZombies.forEach(function(smartZombie, j) {
            if ((bullet.x > smartZombie.x - bullet.width + smartZombie.leeway && bullet.x < smartZombie.x + smartZombie.width - smartZombie.leeway) &&
            (bullet.y > smartZombie.y - bullet.height + smartZombie.leeway && bullet.y < smartZombie.y + smartZombie.height - smartZombie.leeway)) {
                bullets.splice(i,1);
                if (!smartZombie.takeHit(bullet)) {
                    smartZombies.splice(j, 1);
                }
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
        dumbZombies.forEach(function(dumbZombie) {
          dumbZombie.update(dt);
        });
        smartZombies.forEach(function(smartZombie) {
          smartZombie.update(dt);
        });
        score_span.innerHTML = player.score
    }

    function renderEntities() {
        ctx.drawImage(Resources.get('images/background.jpeg'), 0, 0)
        dumbZombies.forEach(function(dumbZombie) {
            dumbZombie.render();
        });
        smartZombies.forEach(function(smartZombie) {
            smartZombie.render();
        });
        player.render();
        crosshair.render();
        bullets.forEach(function(bullet) {
          bullet.render();
        });
        if (dumbZombies.length < 30) {
          var dumbZombie = new Dumbzombie();
          dumbZombies.push(dumbZombie);
        }
        if (smartZombies.length < 5) {
          var smartZombie = new Smartzombie();
          smartZombies.push(smartZombie);
        }
    }

    function reset() {
        removeEventListeners();
        player = new Player();
        dumbZombies = [];
        for (var i = 0; i < 30; i++) {
          var dumbZombie = new Dumbzombie();
          dumbZombies.push(dumbZombie)
        }
        smartZombies = [];
        for (var i = 0; i < 5; i++) {
          var smartZombie = new Smartzombie();
          smartZombies.push(smartZombie)
        }
        crosshair = new Crosshair();
        bullets = [];
        game_over_menu_element.style.display = "none"
        init_menu_element.style.display = "none"
        canvas.style.cursor = "none"
        addEventListeners();
        lastTime = Date.now();
        main();
    }

    Resources.load([
        'images/background.jpeg',
        'images/Rock.png',
        'images/crosshair.png',
        'images/zombie_n_skeleton2.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(menu);

    global.ctx = ctx;
})(this);
