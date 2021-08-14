function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#five-day-forecast");

  let forecastHTML = `<div class="row" >`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2" >      
                  <div class="forecast-day">${displayDay(forecastDay.dt)}</div>
                  <div class="forecast-weather-image"><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="Weather-Icon" id="forecast-image"/></div>
                  <div class="forecast-highlow"><span class="forecast-high">${Math.round(
                    forecastDay.temp.max
                  )}°</span><span class="forecast-low"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>   
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecastElements(response) {
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecastElements);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", handleSubmit);

function showCurrentLocation(position) {
  let apiKey = "9eb0f850fd87a403bc76584028e843ca";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecastElements);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentPosition);

search("Denver");
