ctx = document.querySelector("canvas").getContext("2d");

class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 6;
    this.width = 6;
  }
  drawCoin(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
  drawSuperCoin(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

let coins = [];
let superCoins = [];

//First Row
for (let i = 125; i < 450; i += 35) coins.push(new Coin(i, 50));
for (let i = 545; i < 965; i += 35) coins.push(new Coin(i, 50));

//Second Row
for (let i = 90; i < 965; i += 35) coins.push(new Coin(i, 150));

//Third Row
for (let i = 90; i < 250; i += 35) coins.push(new Coin(i, 225));
for (let i = 335; i < 475; i += 35) coins.push(new Coin(i, 225));
for (let i = 545; i < 685; i += 35) coins.push(new Coin(i, 225));
for (let i = 755; i < 965; i += 35) coins.push(new Coin(i, 225));

//Fourth Row
for (let i = 335; i < 685; i += 35) coins.push(new Coin(i, 300));
coins.push(new Coin(230, 300));
coins.push(new Coin(755, 300));

//Fifth Row
for (let i = 55; i < 370; i += 35) coins.push(new Coin(i, 375));
for (let i = 650; i < 1000; i += 35) coins.push(new Coin(i, 375));

//Sixth Row
for (let i = 335; i < 685; i += 35) coins.push(new Coin(i, 450));
coins.push(new Coin(230, 450));
coins.push(new Coin(755, 450));

//Seventh Row
for (let i = 90; i < 475; i += 35) coins.push(new Coin(i, 525));
for (let i = 545; i < 965; i += 35) coins.push(new Coin(i, 525));

//Eighth Row
for (let i = 90; i < 160; i += 35) coins.push(new Coin(i, 600));
for (let i = 230; i < 770; i += 35) coins.push(new Coin(i, 600));
for (let i = 860; i < 965; i += 35) coins.push(new Coin(i, 600)); //off?

//Nineth Row
for (let i = 90; i < 265; i += 35) coins.push(new Coin(i, 675));
for (let i = 335; i < 475; i += 35) coins.push(new Coin(i, 675));
for (let i = 545; i < 685; i += 35) coins.push(new Coin(i, 675));
for (let i = 755; i < 965; i += 35) coins.push(new Coin(i, 675));

//Tenth Row
for (let i = 125; i < 930; i += 35) coins.push(new Coin(i, 750));

coins.forEach(coin => coin.drawCoin());

superCoins.push(new Coin(75, 50), new Coin(75, 750), new Coin(935, 50), new Coin(935, 750));
superCoins.forEach(coin => coin.drawSuperCoin());
