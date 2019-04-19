const gameBoard = document.querySelector("canvas");
const ctx = gameBoard.getContext("2d");
const boardHeight = 800;
const boardWidth = 1000;

class World {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = "./images/maze.gif";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

  moveUp() {
    if (!this.hitWall(this.x, this.y - this.speed)) this.y -= this.speed;
  }

  moveDown() {
    if (!this.hitWall(this.x, this.y + this.height)) this.y += this.speed;
  }

  moveLeft() {
    if (!this.hitWall(this.x - this.speed, this.y)) this.x -= this.speed;
  }

  moveRight() {
    if (!this.hitWall(this.x + this.width, this.y)) this.x += this.speed;
  }

  hitWall(x, y) {
    const getImgData = ctx.getImageData(x, y, 15, 15);
    for (let i = 0; i < 4 * 15 * 15; i += 4) {
      return getImgData.data[i + 2] > 200 && getImgData.data[i] < 100 && getImgData.data[i + 1] < 100 ? true : false;
    }
  }
}

const board = new World(0, 0, boardWidth, boardHeight);

const drawGameBoard = _ => {
  board.draw();
};
