const titleScreen = document.getElementById("title-screen");
const gameContainer = document.getElementById("game-container");
const endScreen = document.getElementById("end-screen");
const highScoreScreen = document.getElementById("high-score-list");
const startBtn = document.getElementById("start-btn");

const startGame = _ => {
  titleScreen.style.display = "none";
  gameContainer.style.display = "inline-block";
  updateGameBoard();
  window.addEventListener("keydown", e => player.movePlayer(e), true);
};

// const getHighScores = _ => {
//   titleScreen.style.display = "none";
//   endScreen.style.display = "none";
//   highScoreScreen.style.display = "flex";
// };

const clearGameBoard = _ => ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

const redrawGameBoard = _ => {
  drawGameBoard();
  player.draw();
  coins.forEach(coin => coin.drawCoin(6));
  superCoins.forEach(coin => coin.drawCoin(10));
  if (fruitOnBoard) fruitOnBoard.draw();
  ghostsOnBoard.forEach(ghost => ghost.draw());
  ghostsOnBoard.forEach(ghost => ghost.moveGhost());
};

const updateGameBoard = _ => {
  window.requestAnimationFrame(updateGameBoard);
  clearGameBoard();
  redrawGameBoard();
};

startBtn.addEventListener("click", startGame);

const replayGame = _ => {
  endScreen.style.display = "none";
  gameContainer.style.display = "inline-block";
  updateGameBoard();
};

const backToTitle = _ => {
  endScreen.style.display = "none";
  titleScreen.style.display = "flex";
  clearGameBoard();
  redrawGameBoard();
};

// const newPlayer = _ => {
//   endScreen.style.display = "none";
//   titleScreen.style.display = "flex";
//   document.getElementById("player-name").value = "";
//   clearGameBoard();
//   redrawGameBoard();
// };
