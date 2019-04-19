const ghostImg = new Image();
const retroGhostImg = new Image();

const ghostWidth = 30;
const ghostHeight = 35;

const direction = ["N", "E", "S", "W"];

let possiblePaths = [];

const distanceFormula = (x1, x2, y1, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const infinity = Math.pow(10, 1000);

const getRandomDirection = _ => direction[Math.floor(Math.random() * direction.length)];

// const options = gameOptions[gameState.mode];

class Ghost extends World {
  constructor(x, y, width, height, img) {
    super(x, y, width, height, img);
    this.width = ghostWidth;
    this.height = ghostHeight;
    // this.img = new Image();
    // this.speed = options.ghostSpeed;
    this.speed = 1;
    this.direction = "N";
    this.retroMode = this.retroMode();
  }

  draw() {
    ghostImg.src = "./images/ghost1.png";
    retroGhostImg.src = "./images/retroghost3.png";
    retroMode
      ? ctx.drawImage(retroGhostImg, this.x, this.y, ghostWidth, ghostHeight)
      : ctx.drawImage(ghostImg, this.x, this.y, ghostWidth, ghostHeight);
  }

  // drawGhost() {
  //   ghostImg.src = "./images/ghost1.png";
  //   retroGhostImg.src = "./images/retroghost3.png";
  //   retroMode
  //     ? ctx.drawImage(retroGhostImg, this.x, this.y, ghostWidth, ghostHeight)
  //     : ctx.drawImage(ghostImg, this.x, this.y, ghostWidth, ghostHeight);
  // }

  moveGhost() {
    if (this.hitWall(this.x, this.y)) {
      // this.resetSpeed();
      this.direction = getRandomDirection();
      // this.speed = 1;
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
    // else this.direction = getRandomDirection() || this.chooseDirection();
    // else this.direction = this.chooseDirection() || getRandomDirection();
    else this.direction = getRandomDirection();
  }

  moveGhostDown() {
    if (!this.hitWall(this.x, this.y + ghostHeight)) this.y += this.speed;
    // else this.direction = getRandomDirection() || this.chooseDirection();
    // else this.direction = this.chooseDirection() || getRandomDirection();
    else this.direction = getRandomDirection();
  }

  moveGhostLeft() {
    if (!this.hitWall(this.x, this.y - this.speed)) this.y -= this.speed;
    // else this.direction = getRandomDirection() || this.chooseDirection();
    // else this.direction = this.chooseDirection() || getRandomDirection();
    else this.direction = getRandomDirection();
  }

  moveGhostRight() {
    if (!this.hitWall(this.x + ghostWidth, this.y)) this.x += this.speed;
    // else this.direction = getRandomDirection() || this.chooseDirection();
    // else this.direction = this.chooseDirection() || getRandomDirection()
    else this.direction = getRandomDirection();
  }

  hitWall(x, y) {
    const getImgData = ctx.getImageData(x, y, 15, 15);
    let didHitWall = false;
    for (let i = 0; i < 4 * 15 * 15; i += 4) {
      const collision = getImgData.data[i + 2] > 220 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100;
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
    let possiblePaths = [
      { direction: "N", x: this.x, y: this.y - 100 },
      { direction: "E", x: this.x + 100, y: this.y },
      { direction: "S", x: this.x, y: this.y + 100 },
      { direction: "W", x: this.x - 100, y: this.y }
    ];
    // const north = { x: this.x, y: this.y - 100 };
    // const east = { x: this.x + 100, y: this.y };
    // const south = { x: this.x, y: this.y + 100 };
    // const west = { x: this.x - 100, y: this.y };
    // possiblePaths.push(north, east, south, west);
    for (let i = 0; i < possiblePaths.length; i++) {
      const checkCollision = possiblePaths[i];
      if (this.hitWall(checkCollision.x, checkCollision.y)) possiblePaths[i] = infinity;
    }
    console.log(possiblePaths);
    // const distanceToPlayer = possiblePaths.map(path => distanceFormula(path.x, player.x, path.y, player.y));
    possiblePaths = possiblePaths.map(path => distanceFormula(path.x, player.x, path.y, player.y));
    console.log(possiblePaths);
    const shortestDistance = possiblePaths.reduce((x, y) => (x > y ? y : x));
    console.log(shortestDistance);
    const getIndex = possiblePaths.indexOf(shortestDistance);
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
    if (this.collision(player)) {
      // this.x + ghostWidth >= player.x &&
      // this.x <= player.x + playerWidth &&
      // this.y + ghostHeight >= player.y &&
      // this.y <= player.y + playerHeight
      this.resetGhost();
      return true;
    }
  }
}

let ghostsOnBoard = [];
// for (let i = 0; i < options.numberOfGhost; i++) ghostsOnBoard.push(new Ghost(xxxx))
ghostsOnBoard.push(new Ghost(430, 350), new Ghost(480, 350), new Ghost(530, 350));

// ghostsOnBoard.forEach(ghost => ghost.draw());

// ghostsOnBoard[0].chooseDirection();
