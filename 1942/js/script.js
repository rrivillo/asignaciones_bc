var hero = {
  x: 300,
  y: 300
}

var enemies = [
  { x: 50, y: 50 },
  { x: 250, y: 50 },
  { x: 450, y: 250 },
  { x: 550, y: 250 },
  { x: 650, y: 450 },
  { x: 750, y: 450 },
  { x: 850, y: 750 }
];

var bullets = [];

var score = 0;

function displayHero() {
  document.getElementById('hero').style['top'] = hero.y + "px";
  document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemies() {
  var enemiesContainer = document.getElementById("enemies");
  enemiesContainer.innerHTML = ''; // Limpiar el contenido actual antes de agregar nuevos enemigos

  for (let i = 0; i < enemies.length; i++) {
    var enemy = document.createElement("div");
    enemy.className = "enemy1";
    enemy.style.top = enemies[i].y + "px";
    enemy.style.left = enemies[i].x + "px";
    enemiesContainer.appendChild(enemy);
  }
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].y += 5;

    if (enemies[i].y > 540) {
      enemies[i].y = 0;
      enemies[i].x = Math.random() * 500;
    }
  }
}

function displayBullets() {
  var output = '';
  for (let i = 0; i < bullets.length; i++) {
    output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
  }
  document.getElementById("bullets").innerHTML = output;

}

function playShootSound() {
  var shootSound = document.getElementById("shootSound");
  shootSound.currentTime = 0;
  shootSound.play();
}

function moveBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 5;

    if (bullets[i].y < 0) {
      bullets[i] = bullets[bullets.length - 1];
      bullets.pop();
    }
  }
}


function displayScore() {
  document.getElementById("score").innerHTML = score;
}

function gameLoop() {
  displayHero();
  displayEnemies();
  moveEnemies();
  moveBullets();
  displayBullets();
  detectCollision();
  displayScore();
}

function detectCollision() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10) {
        score += 10;
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        i--;
        break;
      }
    }

  }

  for (let k = 0; k < enemies.length; k++) {
    if (
      Math.abs(hero.x - enemies[k].x) < 10 &&
      Math.abs(hero.y - enemies[k].y) < 10
    ) {
      score -= 500; // Resta 500 puntos si hay colisión entre el héroe y un enemigo
    }
  }
}

setInterval(gameLoop, 50);


document.onkeydown = function (a) {
  if (a.keyCode == 68) {
    hero.x += 10;
  } else if (a.keyCode == 65) {
    hero.x -= 10;
  } else if (a.keyCode == 87) {
    hero.y -= 10;
  } else if (a.keyCode == 83) {
    hero.y += 10;
  } else if (a.keyCode == 32) {
    bullets.push({ x: hero.x + 8, y: hero.y - 15 });
    displayBullets();
    playShootSound();
  }
}
