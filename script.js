const apiKey = "a94d0a5ac08570add4b47b8da933f247";
const city = "Minsk";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const date = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    document.getElementById("city").textContent = data.city.name;
    document.getElementById("date").textContent = date.toLocaleDateString(
      undefined,
      options
    );

    const currentWeather = data.list[0];
    document.getElementById("temperature").textContent = `${Math.round(
      currentWeather.main.temp
    )}°C`;
    document.getElementById("description").textContent =
      currentWeather.weather[0].description;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    const dailyForecastContainer = document.getElementById("daily-forecast");
    dailyForecastContainer.innerHTML = ""; // Очистка предыдущих данных

    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const forecastDiv = document.createElement("div");
      forecastDiv.className = "forecast-day";
      forecastDiv.innerHTML = `
                ${new Date(
                  forecast.dt * 1000
                ).toLocaleDateString()}: ${Math.round(forecast.main.temp)}°C 
                (${forecast.weather[0].description})
                <img src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" alt="weather icon">
            `;
      dailyForecastContainer.appendChild(forecastDiv);
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

fetchWeather();
