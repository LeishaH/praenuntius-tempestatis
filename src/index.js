function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let detailsElement = document.querySelector(".weather-app-details");

  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;
  let date = new Date(response.data.time * 1000);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes.toString();
  }

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  detailsElement.innerHTML = `
    ${date.toLocaleDateString("en-US", {
      weekday: "long",
    })} ${hours}:${minutes}, ${description}
    <br />
    Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind} km/h</strong>
  `;
}

function searchCity(city) {
  const apiKey = "tf950d82b50b8f88a15d0ac93o492d93";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");
