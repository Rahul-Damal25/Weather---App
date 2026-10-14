const cityinput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchBtn");
const cityname = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const  condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const error = document.getElementById("error")

const API_KEY = `eb07e77e207a88b997a36d1fd4ab557b`;

async function getWeather() {

    const city = cityinput.value.trim()

    if(city === ""){
        error.textContent = "Please enter a city name"
        return;
    }
   
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


    console.log(API_URL)

    try {
        error.textContent = ""
        const response = await fetch(API_URL);
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Weather not Found")
        }
       
        cityname.textContent = data.name;
        temperature.textContent = `${data.main.temp}°C`;
        condition.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
     

    }
    catch(err){
        error.textContent = err.message;
    }
    
}

searchbtn.addEventListener("click", getWeather);