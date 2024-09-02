
document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Veuillez entrer une ville.');
    }
});

function fetchWeather(city) {
    const apiKey = 'c77b620170a24242bdd140558243103'; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const current = data.current;
    const forecast = data.forecast.forecastday;
    const location = data.location;
    const alerts = data.alerts.alert;

    // Display current weather
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <h3>Actuellement à ${location.name}, ${location.country}</h3>
            <p>${current.temp_c}°C, ${current.condition.text}</p>
            <img src="https:${current.condition.icon}" alt="weather icon">
            <p>Vent: ${current.wind_kph} km/h, ${current.wind_dir}</p>
            <p>Humidité: ${current.humidity}%</p>
            <p>Pression: ${current.pressure_mb} hPa</p>
            <p>Indice UV: ${current.uv}</p>
            <p>Visibilité: ${current.vis_km} km</p>
        </div>
        
        <div class="super-container">
            <div class="three-day-forecast">
                ${forecast.slice(0, 3).map(day => `
                    <div class="forecast-card">
                        <h4>${new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}</h4>
                        <img src="https:${day.day.condition.icon}" alt="daily weather icon">
                        <p>Max: ${day.day.maxtemp_c}°C</p>
                        <p>Min: ${day.day.mintemp_c}°C</p>
                        <p>${day.day.condition.text}</p>
                        <p>Probabilité de pluie: ${day.day.daily_chance_of_rain}%</p>
                    </div>
                `).join('')}
            </div>

            <div class="hourly-forecast">
                ${forecast[0].hour.map(hour => `
                    <div class="hour-card">
                        <p>${hour.time.split(' ')[1]}</p>
                        <img src="https:${hour.condition.icon}" alt="hourly weather icon">
                        <p>${hour.temp_c}°C</p>
                        <p>Pluie: ${hour.chance_of_rain}%</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Display weather alerts if available
    if (alerts.length > 0) {
        alerts.forEach(alert => {
            weatherInfo.innerHTML += `
                <div class="alert-card">
                    <h3>Alerte Météo</h3>
                    <p>${alert.headline}</p>
                    <p>${alert.msgtype}: ${alert.desc}</p>
                </div>
            `;
        });
    }
}