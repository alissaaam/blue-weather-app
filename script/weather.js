let currentTime = new Date();
let h2 = document.querySelector("#current-time");

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

function formatDay(timestamp) {
  let currentDate = new Date(timestamp * 1000);
  let day = currentDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <img
            src=" https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-date">${formatDay(forecastDay.dt)}</div>
          <div class="weather-temperatures">
            <span class="weather-forecast-max"> ${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
      
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dcb289ab0182fef55a284bc68b9e0fff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "dcb289ab0182fef55a284bc68b9e0fff";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function giveFahrenheit(event) {
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  event.preventDefault();
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", giveFahrenheit);

let celsiusTemperature = null;

function giveCelsius(event) {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", giveCelsius);

search("Florida");
