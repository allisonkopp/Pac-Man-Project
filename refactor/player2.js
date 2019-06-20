// const playerWidth = 28;
// const playerHeight = 28;
// const startingPosX = 495;
// const startingPosY = 585;

// const playerImages = {
//   right: { direction: "E", img: "./images/pacman-right.png" },
//   up: { direction: "N", img: "./images/pacman-up.png" },
//   left: { direction: "W", img: "./images/pacman-left.png" },
//   down: { direction: "S", img: "./images/pacman-down.png" }
// };

// class Player extends Character {
//   constructor(x, y, width, height, img) {
//     super(x, y, width, height, img);
//     this.img.src = playerImages.img;
//     this.direction = "E";
//     this.speed = 2;
//     this.movement = String();
//     this.interval = null;
//     this.score = 0;
//     this.life = 3;
//     this.name = document.getElementById("player-name");
//   }

//   // drawObject(playerDirection) {
//   //   super.drawObject();
//   // }

//   startInterval() {
//     if (!this.interval) this.interval = setInterval(_ => this.tick(), 9);
//   }

//   clearInterval() {
//     clearInterval(this.interval);
//     this.interval = null;
//   }

//   tick() {
//     this.movePlayer(this.movement);
//   }

//   moveDirection(command) {
//     super.moveDirection();
//     !this.hitWall(movement.x, movement.y) ? startInterval() : clearInterval();
//   }

//   movePlayer(e = {}) {
//     this.speed = 2;
//     const _e = e.key || e;
//     this.movement = _e;
//     switch (_e) {
//       case "a":
//         this.moveDirection(left);
//         if (this.x < 0) this.x = 790;
//         break;
//       case "d":
//         this.moveDirection(right);
//         if (this.x > boardWidth) this.x = 10;
//         break;
//       case "w":
//         this.moveDirection(up);
//         break;
//       case "s":
//         this.moveDirection(down);
//         break;
//     }
//   }

//   getScore() {
//     return this.score;
//   }
// }

// const player = new Player(startingPosX, startingPosY, playerWidth, playerHeight);
// console.log(player);
