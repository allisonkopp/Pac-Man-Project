// const ghostWidth = 30;
// const ghostHeight = 35;

// let ghostsOnBoard = [];

// // const options = gameOptions[gameState.mode];

// class Ghost extends Character {
//   constructor(x, y, width, height, img) {
//     super(x, y, width, height, img);
//     this.img.src = "./images/ghost1.png";
//     this.direction = "N";
//     // this.speed = options.ghostSpeed;
//     this.speed = 10;
//     // this.retroMode = this.retroMode();
//   }

//   moveDirection(command) {
//     super.moveDirection(command);
//     const getRandomDirection = _ => movement.direction[Math.floor(Math.random() * movement.length)];
//     if (this.hitWall(movement.x, movement.y)) this.direction = getRandomDirection();
//   }

//   moveGhost() {
//     switch (this.direction) {
//       case "N":
//         this.moveDirection(up);
//         break;
//       case "E":
//         this.moveDirection(right);
//         break;
//       case "S":
//         this.moveDirection(down);
//         break;
//       case "W":
//         this.moveDirection(left);
//         break;
//     }
//     console.log("ghost is moving");
//   }
// }

// // for (let i = 0; i < options.numberOfGhost; i++) ghostsOnBoard.push(new Ghost(xxxx))

// ghostsOnBoard.push(
//   new Ghost(430, 350, ghostWidth, ghostHeight),
//   new Ghost(480, 350, ghostWidth, ghostHeight),
//   new Ghost(530, 350, ghostWidth, ghostHeight)
// );
// ghostsOnBoard.forEach(ghost => ghost.drawObject());
// console.log(ghostsOnBoard);
