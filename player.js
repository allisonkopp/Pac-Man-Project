// titleScreen = document.getElementById("title-screen");
// gameContainer = document.getElementById("game-container");
// endScreen = document.getElementById("end-screen");
// highScoreScreen = document.getElementById("high-score-list");

const playerUp = new Image();
const playerDown = new Image();
const playerLeft = new Image();
const playerRight = new Image();

const players = [];

const playerWidth = 28;
const playerHeight = 28;
const startingPosX = 495;
const startingPosY = 585;

let retroMode = false;

let lastTravelled = [];
let lastTravelledX = null;
let lastTravelledY = null;

const heart1 = document.getElementById("life-1");
const heart2 = document.getElementById("life-2");
const heart3 = document.getElementById("life-3");

const keepScore = document.getElementById("score");

class Player extends World {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);
    this.direction = "E";
    this.speed = 2;
    this.movement = String();
    this.interval = null;
    this.score = 0;
    this.life = 3;
    this.name = document.getElementById("player-name");
    this.retro = null;
  }
  // constructor(x, y) {
  //   this.x = x;
  //   this.y = y;
  //   this.height = 28;
  //   this.width = 28;
  //   this.direction = "E";
  //   this.speed = 2;
  //   this.movement = String();
  //   this.interval = null;
  //   this.score = 0;
  //   this.life = 3;
  //   this.name = document.getElementById("player-name");
  //   this.retro = null;
  // }

  getScore() {
    return this.score;
  }

  getName() {
    return this.name;
  }

  startInterval() {
    if (!this.interval) this.interval = setInterval(_ => this.tick(), 9);
  }

  tick() {
    this.movePlayer(this.movement);
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  draw() {
    playerRight.src = "./images/pacman-right.png";
    playerUp.src = "./images/pacman-up.png";
    playerLeft.src = "./images/pacman-left.png";
    playerDown.src = "./images/pacman-down.png";
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

  moveUp() {
    super.moveUp();
    this.direction = "N";
    !this.hitWall(this.x, this.y - this.speed) ? this.startInterval() : this.clearInterval();
  }

  moveDown() {
    super.moveDown();
    this.direction = "S";
    !this.hitWall(this.x, this.y + this.height) ? this.startInterval() : this.clearInterval();
  }

  moveLeft() {
    super.moveLeft();
    this.direction = "W";
    !this.hitWall(this.x - this.speed, this.y) ? this.startInterval() : this.clearInterval();
  }

  moveRight() {
    super.moveRight();
    this.direction = "E";
    !this.hitWall(this.x + this.width, this.y) ? this.startInterval() : this.clearInterval();
  }

  // moveDirection(command) {
  //   const movement = {
  //     up: { direction: "N", x: this.x, y: this.y - this.speed, action: _ => (this.y -= this.speed) },
  //     right: { direction: "E", x: this.x + this.width, y: this.y, action: _ => (this.x += this.speed) },
  //     down: { direction: "S", x: this.x, y: this.y + this.height, action: _ => (this.y += this.speed) },
  //     left: { direction: "W", x: this.x - this.speed, y: this.y, action: _ => (this.x -= this.speed) }
  //   }[command];
  //   console.log(movement["up"].direction);
  //   !this.hitWall(movement.x, movement.y) && movement.action ? startInterval() : clearInterval();
  // return movement;

  // movePlayerUp() {
  //   this.direction = "N";
  //   if (!this.hitWall(this.x, this.y - this.speed)) {
  //     this.y -= this.speed;
  //     this.startInterval();
  //   } else this.clearInterval();
  // }

  // moveDirection(command) {
  //   super.moveDirection(command);
  //   !this.hitWall(movement.x, movement.y) ? startInterval() : clearInterval();
  // }

  movePlayer(e = {}) {
    this.speed = 2;
    const _e = e.key || e;
    this.movement = _e;
    switch (_e) {
      case "a":
        this.moveLeft();
        if (this.x < 0) this.x = 790;
        break;
      case "d":
        this.moveRight();
        if (this.x > boardWidth) this.x = 10;
        break;
      case "w":
        this.moveUp();
        break;
      case "s":
        this.moveDown();
        break;
    }
    lastTravelled.push(`${this.x}, ${this.y}`);
    lastTravelledX = lastTravelled[lastTravelled.length - 1].split(",")[0];
    lastTravelledY = lastTravelled[lastTravelled.length - 1].split(",")[1];

    this.collectCoins(coins);
    this.collectCoins(superCoins);
    if (fruitOnBoard) this.eatFruit(fruitOnBoard);
    this.hitGhost();
    this.draw();
    keepScore.innerHTML = this.score;
  }

  // movePlayerUp() {
  //   this.direction = "N";
  //   if (!this.hitWall(this.x, this.y - this.speed)) {
  //     this.y -= this.speed;
  //     this.startInterval();
  //   } else this.clearInterval();
  // }

  // movePlayerDown() {
  //   this.direction = "S";
  //   if (!this.hitWall(this.x, this.y + playerHeight)) {
  //     this.y += this.speed;
  //     this.startInterval();
  //   } else this.clearInterval();
  // }

  // movePlayerRight() {
  //   this.direction = "E";
  //   // if (!this.hitWall(this.x + playerWidth, this.y)) {
  //   if (!this.hitWall(this.x + playerWidth, this.y)) {
  //     this.x += this.speed;
  //     this.startInterval();
  //   } else this.clearInterval();
  // }

  // movePlayerLeft() {
  //   this.direction = "W";
  //   if (!this.hitWall(this.x - this.speed, this.y)) {
  //     this.x -= this.speed;
  //     this.startInterval();
  //   } else this.clearInterval();
  // }

  // movePlayer(e = {}) {
  //   this.speed = 2;
  //   const _e = e.key || e;
  //   this.movement = _e;
  //   switch (_e) {
  //     case "a":
  //       // this.movement = _e;
  //       this.movePlayerLeft();
  //       // this.moveDirection(left);
  //       if (this.x < 0) this.x = 780;
  //       break;
  //     case "d":
  //       // this.movement = _e;
  //       this.movePlayerRight();
  //       // this.moveDirection(right);
  //       if (this.x > boardWidth) this.x = 20;
  //       break;
  //     case "w":
  //       // this.moveDirection(north);
  //       // this.movement = _e;
  //       this.movePlayerUp();
  //       break;
  //     case "s":
  //       // this.moveDirection(south);
  //       // this.movement = _e;
  //       this.movePlayerDown();
  //       break;
  //   }
  //   lastTravelled.push(`${this.x}, ${this.y}`);
  //   lastTravelledX = lastTravelled[lastTravelled.length - 1].split(",")[0];
  //   lastTravelledY = lastTravelled[lastTravelled.length - 1].split(",")[1];

  //   this.collectCoins(coins);
  //   this.collectCoins(superCoins);
  //   if (fruitOnBoard) this.eatFruit(fruitOnBoard);
  //   this.hitGhost();
  //   this.draw();
  //   keepScore.innerHTML = this.score;
  // }

  // collision(collidedObject) {
  //   return (
  //     collidedObject &&
  //     this.x + this.width >= collidedObject.x &&
  //     this.x <= collidedObject.x + collidedObject.width &&
  //     this.y + this.height >= collidedObject.y &&
  //     this.y <= collidedObject.y + collidedObject.height
  //   );
  // }

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
    }
  }

  // keepScore(item, value) {
  //   if (item) this.score += value;
  // }

  eatFruit(fruit) {
    if (this.collision(fruit)) {
      this.score += fruit.value;
      fruitOnBoard = null;
    }
  }

  // hitWall(x, y) {
  //   const getImgData = ctx.getImageData(x, y, 15, 15);
  //   for (let i = 0; i < 4 * 15 * 15; i += 4) {
  //     return getImgData.data[i + 2] > 200 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100 ? true : false;
  //     // return getImgData.data[i] < 100 && getImgData.data[i + 1] < 100 && getImgData.data[i + 2] > 200 ? true : false;
  //   }
  // }

  // hitWall(x, y) {
  //   const getImgData = ctx.getImageData(x, y, 15, 15);
  //   let didHitWall = false;
  //   for (let i = 0; i < 4 * 15 * 15; i += 4) {
  //     if (getImgData.data[i + 2] > 200 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100) {
  //       // console.log("Player hit the wall");
  //       didHitWall = true;
  //     }
  //   }
  //   return didHitWall;
  // }

  hitGhost() {
    for (let i = 0; i < ghostsOnBoard.length; i++) {
      const ghost = ghostsOnBoard[i];
      if (this.collision(ghost)) {
        if (!retroMode) {
          console.log("Player has hit a ghost");
          this.loseLife();
          this.resetPlayer();
        } else {
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
    if (this.life === 3) heart3.parentNode.removeChild(heart3);
    if (this.life === 2) heart2.parentNode.removeChild(heart2);
    if (this.life === 1) heart1.parentNode.removeChild(heart1);
    this.life--;
    if (this.life === 0) this.gameOver();
    console.log(`Player has ${this.life} lives remaining`);
  }

  gameOver() {
    // ctx.font = "100px Anton";
    // ctx.fillText("Game Over", 400, 350);
    // players.push({ name: this.getName(), score: this.getScore() });
    createScoreList();
    gameContainer.style.display = "none";
    endScreen.style.display = "flex";
    // setTimeout(_ => {
    //   gameContainer.style.display = "none";
    //   endScreen.style.display = "flex";
    // }, 1000);
  }
}

// const players = [];
const player = new Player(startingPosX, startingPosY, playerWidth, playerHeight);
const scoreList = document.getElementById("score-list");

const createScoreList = _ => {
  for (let i = 0; i < players.length; i++) {
    players.push({ name: player.getName(), score: player.getScore() });
    const scoreEntry = document.createElement("li");
    scoreEntry.innerHTML = `${players[i].name} + ${players[i].score}`;
    scoreList.appendChild(scoreEntry);
  }
};

const currentName = document.getElementById("player-name");
// players.push(currentName);
const currentPlayer = players.find(player => player.name === currentName);
// console.log(players);

// window.addEventListener("keydown", e => player.movePlayer(e), true);

// const scoreList = document.getElementById("score-list");
// const createScoreList = _ => {
//   players.forEach(entry => {
//     const scoreEntry = document.createElement("li");
//     scoreEntry.innerHTML = `${entry.name}, ${entry.score}`;
//     scoreList.appendChild(scoreEntry);
//   });
// };
// createScoreList();

// const highScoreList = [{ name: player.name, score: player.getScore() }];
// const scoreList = document.getElementById("score-list");
// highScoreList.forEach(entry => {
//   const scoreEntry = document.createElement("li");
//   scoreEntry.innerHTML = `${entry.name}, ${entry.score}`;
//   scoreList.appendChild(scoreEntry);
// });
