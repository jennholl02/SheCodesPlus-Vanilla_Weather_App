let date = new Date();
let today = date.getDate();

let hour = date.getHours();
let ampm = hour >= 12 ? "pm" : "am";
hour = hour % 12;
hour = hour ? hour : 12; // the hour '0' should be '12'

let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
let days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
let day = days[date.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];

let currentDateTime = document.querySelector("#time-date");
currentDateTime.innerHTML = `${day}, ${month} ${today}  at ${hour}:${minutes} ${ampm}`;
//
//
function showForecast(response) {
  let tempElement = Math.round(response.data.main.temp);
  let insertTemp = document.querySelector("#current-temperature");
  insertTemp.innerHTML = `${tempElement} °`;

  let descriptionElement = response.data.weather[0].description;
  let insertDescription = document.querySelector("#current-description");
  insertDescription.innerHTML = `${descriptionElement}`;

  let feelsLikeElement = Math.round(response.data.main.feels_like);
  let insertFeelsLike = document.querySelector("#feels-like");
  insertFeelsLike.innerHTML = `${feelsLikeElement} ℉`;

  let humidityElement = response.data.main.humidity;
  let insertHumidity = document.querySelector("#current-humidity");
  insertHumidity.innerHTML = `${humidityElement}%`;

  let windElement = Math.round(response.data.wind.speed);
  let insertWind = document.querySelector("#current-wind");
  insertWind.innerHTML = `${windElement} mph`;

  let highElement = Math.round(response.data.main.temp_max);
  let insertHigh = document.querySelector("#current-high");
  insertHigh.innerHTML = `${highElement} ℉`;

  let lowElement = Math.round(response.data.main.temp_min);
  let insertLow = document.querySelector("#current-low");
  insertLow.innerHTML = `${lowElement} ℉`;

  let name = response.data.name;
  let insertName = document.querySelector("#current-city");
  insertName.innerHTML = `${name}`;

  let iconElement = document.querySelector("#sunny-image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function citySearchNow(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;

  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrl = `${endpoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", citySearchNow);

function showCurrentLocation(position) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentPosition);
