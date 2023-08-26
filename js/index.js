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

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${paddedHour}:${paddedMinutes}`;

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
  let cityName = response.data[0].name;
  let currentCityNameElement = document.querySelector("#current-city");
  currentCityNameElement.innerHTML = cityName;
}

function displayWeatherInfo(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let pressure = Math.round(response.data.main.pressure);
  let pressureElement = document.querySelector("#pressure-amount");
  pressureElement.innerHTML = pressure;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-amount");
  humidityElement.innerHTML = humidity;

  let weatherDescription = response.data.weather[0].main;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = weatherDescription;
}

function getCityData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let cityNameUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  axios.get(cityNameUrl).then(displayCityName);
  axios.get(weatherUrl).then(displayWeatherInfo);
}

function findCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCityData);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentCity);
