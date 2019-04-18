// let gameBoard = document.querySelector("canvas");
// let ctx = gameBoard.getContext("2d");

// const height = 800;
// const width = 1000;

// const mazeImg = new Image();

// const drawGameBoard = _ => {
//   mazeImg.src = "./images/maze.gif";
//   ctx.drawImage(mazeImg, 0, 0, 1000, 800);
// };
// drawGameBoard();

// class Coin {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   drawCoin(x, y) {
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill();
//   }
//   drawSuperCoin(x, y) {
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// let coins = [];
// let superCoins = [];

// //First Row
// for (let i = 125; i < 450; i += 35) {
//   const newCoin = new Coin(i, 50);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 545; i < 965; i += 35) {
//   const newCoin = new Coin(i, 50);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Second Row
// for (let i = 90; i < 965; i += 35) {
//   const newCoin = new Coin(i, 150);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Third Row
// for (let i = 90; i < 250; i += 35) {
//   const newCoin = new Coin(i, 225);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 335; i < 475; i += 35) {
//   const newCoin = new Coin(i, 225);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 545; i < 685; i += 35) {
//   const newCoin = new Coin(i, 225);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 755; i < 965; i += 35) {
//   const newCoin = new Coin(i, 225);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Fourth Row
// for (let i = 335; i < 685; i += 35) {
//   const newCoin = new Coin(i, 300);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// //Fifth Row
// for (let i = 55; i < 370; i += 35) {
//   const newCoin = new Coin(i, 375);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 650; i < 1000; i += 35) {
//   const newCoin = new Coin(i, 375);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Sixth Row
// for (let i = 335; i < 685; i += 35) {
//   const newCoin = new Coin(i, 450);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Seventh Row
// for (let i = 90; i < 475; i += 35) {
//   const newCoin = new Coin(i, 525);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 545; i < 965; i += 35) {
//   const newCoin = new Coin(i, 525);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Eighth Row
// for (let i = 90; i < 160; i += 35) {
//   const newCoin = new Coin(i, 600);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 230; i < 770; i += 35) {
//   const newCoin = new Coin(i, 600);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 860; i < 965; i += 35) {
//   const newCoin = new Coin(i, 600);
//   newCoin.drawCoin();
//   coins.push(newCoin); //off?
// }

// //Nineth Row
// for (let i = 90; i < 265; i += 35) {
//   const newCoin = new Coin(i, 675);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 335; i < 475; i += 35) {
//   const newCoin = new Coin(i, 675);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 545; i < 685; i += 35) {
//   const newCoin = new Coin(i, 675);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }
// for (let i = 755; i < 965; i += 35) {
//   const newCoin = new Coin(i, 675);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// //Tenth Row
// for (let i = 125; i < 930; i += 35) {
//   const newCoin = new Coin(i, 750);
//   newCoin.drawCoin();
//   coins.push(newCoin);
// }

// // coins.forEach(coin => coin.drawCoin());

// superCoins.push(new Coin(75, 50), new Coin(75, 750), new Coin(935, 50), new Coin(935, 750));
// superCoins.forEach(coin => coin.drawSuperCoin());

const titleScreen = document.getElementById("title-screen");
const gameContainer = document.getElementById("game-container");
const endScreen = document.getElementById("end-screen");

const startGame = _ => {
  titleScreen.style.display = "none";
  gameContainer.style.display = "inline-block";
};

const updateGameBoard = _ => {
  window.requestAnimationFrame(updateGameBoard);
  ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
  drawGameBoard();
  if (fruitOnBoard) fruitOnBoard.drawFruit();
  player.drawPlayer();
  ghostsOnBoard.forEach(ghost => ghost.drawGhost());
  ghostsOnBoard.forEach(ghost => ghost.moveGhost());
  coins.forEach(coin => coin.drawCoin());
  superCoins.forEach(coin => coin.drawSuperCoin());
};
updateGameBoard();

//fix this
const replayGame = _ => {
  endScreen.style.display = "none";
  gameContainer.style.display = "flex";
};

const newPlayer = _ => {
  endScreen.style.display = "none";
  titleScreen.style.display = "flex";
};
