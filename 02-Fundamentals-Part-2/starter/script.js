"use strict";

function logger() {
  console.log("My name is Justin");
}

// Calling, running, or invoking the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  return `Juice with ${apples} apples and ${oranges} oranges.`;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
