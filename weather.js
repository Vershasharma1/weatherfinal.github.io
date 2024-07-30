
function getWeather() {
    const apiKey = '778c2c872cdce96f39bb451e994dddd7';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const country = data.sys.country; // Get the country code
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const flagUrl = `https://flagsapi.com/${country}/shiny/64.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}, ${country} <img src="${flagUrl}" alt="" width="20" height="15"></p> <!-- Display city and country with flag -->
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        setBackgroundImage(description);

        showImage();
    }
}
function setBackgroundImage(weather) {
    const body = document.getElementById('body');
    
    if (weather.includes('clear sky')) {
        body.style.backgroundImage = 'url("https://images.freeimages.com/images/large-previews/e62/clear-sky-1363026.jpg?fmt=webp&w=500")';
    } else if (weather.includes('mist')) {
        body.style.backgroundImage = 'url("https://live.staticflickr.com/2687/4263490087_d06f7871fc_o.jpg")';
    } else if (weather.includes('clouds')) {
        body.style.backgroundImage = 'url("https://cdn.wallpapersafari.com/46/73/6qdNRO.jpg")';
    } else if (weather.includes('thunderstorm')) {
        body.style.backgroundImage = 'url("https://img.etimg.com/thumb/width-1200,height-1200,imgsize-31756,resizemode-75,msid-64049147/news/politics-and-nation/thunderstorm-heavy-rain-likely-in-13-states-tomorrow.jpg")';
    } else if(weather.includes('rain')){
        body.style.backgroundImage = 'url("https://img.freepik.com/free-photo/rough-metallic-surface-texture_23-2148953930.jpg")'
    }
    else {
        body.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIs-OSh-JqmBoYljRbxEUtg_5CK0NYFITqA&s")';
    }
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}