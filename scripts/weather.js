const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');
const day1Temp = document.getElementById('day1-temp');
const day2Temp = document.getElementById('day2-temp');
const day3Temp = document.getElementById('day3-temp');
const date1 = document.getElementById('date1');
const date2 = document.getElementById('date2');
const date3 = document.getElementById('date3');

const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=21.30&lon=-157.85&units=imperial&appid=bd6991abdbe574169488a8388563fc83';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
  captionDesc.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

apiFetch();

const forecastUrl =
  'https://api.openweathermap.org/data/2.5/forecast?lat=21.30&lon=-157.85&units=imperial&appid=bd6991abdbe574169488a8388563fc83';

async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  day1Temp.innerHTML = `${Math.round(data.list[8].main.temp)}&deg;F`;
  day2Temp.innerHTML = `${Math.round(data.list[12].main.temp)}&deg;F`;
  day3Temp.innerHTML = `${Math.round(data.list[24].main.temp)}&deg;F`;

  // Convert and display dates
  date1.innerHTML = formatDate(data.list[8].dt_txt);
  date2.innerHTML = formatDate(data.list[12].dt_txt);
  date3.innerHTML = formatDate(data.list[24].dt_txt);
}

function formatDate(dateTime) {
  const date = new Date(dateTime);
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

fetchForecast();
