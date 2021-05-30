'use strict';

///////////////////////////////////////
// APPLICATION
///////////////////////////////////////
// ----------- Modal Window -----------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

// ----------- Smooth Scrolling -----------
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + pageXOffset,
    top: s1coords.top + pageYOffset,
    behavior: 'smooth',
  });

  section1.scrollIntoView({ behavior: 'smooth' }); // Scroll to selector
});

// ----------- Page Navigation -----------
document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// ----------- Event Delegation -----------
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// LECTURE
///////////////////////////////////////

/*
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

// ----------- styling elements -----------
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // can only get style if it is inline style
console.log(getComputedStyle(message).color); // compute
console.log(getComputedStyle(message).height); // not defined by user, but dom has inherent height

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 25 + 'px'; // manipulate style in dom
document.documentElement.style.setProperty('--color-primary', 'orangered'); // override style property

// ----------- Attributes elements -----------
const logo = document.querySelector('.nav__logo');
// Standard
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
// Nonstandard reading
console.log(logo.designer); // will not work with nonstandard
console.log(logo.getAttribute('designer'));

console.log(logo.src); // Absolute path
console.log(logo.getAttribute('src')); // Relative path

// ----------- dataset elements -----------
console.log(logo.dataset.versionNumber);

// ----------- class elements -----------
logo.classList.add('c');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// ----------- Smooth Scrolling -----------
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log(e.target.getBoundingClientRect()); // relative to viewport
  console.log('Current Scroll (X/Y)', pageXOffset, pageYOffset); // Pixels that have been scrolled
  console.log(
    'h/w viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientHeight
  );

  // Scrolling
  // window.scrollTo(s1coords.left + pageXOffset, s1coords.top + pageYOffset);
  window.scrollTo({
    left: s1coords.left + pageXOffset,
    top: s1coords.top + pageYOffset,
    behavior: 'smooth',
  });

  section1.scrollIntoView({ behavior: 'smooth' }); // Scroll to selector
});


// ----------- Adding / Removing DOM Elements -----------
const h1 = document.querySelector('h1')
const alertH1 = function(e) {
  alert('onMouseEnter');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000)

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // e.target = where the event happens, e.currentTarget = this
  // Stop Propogation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}, true); // true = listen to only capture events
*/
