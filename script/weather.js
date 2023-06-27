let currentTime = new Date();
let h2 = document.querySelector("h2");

let hours = currentTime.getHours();
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
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes} PM `;

function showWeather(response) {
  let currentTemp = document.querySelector("#temperature-value");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let h3 = document.querySelector("#description");
  h3.innerHTML = response.data.weather[0].main;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = response.data.name;
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
  let span = document.querySelector("span");
  span.innerHTML = `32`;
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

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4aabeaa6f84c5efb46c8556781e1ac0f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", getCurrentPosition);
