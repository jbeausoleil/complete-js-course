'use strict';

///////////////////////////////////////
// APPLICATION
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// LECTURE
///////////////////////////////////////
console.log(document.documentElement);
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section'); // NODE LIST which is not a live collection
console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button'); // Live HTMLCollection (as dom changes this will change)
console.log(allButtons);

document.getElementsByClassName('btn'); // Live HTMLCollection (as dom changes this will change)
// ----------- Creating and inserting elements -----------
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepend adds as first child
header.append(message); // append adds as last child
// header.append(message.cloneNode(true)) // Allows for existence in multiple places
// header.before(message)

// ----------- deleting elements -----------
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove(); // most recent implementation
    message.parentElement.removeChild(message); // DOM traversing -- select parent then select child
  });
