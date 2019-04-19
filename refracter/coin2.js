// const coins = [];
// const superCoins = [];

// class Coin extends Item {
//   constructor(x, y, width, height) {
//     super(x, y, width, height);
//   }

//   drawCoin(r) {
//     ctx.beginPath();
//     ctx.fillStyle = "white";
//     ctx.arc(this.x, this.y, r, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// const generateCoins = (startValue, condition, y, r) => {
//   for (let i = startValue; i < condition; i += 35) {
//     const newCoin = new Coin(i, y);
//     newCoin.drawCoin(r);
//     r === 6 ? coins.push(newCoin) : superCoins.push(newCoin);
//   }
// };

// const generateCoin = (x, y, r) => {
//   const newCoin = new Coin(x, y);
//   newCoin.drawCoin(r);
//   r === 6 ? coins.push(newCoin) : superCoins.push(newCoin);
// };

// //First row
// generateCoin(75, 50, 10);
// generateCoins(125, 450, 50, 6);
// generateCoins(545, 965, 50, 6);
// generateCoin(935, 50, 10);

// //Second row
// generateCoins(90, 965, 150, 6);

// //Third row
// generateCoins(90, 250, 225, 6);
// generateCoins(335, 475, 225, 6);
// generateCoins(545, 685, 225, 6);
// generateCoins(755, 965, 225, 6);

// //Fourth row
// generateCoins(335, 685, 300, 6);
// generateCoin(230, 300, 6);
// generateCoin(755, 300, 6);

// //Fifth row
// generateCoins(55, 370, 375, 6);
// generateCoins(650, 1000, 375, 6);

// //Sixth row
// generateCoins(335, 685, 450, 6);
// generateCoin(230, 450, 6);
// generateCoin(755, 450, 6);

// //Seventh row
// generateCoins(90, 475, 525, 6);
// generateCoins(545, 965, 525, 6);

// //Eighth row
// generateCoins(90, 160, 600, 6);
// generateCoins(230, 770, 600, 6);
// generateCoins(860, 965, 600, 6);

// //Ninth row
// generateCoins(90, 265, 675, 6);
// generateCoins(335, 475, 675, 6);
// generateCoins(545, 685, 675, 6);
// generateCoins(755, 965, 675, 6);

// //Tenth row
// generateCoin(75, 750, 10);
// generateCoins(125, 930, 750, 6);
// generateCoin(935, 750, 10);

// console.log(coins);
// console.log(superCoins);
