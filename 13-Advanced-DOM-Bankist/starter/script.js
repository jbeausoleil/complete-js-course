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
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab'); // node list
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

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

// ----------- Tabbed Component -----------
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return; // Guard clause

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// ----------- Menu Fade Animation -----------
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img'); // select image

    siblings.forEach(sibling => {
      // Check if element is equal to link element hovering over
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // bind creates new function with this = 0.5
nav.addEventListener('mouseout', handleHover.bind(1)); // bind creates new function with this = 1

// ----------- Sticky Navigation: Intersection Observer API -----------
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// ----------- Reveal Sections -----------
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // unobserve to remove additional overhead
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section); // is the entries
  section.classList.add('section--hidden');
});

// ----------- Lazy Loading Images -----------
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `+200px`, // grow bounding box by 200px
});

imgTargets.forEach(imgTarget => imgObserver.observe(imgTarget));

// ----------- Slider Component -----------
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnSliderLeft = document.querySelector('.slider__btn--left');
  const btnSliderRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot dots__dot--active' data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Transform slide translation property
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Call on event listener to go to respective slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  btnSliderRight.addEventListener('click', nextSlide);
  btnSliderLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      previousSlide();
    }
    e.key === 'ArrowRight' && nextSlide(); // short circuiting
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
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

// ----------- Traversing the DOM -----------
const h1 = document.querySelector('h1');
// ----------- Traversing the DOM Downwards: Child -----------
console.log(h1.querySelectorAll('.highlight')); // will select all children
console.log(h1.childNodes); // All child nodes of types (think back to node tree) not used much
console.log(h1.children); // All elements that are inside of the h1
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// ----------- Traversing the DOM Upwards: Parents -----------
console.log(h1.parentNode);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// ----------- Traversing the DOM Sideways: Siblings ----------
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children); // provides itself in function due to parent then back down
[...h1.parentElement.children].forEach(function(el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)'
  }
});

// ----------- Sticky Navigation -----------
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
})

// ----------- Sticky Navigation: Intersection Observer API -----------
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
//
// const obsOptions = {
//   root: null, // element that the target is intersecting ... null = viewport
//   threshold: [.1] // percent of intersection that the observer callback will be called - when section1 intersect viewport at 10%
// };
//
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // observe a particular target
*/

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('HTML')
})