ctx = document.querySelector("canvas").getContext("2d");

const ghostImg = new Image();
const retroGhostImg = new Image();

const ghostWidth = 35;
const ghostHeight = 40;

const direction = ["N", "E", "S", "W"];

let possiblePaths = [];

const distanceFormula = (x1, x2, y1, y2) => {
  const resultX = Math.pow(x2 - x1, 2);
  const resultY = Math.pow(y2 - y1, 2);
  return Math.sqrt(resultX + resultY);
};

const getRandomDirection = _ => direction[Math.floor(Math.random() * direction.length)];

const options = gameOptions[gameState.mode];

class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 40;
    this.speed = options.ghostSpeed;
    this.direction = "N";
    this.retroMode = this.retroMode();
  }

  drawGhost() {
    ghostImg.src = "./images/ghost1.png";
    retroGhostImg.src = "./images/retroghost3.png";
    if (retroMode) {
      console.log("drawing retro ghosts");
      ctx.drawImage(retroGhostImg, this.x, this.y, ghostWidth, ghostHeight);
    } else ctx.drawImage(ghostImg, this.x, this.y, ghostWidth, ghostHeight);
  }

  moveGhost() {
    if (this.hitWall(this.x, this.y)) {
      this.resetSpeed();
      this.direction = getRandomDirection();
      this.speed = 1;
    }
    switch (this.direction) {
      case "N":
        this.moveGhostUp();
        break;
      case "E":
        this.moveGhostRight();
        break;
      case "S":
        this.moveGhostDown();
        break;
      case "W":
        this.moveGhostLeft();
        break;
    }
  }

  moveGhostUp() {
    if (!this.hitWall(this.x, this.y - this.speed)) this.y -= this.speed;
    else this.direction = getRandomDirection() || this.chooseDirection();
  }

  moveGhostDown() {
    if (!this.hitWall(this.x, this.y + ghostHeight)) this.y += this.speed;
    else this.direction = getRandomDirection() || this.chooseDirection();
  }

  moveGhostLeft() {
    if (!this.hitWall(this.x, this.y - this.speed)) this.y -= this.speed;
    else this.direction = getRandomDirection() || this.chooseDirection();
  }

  moveGhostRight() {
    if (!this.hitWall(this.x + ghostWidth, this.y)) this.x += this.speed;
    else this.direction = getRandomDirection() || this.chooseDirection();
  }

  hitWall(x, y) {
    const getImgData = ctx.getImageData(x, y, 15, 15);
    let didHitWall = false;
    for (let i = 0; i < 4 * 15 * 15; i += 4) {
      const collision = getImgData.data[i + 2] > 200 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100;
      if (collision) didHitWall = true;
    }
    return didHitWall;
  }

  resetSpeed() {
    this.speed = 0;
  }

  outOfBounds() {
    if (this.x < 0 || this.x + ghostWidth > boardWidth || this.y < 0 || this.y + ghostHeight > boardHeight) {
      // console.log("Out of bounds");
    }
  }

  chooseDirection() {
    const north = { x: this.x, y: this.y - 100 };
    const east = { x: this.x + 100, y: this.y };
    const south = { x: this.x, y: this.y + 100 };
    const west = { x: this.x - 100, y: this.y };
    possiblePaths.push(north, east, south, west);
    for (let i = 0; i < possiblePaths.length; i++) {
      const checkCollision = possiblePaths[i];
      if (this.hitWall(checkCollision.x, checkCollision.y)) possiblePaths[i] = 0;
    }
    console.log(possiblePaths);
    const distanceToPlayer = possiblePaths.map(path => distanceFormula(path.x, player.x, path.y, player.y));
    // console.log(distanceToPlayer);
    const shortestDistance = distanceToPlayer.reduce((x, y) => (x > y ? y : x));
    const getIndex = distanceToPlayer.indexOf(shortestDistance);
    if (getIndex === 0) return "N";
    if (getIndex === 1) return "E";
    if (getIndex === 2) return "S";
    if (getIndex === 3) return "W";
  }

  resetGhost(ghost) {
    ghost.x = 480;
    ghost.y = 350;
  }

  retroMode() {
    if (
      this.x + ghostWidth >= player.x &&
      this.x <= player.x + playerWidth &&
      this.y + ghostHeight >= player.y &&
      this.y <= player.y + playerHeight
    ) {
      this.resetGhost();
      return true;
    }
  }
}

let ghostsOnBoard = [];
// for (let i = 0; i < options.numberOfGhost; i++) ghostsOnBoard.push(new Ghost(xxxx))
ghostsOnBoard.push(new Ghost(430, 350), new Ghost(480, 350), new Ghost(530, 350));
ghostsOnBoard.forEach(ghost => ghost.drawGhost());

// ghostsOnBoard[0].chooseDirection();
