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

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enter-city-name");
  let cityInputText = cityInputElement.value;

  if (cityInputText === "") {
    return;
  }

  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = cityInputText;

  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputText}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayWeatherInfo);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchCity);

function displayCityName(response) {
  document.querySelector("#current-city").innerHTML = response.data[0].name;
}

function displayWeatherInfo(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

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
