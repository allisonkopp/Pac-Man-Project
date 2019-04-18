ctx = document.querySelector("canvas").getContext("2d");

const playerUp = new Image();
const playerDown = new Image();
const playerLeft = new Image();
const playerRight = new Image();

const playerWidth = 28;
const playerHeight = 28;
const startingPosX = 495;
const startingPosY = 585; //585; //450

let retroMode = false;

let lastTravelled = [];
let lastTravelledX = null;
let lastTravelledY = null;

const heart1 = document.getElementById("life-1");
const heart2 = document.getElementById("life-2");
const heart3 = document.getElementById("life-3");

const keepScore = document.getElementById("score");

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 28;
    this.width = 28;
    this.direction = "E";
    this.speed = 2;
    this.movement = String();
    this.interval = null;
    this.score = 0;
    this.life = 3;
    this.name = document.getElementById("player-name");
    this.retro = null;
  }

  startInterval() {
    if (!this.interval) this.interval = setInterval(_ => this.tick(), 9);
  }

  drawPlayer() {
    playerRight.src = "./images/pacman-right.png";
    playerUp.src = "./images/pacman-up.png";
    playerLeft.src = "./images/pacman-left.png";
    playerDown.src = "./images/pacman-down.png";
    if (this.life > 0) {
      switch (this.direction) {
        case "W":
          ctx.drawImage(playerLeft, this.x, this.y, playerWidth, playerHeight);
          break;
        case "N":
          ctx.drawImage(playerUp, this.x, this.y, playerWidth, playerHeight);
          break;
        case "S":
          ctx.drawImage(playerDown, this.x, this.y, playerWidth, playerHeight);
          break;
        case "E":
        default:
          ctx.drawImage(playerRight, this.x, this.y, playerWidth, playerHeight);
          break;
      }
    }
  }

  movePlayerUp() {
    this.direction = "N";
    if (!this.hitWall(this.x, this.y - this.speed)) {
      this.y -= this.speed;
      this.startInterval();
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // movePlayerUp() {
  //   this.direction = "N";
  //   if (!this.hitWall(this.x, this.y - this.speed)) {
  //     this.y -= this.speed;
  //   }
  // }

  // movePlayerDown() {
  //   this.direction = "S";
  //   if (!this.hitWall(this.x, this.y + playerHeight)) {
  //     this.y += this.speed;
  //   }
  // }

  movePlayerDown() {
    this.direction = "S";
    if (!this.hitWall(this.x, this.y + playerHeight)) {
      this.y += this.speed;
      this.startInterval();
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // movePlayerRight() {
  //   this.direction = "E";
  //   if (!this.hitWall(this.x + playerWidth, this.y)) {
  //     this.x += this.speed;
  //   }
  // }

  movePlayerRight() {
    this.direction = "E";
    if (!this.hitWall(this.x + playerWidth, this.y)) {
      this.x += this.speed;
      this.startInterval();
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // movePlayerLeft() {
  //   this.direction = "W";
  //   if (!this.hitWall(this.x - this.speed, this.y)) {
  //     this.x -= this.speed;
  //   }
  // }

  movePlayerLeft() {
    this.direction = "W";
    if (!this.hitWall(this.x - this.speed, this.y)) {
      this.x -= this.speed;
      this.startInterval();
    } else {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  movePlayer(e = {}) {
    this.speed = 2;
    const _e = e.key || e;
    switch (_e) {
      case "a":
        this.movement = _e;
        this.movePlayerLeft();
        if (this.x < 0) this.x = 780;
        break;
      case "d":
        this.movement = _e;
        this.movePlayerRight();
        if (this.x > boardWidth) this.x = 20;
        break;
      case "w":
        this.movement = _e;
        this.movePlayerUp();
        break;
      case "s":
        this.movement = _e;
        this.movePlayerDown();
        break;
    }
    lastTravelled.push(`${this.x}, ${this.y}`);
    lastTravelledX = lastTravelled[lastTravelled.length - 1].split(",")[0];
    lastTravelledY = lastTravelled[lastTravelled.length - 1].split(",")[1];
    // console.log(`The last coordinates are ${lastTravelled[lastTravelled.length - 1]}`);
    // console.log(`X value is ${lastTravelledX}`);
    // console.log(`Y value is ${lastTravelledY}`);
    this.collectCoins(coins);
    this.collectCoins(superCoins);
    if (fruitOnBoard) this.eatFruit(fruitOnBoard);
    this.hitGhost();
    this.drawPlayer();
  }

  collision(collidedObject) {
    return (
      collidedObject &&
      this.x + this.width >= collidedObject.x &&
      this.x <= collidedObject.x + collidedObject.width &&
      this.y + this.height >= collidedObject.y &&
      this.y <= collidedObject.y + collidedObject.height
    );
  }

  tick() {
    this.movePlayer(this.movement);
  }

  collectCoins(coinType) {
    if (!coinType.length) this.gameOver();
    for (let i = 0; i < coinType.length; i++) {
      const coin = coinType[i];
      if (this.collision(coin)) {
        // console.log(`A coin was removed`);
        coinType.splice(i, 1);
        if (coinType === coins) this.score += 10;
        if (coinType === superCoins) {
          this.score += 50;
          this.retroMode();
        }
      }
      // console.log(`The score is now ${this.score}`);
      keepScore.innerHTML = this.score;
    }
  }

  eatFruit(fruit) {
    if (this.collision(fruit)) {
      this.score += fruit.value;
      fruitOnBoard = null;
    }
  }

  hitWall(x, y) {
    const getImgData = ctx.getImageData(x, y, 15, 15);
    let didHitWall = false;
    for (let i = 0; i < 4 * 15 * 15; i += 4) {
      if (getImgData.data[i + 2] > 200 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100) {
        console.log("Player hit the wall");
        didHitWall = true;
      }
    }
    return didHitWall;
  }

  hitGhost() {
    for (let i = 0; i < ghostsOnBoard.length; i++) {
      const ghost = ghostsOnBoard[i];
      if (this.collision(ghost)) {
        if (!retroMode) {
          console.log("Player has hit a ghost");
          this.loseLife();
          this.resetPlayer();
        } else {
          console.log("retro active");
          this.score += 200;
          ghost.resetGhost(ghost);
        }
        return true;
      }
    }
  }

  resetPlayer() {
    this.x = startingPosX;
    this.y = startingPosY;
    this.speed = 0;
    this.direction = "E";
  }

  retroMode() {
    console.log("starting retro mode");
    retroMode = true;
    setTimeout(_ => {
      console.log("turning ghosts back to normal");
      retroMode = false;
    }, 10000);
  }

  loseLife() {
    if (this.life > 0) {
      if (this.life === 3) heart3.parentNode.removeChild(heart3);
      if (this.life === 2) heart2.parentNode.removeChild(heart2);
      if (this.life === 1) heart1.parentNode.removeChild(heart1);
      this.life--;
    }
    if (this.life <= 0) this.gameOver();
    console.log(`Player has ${this.life} lives remaining`);
  }

  gameOver() {
    setTimeout(_ => {
      if (this.life <= 0 || (!coins.length && !superCoins.length)) {
        gameContainer.style.display = "none";
        endScreen.style.display = "flex";
        return this.score;
      }
    }, 3000);
  }
}
const players = [];
const player = new Player(startingPosX, startingPosY);
players.push(player);
player.drawPlayer();
// const currentName = document.getElementById("player-name");
// const currentPlayer = players.find(player => player.name === currentName);

window.addEventListener("keydown", e => player.movePlayer(e), true);

const highScoreList = [{ name: player.name, score: player.gameOver() }];
const scoreList = document.getElementById("score-list");
highScoreList.forEach(entry => {
  const scoreEntry = document.createElement("li");
  scoreEntry.innerHTML = `${entry.name}, ${entry.score}`;
  scoreList.appendChild(scoreEntry);
});
// window.addEventListener(
//   "keydown",
//   e => {
//     player.movePlayer(e);
//     if (player.speed < 16) {
//       player.speed += 2;
//     }
//   },
//   true
// );
// window.addEventListener("keyup", e => (player.speed = 10), true);
