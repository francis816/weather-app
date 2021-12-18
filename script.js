let weather = {
    apiKey: "d6e7449e18770c0b5733b2d810c03137",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));

    },
    displayWeather: function (data) {
        // destructing method. Same as const name = data.name
        const { name } = data;
        // same as const icon, description = data.weather[0].icon and data.weather[0].description
        const { icon, description } = data.weather[0];
        // same as const temp, humidity = data.main.temp and data.main.humidity
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".temp").innerText = `${Math.round(temp)}° F`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed} mph`;
        document.querySelector(".weather").classList.remove("loading");
        // a bit tricky for the ES6 syntax below. We want url() as string. And inside the url() string, we have a website address with double quote
        document.body.style.backgroundImage = `url("https://source.unsplash.com/1920x1080/?${name}")`;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Austin");