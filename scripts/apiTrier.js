const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');

const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=imperial&appid=bd6991abdbe574169488a8388563fc83';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  captionDesc.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
apiFetch();
