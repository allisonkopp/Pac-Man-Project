const ghostImg = new Image();
const retroGhostImg = new Image();
const ghostWidth = 30;
const ghostHeight = 35;
const direction = ["N", "E", "S", "W"];

const getRandomDirection = _ => direction[Math.floor(Math.random() * direction.length)];

// let possiblePaths = [];

// const distanceFormula = (x1, x2, y1, y2) => {
//   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
// };

// const infinity = Math.pow(10, 1000);

// const options = gameOptions[gameState.mode];

class Ghost extends World {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);
    this.width = ghostWidth;
    this.height = ghostHeight;
    // this.speed = options.ghostSpeed;
    this.speed = 1;
    this.direction = "N";
    this.retroMode = this.retroMode();
  }

  draw() {
    ghostImg.src = "./images/ghost1.png";
    retroGhostImg.src = "./images/retroghost3.png";
    retroMode
      ? ctx.drawImage(retroGhostImg, this.x, this.y, this.width, this.height)
      : ctx.drawImage(ghostImg, this.x, this.y, this.width, this.height);
  }

  moveGhost() {
    if (this.hitWall(this.x, this.y)) this.direction = getRandomDirection();
    switch (this.direction) {
      case "N":
        this.moveUp();
        break;
      case "E":
        this.moveRight();
        break;
      case "S":
        this.moveDown();
        break;
      case "W":
        this.moveLeft();
        break;
    }
  }

  moveUp() {
    super.moveUp();
    if (!this.hitWall(this.x, this.y - this.speed)) this.direction = getRandomDirection();
  }

  moveDown() {
    super.moveDown();
    if (!this.hitWall(this.x, this.y + this.height)) this.direction = getRandomDirection();
  }

  moveLeft() {
    super.moveLeft();
    if (!this.hitWall(this.x - this.speed, this.y)) this.direction = getRandomDirection();
  }

  moveRight() {
    super.moveRight();
    if (!this.hitWall(this.x + this.width, this.y)) this.direction = getRandomDirection();
  }

  outOfBounds() {
    return this.x < 0 || this.x + ghostWidth > boardWidth || this.y < 0 || this.y + ghostHeight > boardHeight;
  }

  // chooseDirection() {
  //   let possiblePaths = [
  //     { direction: "N", x: this.x, y: this.y - 100 },
  //     { direction: "E", x: this.x + 100, y: this.y },
  //     { direction: "S", x: this.x, y: this.y + 100 },
  //     { direction: "W", x: this.x - 100, y: this.y }
  //   ];
  //   for (let i = 0; i < possiblePaths.length; i++) {
  //     const checkCollision = possiblePaths[i];
  //     if (this.hitWall(checkCollision.x, checkCollision.y)) possiblePaths[i] = infinity;
  //   }
  //   possiblePaths = possiblePaths.map(path => distanceFormula(path.x, player.x, path.y, player.y));
  //   // console.log(possiblePaths);
  //   const shortestDistance = possiblePaths.reduce((x, y) => (x > y ? y : x));
  //   // console.log(shortestDistance);
  //   const getIndex = possiblePaths.indexOf(shortestDistance);
  //   if (getIndex === 0) return "N";
  //   if (getIndex === 1) return "E";
  //   if (getIndex === 2) return "S";
  //   if (getIndex === 3) return "W";
  // }

  resetGhost(ghost) {
    ghost.x = 480;
    ghost.y = 350;
  }

  retroMode() {
    if (this.collision(player)) {
      this.resetGhost();
      return true;
    }
  }
}

let ghostsOnBoard = [];
// for (let i = 0; i < options.numberOfGhost; i++) ghostsOnBoard.push(new Ghost(xxxx))
ghostsOnBoard.push(new Ghost(430, 350), new Ghost(480, 350), new Ghost(530, 350));
