let date = new Date();
let today = date.getDate();

let hour = date.getHours();
let ampm = hour >= 12 ? "pm" : "am";
hour = hour % 12;
hour = hour ? hour : 12; // the hour '0' should be '12'

let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
  insertTemp.innerHTML = `${tempElement} ℉`;

  let descriptionElement = response.data.weather[0].description;
  let insertDescription = document.querySelector("#current-description");
  insertDescription.innerHTML = `${descriptionElement}`;

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
}

function citySearchNow(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let currentCity = document.querySelector("#current-city");
  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please Enter a City in the Search Bar. Thank you!");
  }

  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrl = `${endpoint}?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}
let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", citySearchNow);
