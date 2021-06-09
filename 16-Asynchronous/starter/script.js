'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
  });
};
*/

const renderCountry = function (data, className = '') {
  const html = `
    <article class='country ${className}'>
      <img class='country__img' src='${data.flag}' />
      <div class='country__data'>
        <h3 class='country__name'>${data.name}</h3>
        <h4 class='country__region'>${data.region}</h4>
        <p class='country__row'><span>👫</span>${(
          +data.population /
          10 ** 6
        ).toFixed(1)} people</p>
        <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
        <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(
    response => {
      if (!response.ok) throw new Error(`${errorMessage} ${response.status}`); // becomes err.message
      return response.json();
    } // Available on all responses coming from fetch
  );
};
/*
// getCountryData('USA');
// getCountryData('Nigeria');

const getCountryNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render Country 1
    renderCountry(data);
    // Get neighbor country
    const [neighbor] = data.borders;
    // Guard if no neighbor
    if (!neighbor) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText)
      // Render Country 2
      renderCountry(data2, 'neighbour')
    });
  });
};

getCountryNeighbour('portugal');

// ------------- Promises -------------
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); // Available on all responses coming from fetch
    })
    .then(function (data) {
      console.log(data);
    });
};


const getCountryData = function (country) {
  // Country 1
  // Only rejects with no internet connection
  // WIll fetch with 404 error
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`); // becomes err.message
      return response.json(); // Available on all responses coming from fetch
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // Country 2
      return fetch(
        // need to include return to be able to chain
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`); // becomes err.message
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      // Always called
      countriesContainer.style.opacity = '1';
    });
}; // catch any errors that happen in the promise chain

const getCountryData = function (country) {
  // Country 1
  // Only rejects with no internet connection
  // WIll fetch with 404 error
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found.'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error(`No neighbour found.`)
      // Country 2
      return getJSON(
        // need to include return to be able to chain
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found.'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      // Always called
      countriesContainer.style.opacity = '1';
    });
}; // catch any errors that happen in the promise chain

getCountryData('australia');

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

const getPosition = function () {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
getPosition().then(pos => console.log(pos))
 */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Async returns a promise
  // Geolocation

  try {
    const pos = await getPosition(); // Await can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value.
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data.`)
    const dataGeo = await resGeo.json();
    // Country Data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    ); // stop execution until fetch is successful
    if (!resGeo.ok) throw new Error(`Problem getting country.`)
    const data = await res.json(); // returns a promise once the first micro queue is complete
    console.log(data);
    renderCountry(data[0]);
  } catch (error) {
    console.log(`${error}`)
  }
};

whereAmI();
