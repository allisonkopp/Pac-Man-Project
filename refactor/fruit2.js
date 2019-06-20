// const fruitWidth = 30;
// const fruitHeight = 30;

// let fruitOnBoard;

// const fruitLocations = [
//   { x: 60, y: 80 },
//   { x: 225, y: 80 },
//   { x: 430, y: 80 },
//   { x: 540, y: 80 },
//   { x: 745, y: 80 },
//   { x: 910, y: 80 },
//   { x: 60, y: 175 },
//   { x: 225, y: 175 },
//   { x: 335, y: 175 },
//   { x: 645, y: 175 },
//   { x: 745, y: 175 },
//   { x: 910, y: 175 },
//   { x: 225, y: 250 },
//   { x: 430, y: 250 },
//   { x: 540, y: 250 },
//   { x: 745, y: 250 },
//   { x: 225, y: 550 },
//   { x: 430, y: 550 },
//   { x: 540, y: 550 },
//   { x: 745, y: 550 },
//   { x: 910, y: 550 },
//   { x: 125, y: 625 },
//   { x: 225, y: 625 },
//   { x: 745, y: 625 },
//   { x: 850, y: 625 }
// ];

// const imageArray = [
//   { img: "./images/strawberry.png", points: 120, type: "strawberry" },
//   { img: "./images/orange.png", points: 60, type: "orange" },
//   { img: "./images/cherry.png", points: 150, type: "cherry" }
// ];

// class Fruit extends Item {
//   constructor(x, y, width, height, img) {
//     super(x, y, width, height, img);
//     const currentFruit = imageArray[Math.floor(Math.random() * imageArray.length)];
//     this.img.src = currentFruit.img;
//     this.type = currentFruit.type;
//     this.value = currentFruit.points;
//   }
// }

// const createFruit = _ => {
//   const getRandomLocation = _ => Math.floor(Math.random() * fruitLocations.length);
//   const fruitLocation = getRandomLocation();
//   const fruit = new Fruit(fruitLocations[fruitLocation].x, fruitLocations[fruitLocation].y, fruitWidth, fruitHeight);
//   Math.floor(Math.random() * 2) === 1 ? (fruitOnBoard = fruit) : fruitOnBoard;
// };

// setInterval(_ => createFruit(), 3000);
