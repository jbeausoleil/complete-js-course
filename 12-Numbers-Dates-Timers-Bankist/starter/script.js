'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-05-22T17:01:17.194Z',
    '2021-05-23T23:36:17.929Z',
    '2021-05-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    //
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(Number(value))
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // Create a copy with slice
  const movs = sort
    ? acc.movements.slice().sort((a, b) => {
        return a - b;
      })
    : acc.movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrency(movement, acc.locale, acc.currency)

    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
          </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(deposits, acc.locale, acc.currency);

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(withdrawals), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (acc.interestRate / 100) * deposit)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  // Do not create a new array - create side effect by mutating account array
  // For each account in accounts add a property username
  // Note each account in the array is an OBJECT
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  });
  return accs;
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

/////////////////////////////////////////////////
// Event handlers

let currentAccount; // Allows access outside of function due to hoisting and scope
// Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

/*
// Experimenting API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long'
};
const locale = navigator.language; // Browser Language

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)
 */

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username.toLowerCase() === inputLoginUsername.value.toLowerCase() // Normalize
  ); // Reads value from input field

  if (currentAccount?.pin === +inputLoginPin.value) {
    // ?. is optional chaining - check if currentAccount exists
    // textContent is always a string so convert inputLoginPin to number
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = String(100);
    // Create current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const locale = currentAccount.locale; // Browser Language

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // remove focus
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // Setup read from input fields
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username.toLowerCase() === inputTransferTo.value.toLowerCase()
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username.toLowerCase() !== // need the check above
      currentAccount.username.toLowerCase()
  ) {
    // Doing the transfer
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(amount * -1);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    // Clear any input fields
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // Check if user is authenticated user
  if (
    inputCloseUsername.value.toLowerCase() ===
      currentAccount.username.toLowerCase() &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // Find index of account
    const index = accounts.findIndex(acc => acc.owner === currentAccount.owner);
    console.log(index);
    // Remove index
    accounts.splice(index, 1);
    // Log out user (hide UI)
    containerApp.style.opacity = String(0);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// Parsing
console.log(Number.parseInt('30px')); // Must start with a number
console.log(Number.parseFloat('2.5rem'));

// Remainder
labelBalance.addEventListener('click', function (e) {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'Tomato'
    }
  });
});

const now = new Date();
console.log(now);

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 24));
console.log(days1);
*/
