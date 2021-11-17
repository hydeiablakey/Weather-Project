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
paragraphElement.setAttribute('id', 'display');
let errorMsg = document.createElement('p');  


formEle.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    try {
        let response = await axios.get(`${BASE_URL}${query.value}&appid=${API_KEY}`)
        clearWeather(); 
        paragraphElement.innerHTML = `City Name: ${response.data.name}
        <br> Current Temperature: ${response.data.main.temp} <br> Weather Description: ${response.data.weather[0].description} 
        <br> Min Temperature:${response.data.main.temp_min} <br> Max temperature: ${response.data.main.temp_max} `
        parentDiv.appendChild(paragraphElement); 
        console.log(response);

        // console.log(response.data.name); 
        // console.log(response.data.weather[0].main); 
        // console.log(response.data.weather[0].description); 
        // console.log(response.data.main.temp_min);
        // console.log(response.data.main.temp_max); 
    } catch(err) {
        parentDiv.appendChild(errorMsg);
        setMessage("There has been an error finding your query. Please try again."); 
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