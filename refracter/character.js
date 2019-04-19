// // const getRandomDirection = _ => direction[Math.floor(Math.random() * direction.length)];

// class Character extends World {
//   constructor(x, y, width, height, img) {
//     super(x, y, width, height, img);

//     //this.retroMode = this.retroMode();
//     this.retro = null;
//   }

//   moveDirection(command) {
//     const movement = {
//       up: { direction: "N", x: this.x, y: this.y - this.speed, action: _ => (this.y -= this.speed) },
//       right: { direction: "E", x: this.x + this.width, y: this.y, action: _ => (this.x += this.speed) },
//       down: { direction: "S", x: this.x, y: this.y + this.height, action: _ => (this.y += this.speed) },
//       left: { direction: "W", x: this.x - this.speed, y: this.y, action: _ => (this.x -= this.speed) }
//     }[command];
//     !this.hitWall(movement.x, movement.y) && movement.action();
//   }

//   hitWall(x, y) {
//     const getImgData = ctx.getImageData(x, y, 15, 15);
//     for (let i = 0; i < 4 * 15 * 15; i += 4) {
//       return getImgData.data[i] < 100 && getImgData.data[i + 1] < 100 && getImgData.data[i + 2] > 200 ? true : false;
//     }
//   }

//   collision(collidedObject) {
//     return (
//       collidedObject &&
//       this.x + this.width >= collidedObject.x &&
//       this.x <= collidedObject.x + collidedObject.width &&
//       this.y + this.height >= collidedObject.y &&
//       this.y <= collidedObject.y + collidedObject.height
//     );
//   }
// }
