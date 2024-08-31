// dark theme switch start
let darktheme = localStorage.getItem("darktheme");
const body = document.querySelector(".body");
const themeToggle = document.querySelector("#theme-toggle");

function enableDarktheme() {
  body.classList.add("darktheme");
  localStorage.setItem("darktheme", "active");
}
function disableDarktheme() {
  body.classList.remove("darktheme");
  localStorage.setItem("darktheme", null);
}
if (darktheme === "active") enableDarktheme();
themeToggle.addEventListener("click", () => {
  darktheme = localStorage.getItem("darktheme");
  darktheme !== "active" ? enableDarktheme() : disableDarktheme();
});
// dark theme switch ends
// ------------------------------------------
// Populating weather info (API Integration)
let citySearch = document.querySelector(".search-field");
let apiKey = "b87e89c0aea40aa9c0c643fa055f8ed2"; //apikey from openweather
let currentWeatherCard = document.querySelectorAll(".weather-left .card")[0];
let fiveDaysForecastCard = document.querySelector(".day-forecast");
let aqiCard = document.querySelectorAll(".highlights .card")[0];
let sunriseCard = document.querySelectorAll(".highlights .card")[1];
let aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

let humidityVal = document.getElementById("humidityVal"),
  pressureVal = document.getElementById("pressureVal"),
  visibilityVal = document.getElementById("visibilityVal"),
  windSpeedVal = document.getElementById("windSpeedVal"),
  feelsVal = document.getElementById("feelsVal");

let hourlyForecastCard = document.querySelector(".hourly-forecast");
//function to populate dashboard
function getDetails(name, lat, lon, country, state) {
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    airPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  fetch(airPollutionURL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;

      aqiCard.innerHTML = `
      <div class="card-head">
          <p>Air Quality Index</p>
          <p class="air-index aqi-${data.list[0].main.aqi} ">${
        aqiList[data.list[0].main.aqi - 1]
      } </p>
        </div>
        <div class="air-indices">
          <i class="fa-regular fa-wind fa-3x"></i>
          <div class="item">
            <p>PM2.5</p>
            <h2>${pm2_5}</h2>
          </div>
          <div class="item">
            <p>PM10</p>
            <h2>${pm10}</h2>
          </div>
          <div class="item">
            <p>SO2</p>
            <h2>${so2}</h2>
          </div>
          <div class="item">
            <p>CO</p>
            <h2>${co}</h2>
          </div>
          <div class="item">
            <p>NO</p>
            <h2>${no}</h2>
          </div>
          <div class="item">
            <p>N02</p>
            <h2>${no2}</h2>
          </div>
          <div class="item">
            <p>NH3</p>
            <h2>${nh3}</h2>
          </div>
          <div class="item">
            <p>03</p>
            <h2>${o3}</h2>
          </div>
        </div>   
      `;
    })
    .catch(() => {
      alert("Failed to fetch Air Quality Index");
    });

  fetch(weatherURL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();
      currentWeatherCard.innerHTML = `<div class="current-weather">
          <div class="details">
            <p>Now</p>
            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
            <p>${data.weather[0].description}</p>
          </div>
          <div class="weather-icon">
            <img
              src="https://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@2x.png"
              alt="cloudy icon "
            />
          </div>
        </div>
        <hr />
        <div class="card-footer">
          <p><i class="fa-light fa-calendar"></i>${
            days[date.getDay()]
          }, ${date.getDate()},${months[date.getMonth()]}</p>
          <p><i class="fa-light fa-location-dot"></i>${name},${country}</p>
        </div>`;

      let { sunrise, sunset } = data.sys;
      let { timezone, visibility } = data,
        { humidity, pressure, feels_like } = data.main,
        { speed } = data.wind;
      let sRiseTime = moment
        .utc(sunrise, "X")
        .add(timezone, "seconds")
        .format("hh:mm A");
      let sSetTime = moment
        .utc(sunset, "X")
        .add(timezone, "seconds")
        .format("hh:mm A");
      sunriseCard.innerHTML = `
        <div class="card-head">
            <p>Sunrise & Sunset</p>
          </div>
          <div class="sunrise-sunset">
            <div class="item">
              <div class="icon">
                <i class="fa-light fa-sunrise fa-4x"></i>
              </div>
              <div>
                <p>Sunrise</p>
                <h2>${sRiseTime}</h2>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <i class="fa-light fa-sunset fa-4x"></i>
              </div>
              <div>
                <p>Sunset</p>
                <h2>${sSetTime}</h2>
              </div>
            </div>
          </div>
        `;
      humidityVal.innerHTML = `${humidity}%`;
      pressureVal.innerHTML = `${pressure}hPa`;
      visibilityVal.innerHTML = `${visibility / 1000}km`;
      windSpeedVal.innerHTML = `${speed}m/s`;
      feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    })
    .catch(() => {
      alert("Failed to fetch current weather");
    });

  fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => {
      let hourlyForecast = data.list;
      hourlyForecastCard.innerHTML = "";
      for (let i = 1; i <= 7; i++) {
        let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        let a = "PM";
        if (hr < 12) a = "AM";
        if (hr == 0) hr = 12;
        if (hr > 12) hr = hr - 12;
        hourlyForecastCard.innerHTML += `
        <div class="card">
              <p>${hr} ${a} </p>
              <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
            </div>
        `;
      }
      let uniqueForcastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForcastDays.includes(forecastDate)) {
          return uniqueForcastDays.push(forecastDate);
        }
      });
      fiveDaysForecastCard.innerHTML = "";
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `
         <div class="forecast-item">
                <div class="icon-wrapper">
                  <img
                    src="https://openweathermap.org/img/wn/${
                      fiveDaysForecast[i].weather[0].icon
                    }.png"
                    alt="cloud sunny icon"
                  /><span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(
                    2
                  )}&deg;C</span>
                </div>
                <p>${date.getDate()} ${months[date.getMonth()]} </p>
                <p>${days[date.getDay()]} </p>
              </div>
        `;
      }
      // console.log(data);
    })
    .catch(() => {
      alert("Failed to fetch weather forecast");
    });
}
//getting search field value
citySearch.addEventListener("change", () => {
  let cityName = citySearch.value;
  citySearch.value = "";
  if (!cityName) return;
  let G_api_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  fetch(G_api_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country, state } = data[0];
      getDetails(name, lat, lon, country, state);
    })
    .catch(() => {
      alert(`Failed to fetch coordenates of ${cityName}`);
    });
});

// getting info of current location on loading the page

function getUserData() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let { latitude, longitude } = position.coords;
      let reverseGeocodingURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

      fetch(reverseGeocodingURL)
        .then((res) => res.json())
        .then((data) => {
          let { name, country, state } = data[0];
          getDetails(name, latitude, longitude, country, state);
        })
        .catch(() => {
          alert("Failed to fetch user coordinates");
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Geolocation permission denied. Please reset location permission to grant access again"
        );
      }
    }
  );
}
window.addEventListener("load", getUserData);
