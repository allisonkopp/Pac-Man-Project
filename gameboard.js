let gameBoard = document.querySelector("canvas");
let ctx = gameBoard.getContext("2d");

const boardHeight = 800;
const boardWidth = 1000;

const mazeImg = new Image();

const drawGameBoard = _ => {
  mazeImg.src = "./images/maze.gif";
  ctx.drawImage(mazeImg, 0, 0, boardWidth, boardHeight);
};
drawGameBoard();

const gameOptions = {
  easyMode: {
    ghostSpeed: 1,
    numberOfGhost: 3
  },
  mediumMode: {
    ghostSpeed: 2,
    numberOfGhost: 5
  },
  hardMode: {
    ghostSpeed: 3,
    numberOfGhost: 7
  }
};

const gameState = {
  mode: "easyMode"
};

const fruitLocations = [
  { x: 60, y: 80 },
  { x: 225, y: 80 },
  { x: 430, y: 80 },
  { x: 540, y: 80 },
  { x: 745, y: 80 },
  { x: 910, y: 80 },
  { x: 60, y: 175 },
  { x: 225, y: 175 },
  { x: 335, y: 175 },
  { x: 645, y: 175 },
  { x: 745, y: 175 },
  { x: 910, y: 175 }
];

let fruitOnBoard;

const fruitWidth = 30;
const fruitHeight = 30;
const imageArray = [
  { img: "./images/strawberry.png", points: 120, type: "strawberry" },
  { img: "./images/orange.png", points: 60, type: "orange" },
  { img: "./images/cherry.png", points: 150, type: "cherry" }
];

class Fruit {
  constructor(x, y) {
    // this.imageArray = ["./images/strawberry.png", "./images/orange.png", "./images/cherry.png"];
    const currentFruit = imageArray[Math.floor(Math.random() * imageArray.length)];
    this.img = new Image();
    this.img.src = currentFruit.img;
    this.type = currentFruit.type;
    this.value = currentFruit.points;
    this.x = x;
    this.y = y;
    this.width = fruitWidth;
    this.height = fruitHeight;
  }

  drawFruit() {
    // strawberryImg.src = "./images/strawberry.png";
    // orangeImg.src = "./images/orange.png";
    // cherryImg.src = "./images/cherry.png";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// let fruitImages = [];
// fruitImages.push(strawberryImg, orangeImg, cherryImg);
// const getRandomImg = _ => fruitImages[Math.floor(Math.random() * fruitImages.length)];

const createFruit = _ => {
  const getRandomLocation = _ => Math.floor(Math.random() * fruitLocations.length);
  let fruitLocation = getRandomLocation();
  let fruit = new Fruit(fruitLocations[fruitLocation].x, fruitLocations[fruitLocation].y);
  Math.floor(Math.random() * 2) === 1 ? (fruitOnBoard = fruit) : fruitOnBoard;
};

setInterval(_ => createFruit(), 3000);
