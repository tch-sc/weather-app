let date = new Date();
let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayName[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();

if (hour < 10) {
  var paddedHour = `0${hour}`;
} else {
  var paddedHour = `${hour}`;
}

if (minutes < 10) {
  var paddedMinutes = `0${minutes}`;
} else {
  var paddedMinutes = `${minutes}`;
}

document.querySelector(
  "#current-date"
).innerHTML = `${day} ${paddedHour}:${paddedMinutes}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = row>`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <div class="day"><p>${day}</p></div>
        <img
          src="https://openweathermap.org/img/wn/02d@2x.png"
          alt="sunny cloud"
          width="56"
          class="weather-icon"
        />
        <div>
          <span class="high-temp"><strong>20°</strong></span>
          <span class="low-temp">14°</span>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enter-city-name").value;
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputElement}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayWeatherInfo);

  if (cityInputElement === "") {
    return;
  }

  document.querySelector("#current-city").innerHTML = cityInputElement;
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayCityName(response) {
  document.querySelector("#current-city").innerHTML = response.data[0].name;
}

function displayWeatherInfo(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#current-wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function getCityData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  axios.get(cityNameUrl).then(displayCityName);
  axios.get(weatherUrl).then(displayWeatherInfo);
}

function findCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCityData);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentCity);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  currentTemperature = document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  currentTemperature = document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

search("Montreal");
displayForecast();
