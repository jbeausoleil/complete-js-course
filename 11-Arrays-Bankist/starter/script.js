'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////// LEARN ///////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// ----------- Slice Method -----------
// does not mutate array (creates copy)
console.log(arr.slice(2)); // Slice will return new array (copy with extracted parts)
console.log(arr.slice(2, 4)); // Slice will return new array (copy with extracted parts)
console.log(arr.slice(-1)); // Last element of any array
console.log(arr.slice(1, -2));

// ----------- Splice Method -----------
// removes elements from array -- does mutate array
console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);

// ----------- Reverse Method -----------
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// ----------- Concat Method -----------
const letters = arr.concat(arr2);
console.log([...arr, ...arr2]);

// ----------- forEach Method -----------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${movement}`);
  }
}

// Cannot break out of forEach method
movements.forEach(function (movement, i, arr) {
  // current element, index
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited $${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew $${Math.abs(movement)}`);
  }
});

// ----------- Map Method -----------
const eurToUsd = 1.1;
const movementsUSD = movements.map(movement => movement * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const movement of movements) {
  movementsUSDfor.push(movement * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescription = movements.map((movement, i) => {
  if (movement > 0) {
    return `Movement ${i + 1}: You deposited $${movement}€`;
  } else {
    return `Movement ${i + 1}: You withdrew $${Math.abs(movement)}`;
  }
});
console.log(movementsDescription);

// ----------- Filter Method -----------
// arr is just movements
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(deposits)

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals)

// ----------- Reduce Method -----------
// accumulator (previous value) -> snowball
// callback function and starting number
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);
*/

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (ages) {
  return ages
    .map(dogAge => {
      return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
    })
    .filter(dogAge => dogAge >= 18)
    .reduce(function (acc, dogAge, i, arr) {
      return acc + dogAge / arr.length;
    }, 0);
};

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);


// ----------- Find Method -----------
// Does not return a new array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account)

let name;
for (const [i, account] of accounts.entries()) {
  if (account.owner === 'Jessica Davis') {
    console.log(i, account.owner)
  }
}

// ----------- some Method -----------
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// ----------- sort Method -----------
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements);
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
movements.sort((a, b) => {
  return a - b
});
console.log(movements);

// ----------- create Arrays Method -----------
const y = Array.from({ length: 7 }, () => 1);
const z = Array.from({length: 7}, (_, i) => i + 1)
 */

////////////////////// APPLICATION ///////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // Create a copy with slice
  const movs = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement}€</div>
          </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumIn.textContent = `${deposits}€`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumOut.textContent = `${withdrawals}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (acc.interestRate / 100) * deposit)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount; // Allows access outside of function due to hoisting and scope
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username.toLowerCase() === inputLoginUsername.value.toLowerCase() // Normalize
  ); // Reads value from input field

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ?. is optional chaining - check if currentAccount exists
    // textContent is always a string so convert inputLoginPin to number
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = String(100);
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
  const amount = Number(inputTransferAmount.value);
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
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
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
    Number(inputClosePin.value) === currentAccount.pin
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
