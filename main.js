import axios from "axios"
import dotenv from "dotenv"
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const formEle = document.getElementById('weatherForm'); 
const query = document.getElementById('inputEle');

// console.log(query.value);

const parentDiv = document.getElementById('mainContent'); 
let paragraphElement = document.createElement('p'); 
let temp = document.createElement('p'); 
paragraphElement.setAttribute('id', 'display');
let errorMsg = document.createElement('p');  



formEle.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    try {
        let response = await axios.get(`${BASE_URL}${query.value}&appid=${API_KEY}&units=imperial`)
        clearWeather(); 
        let currentTemp = Math.floor(response.data.main.temp); 
        let weatherDesc = response.data.weather[0].description;
        let minTemp = Math.floor(response.data.main.temp_min);
        let maxTemp = Math.floor(response.data.main.temp_max); 

        if (currentTemp > 90) {
            temp.textContent = `The current temperature of ${Math.floor(response.data.main.temp)}°F is pretty hot. Dress warmly! `
            temp.style.color ='red'; 
            temp.style.fontSize = '20px';
            parentDiv.appendChild(temp); 
        } else if (currentTemp < 40) {
            temp.textContent = `The current temperature of ${Math.floor(response.data.main.temp)}°F is pretty cold. Bundle up!`
            temp.style.color = 'blue'
            temp.style.fontSize = '20px';
            parentDiv.appendChild(temp);
        }


        paragraphElement.innerHTML = `City Name: ${response.data.name}
        <br> Current Temperature: ${currentTemp}°F <br> Weather Description: ${weatherDesc} 
        <br> Min Temperature: ${minTemp}°F <br> Max temperature: ${maxTemp}°F `

        

        parentDiv.appendChild(paragraphElement); 
        console.log(response);
        
    } catch(err) {
        parentDiv.appendChild(errorMsg);
        setMessage("There has been an error locating your city or zipcode. Please try again."); 
        console.log(err); 
    }

})

const clearWeather = () => {

    while (parentDiv.firstChild) {
        parentDiv.firstChild.remove();
        query.value = "";
    }
}

const setMessage = (msg) => {
        errorMsg.textContent = msg; 
    }

// const changeColor =(temp) =>  {
//     if (temp > 90) {
//         temp.style.color = 'red'; 
//     } else if (temp < 40) {
//         temp.style.color = 'blue'
//     }
// }