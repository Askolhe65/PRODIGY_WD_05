const API_KEY = '05d081796439f6bbcc25bd7513fa2186';  // Replace with your OpenWeatherMap API key

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

function searchCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.city) {
        document.getElementById("cityName").innerText = data.city.name;
        document.getElementById("temperature").innerText = `${Math.round(data.list[0].main.temp)}°C`;
        document.getElementById("rainChance").innerText = `Humidity: ${data.list[0].main.humidity}%`;
        displayForecast(data.list);
      } else {
        alert("City not found");
      }
    })
    .catch(() => alert("Error fetching weather data."));
}

function displayForecast(forecastData) {
  const container = document.getElementById("weeklyForecast");
  container.innerHTML = "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayMap = new Map();

  forecastData.forEach((item) => {
    const date = new Date(item.dt_txt);
    const day = days[date.getDay()];
    if (!dayMap.has(day)) {
      dayMap.set(day, `${Math.round(item.main.temp)}°C`);
    }
  });

  for (const [day, temp] of dayMap.entries()) {
    const div = document.createElement("div");
    div.className = "day-box";
    div.innerHTML = `<strong>${day}</strong><p>${temp}</p>`;
    container.appendChild(div);
  }
}
