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

function citySearchNow(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
}
let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", citySearchNow);
