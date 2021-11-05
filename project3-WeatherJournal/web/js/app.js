console.log('test');

// openweather url address Zip code
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// const baseCityURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

// Personal API Key for OpenWeatherMap API // const unit = "metric"
const myApiKey = "&appid=3917f3a764d0394f234b9a09d3463ef4&units=metric";

//date
let d = new Date()
let dateToday = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
//* Function called by event listener *//
document.getElementById('generate').addEventListener('click', getWeather);


/* Function to GET Web API Data*/
function getWeather(e) {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const userFocus = document.getElementById('focus').value;
  getWeatherInfo(baseURL, zipCode, myApiKey)
    .then(function (weatherData) {
      const temperature = weatherData.main.temp;
      const city = weatherData.name;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const windSpeed = weatherData.wind.speed;
      const humidity = weatherData.main.humidity;
      const focus = userFocus;
      const country = weatherData.sys.country;
      const date = dateToday
      // Weather info posted to the server
      postData('/addData', {
        temperature,
        city,
        description,
        icon,
        windSpeed,
        humidity,
        focus,
        country,
        date
      }).then(function () {
        updateUI()
      })
      // updateUI function to be called after the click is fired off and the weather info is gathered
    });
}

// Takes the url + zip + API and calls the API for the data
const getWeatherInfo = async (baseURL, zipCode, myApiKey) => {
  // 1. the demo api fetch 
  const res = await fetch(baseURL + zipCode + myApiKey)

  try {

    const data = await res.json();
    console.log(data)
    return data
    // 1. We can do something with our returned data here-- like chain promises!

  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
}

// Add data to the project endpoint using POST
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

// Update UI dynamically
const updateUI = async () => {
  const request = await fetch('/allData');
  try {
    // console.log('uitest!')
    const allData = await request.json();
    // const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
    // document.getElementById('entry-header').style.display = 'none';
    document.getElementById('date').innerText = allData.date;
    document.getElementById('temp').innerText = allData.temp + 'C';
    document.getElementById('content').innerText = allData.content;
    document.getElementById('city').innerText = allData.city;
    document.getElementById('icon').innerText = allData.icon;
    document.getElementById('zip').value = '';
    document.getElementById('userFocus').innerText = allData.focus ;
  } catch (error) {
    console.log("error", error);
  }
}
