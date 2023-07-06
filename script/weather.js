let currentTime = new Date();
let h2 = document.querySelector("h2");

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
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
let day = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes} PM `;

function showWeather(response) {
  let currentTemperature = document.querySelector("#temperature-value");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let h3 = document.querySelector("#description");
  h3.innerHTML = response.data.weather[0].main;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let citySearched = searchInput.value;

  let apiKey = "dcb289ab0182fef55a284bc68b9e0fff";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

function giveCelsius() {
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = `32`;
}
let link = document.querySelector("#celsius-unit");
link.addEventListener("click", giveCelsius);

function showTemperature(response) {
  let currentCity = document.querySelector("#current-city");
  let cityElement = response.data.name;
  currentCity.innerHTML = cityElement;

  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temperature-value");
  temp.innerHTML = currentTemperature;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = response.data.main.humidity;
  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}
