'use strict';
/*
// ------------ Constructor Function ------------
// Arrow functions do not work for constructors
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create method inside of constructor function
  // Use prototype and prototype inheritance
  this.calcAge = function () {
    console.log(2037 - this.birthYear)
  }
};

const justin = new Person('justin', 1990);
console.log(justin)
justin.calcAge();

const myArray = new Array(5);
console.log(myArray)

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} linked to a Prototype
// 4. function automatically return {}
const jonas = new Person('Jonas', 1991); // Is instance of person
const matilda = new Person('Matilda', 2017);
console.log(jonas, matilda);
console.log(jonas instanceof Person);

console.log(jonas.__proto__);
console.log(Person.prototype);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // Object Prototype
console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 6, 7, 9]; // new Array === [];
console.log(arr.__proto__ === Array.prototype);
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
const h1 = document.querySelector('h1');
console.dir(h1)

// ------------ Challenge ------------
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${this.speed + 10} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${this.speed - 5} km/h`);
};

const dataCar1 = new Car('BMW', 120);
const dataCar2 = new Car('Mercedes', 95);

dataCar1.accelerate();
dataCar2.accelerate();

// ------------ es6 ------------
// Class Expression
// const PersonCL = class {};

// class Declaration
class PersonCl {
  constructor(fullName, birthYear) {
    // constructor is always required
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Will be on prototype and not class
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  // Set property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// 1. Classes are not hoisted
// 2. Classes are first-class citizens (pass into / return from functions)
// 3. Body of class are executed in strict mode
const walter = new PersonCl('Walter White', 1990);

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    // must have parameter
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

// Prototype
const PersonProto = {
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
  calcAge() {
    console.log(2037 - this.birthYear);
  },
};

const steven = Object.create(PersonProto); // Passing in prototype of object
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2002);

// ------------ Challenge ------------
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log(`${this.speed + 10} km/h`);
  }

  brake() {
    console.log(`${this.speed - 5} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);

// ------------ Class Inheritance: Constructor Functions ------------
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // specify this inside of function at time of call
  this.course = course;
};

// Linking prototypes - must be before all prototype calls
// Constructor will still be Person
Student.prototype = Object.create(Person.prototype); // now an object that inherits from Person.prototype

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science.');
console.log(mike);
mike.introduce();

Student.prototype.constructor = Student; // sets prototype of Student instances to prototype

// ------------ Challenge ------------
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${this.speed + 10} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${this.speed - 5} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge --;
  console.log(`${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}`)
}

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();

// ------------ Class Inheritance: Constructor Functions ------------
class PersonCl {
  constructor(fullName, birthYear) {
    // constructor is always required
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Will be on prototype and not class
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  // Set property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
}

// ------------ Class Inheritance: ES6 ------------
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// ------------ Class Inheritance: Object.create ------------
const PersonProto = {
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
  calcAge() {
    console.log(2037 - this.birthYear);
  },
};

const steven = Object.create(PersonProto); // Passing in prototype of object

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
*/

// Public fields
// Private fields
// Public methods
// Private methods

class Account {
  // Public fields (not on prototype but on instance)
  local = navigator.language;

  // Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // Public interface (Public methods)
  getMovement() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      return this;
    }
  }

  // Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.getMovement();
