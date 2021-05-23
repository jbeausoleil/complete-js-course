'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highScore = Number(document.querySelector('.highscore').textContent);
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    // When there is no input
    displayMessage('No Number!')
  } else if (guess === secretNumber) {
    // When player wins
    displayMessage('Correct Number!')
    document.querySelector('.number').textContent = String(secretNumber);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low');
      score--;
      document.querySelector('.score').textContent = String(score);
    } else {
      displayMessage('Game Over!')
      document.querySelector('.score').textContent = String(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber)
  displayMessage('Start guessing...')
  document.querySelector('.score').textContent = String(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
