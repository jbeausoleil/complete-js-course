'use strict';
//
// const bookings = [];
//
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // es5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
//
// createBooking('LH123');
// createBooking('LH123', 8);
//
// const flight = 'LH234';
// const justin = {
//   name: 'Justin Beausoleil',
//   passport: 24739429284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;
//
//   if (passenger.passport === 24739429284) {
//     alert('Check In');
//   } else {
//     alert('Wrong Passport');
//   }
// };

// checkIn(flight, justin);
// console.log(flight);
// console.log(justin);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };
//
// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
//
// // Higher Order Function
// const transformer = function (str, fn) {
//   console.log(`Original String: ${str}`)
//   console.log(`Transformed String: ${fn(str)}`)
//
//   console.log(`Transformed by: ${fn.name}`)
// };
//
// transformer('Javascript is the best!', upperFirstWord);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
//
// const greeterHey = greet('Hey');
// greeterHey('Justin');
// greeterHey('Stephen');
//
// greet('Hey')('Justin');

// const greet = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`)
//   }
// }
//
// const greeterHey = greet('Hey');
// greeterHey('Justin');
// greeterHey('Stephen');
//
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a flight on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Justin Beausoleil');
// lufthansa.book(635, 'Aimee Leclair');
// console.log(bookings);
//
// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };
//
// const book = lufthansa.book;

// Call method
// book(23, 'Sarah Williams') // Does not work
// Need .call because this references the window object not the eurowings object
// book.call(eurowings, 23, 'Sarah Williams'); // First argument is what 'this' should reference
// console.log(eurowings);
//
// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(eurowings, flightData);
// // OR
// book.call(eurowings, ...flightData); // To spread the array
//
// // Bind method
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// bookEW(23, 'Maya Beausoleil');
//
// const bookEW23 = book.bind(eurowings, 23); // More specific bind of 'this'
// bookEW23('Justin Beausoleil');
// bookEW23('Zoey Beausoleil');
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
//
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // eventListeners have 'this' attached to the element on which the handler is attached to
//
// // Partial Application
// const addTax = (rate, value) => {
//   return value + value * rate;
// };
//
// const addVat = addTax.bind(null, 0.23); // preset the rate to a specific
// console.log(addVat(100));
//
// const addTaxRate = rate => {
//   // Define rate first to 'preset'
//   return value => {
//     console.log(value + value * rate);
//   };
// };
//
// const addVat2 = addTaxRate(0.23);
// addVat2(100);

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);
    // Register new answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      answer >= 0 &&
      this.answers[answer]++;
    console.log(this.answers);
  }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))