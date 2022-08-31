// HTML elemnts
let searchInput = document.getElementById('searchInput');
let submit = document.getElementById('submit');
let temp1 = document.getElementById('temp1'); 
let temp2 = document.getElementById('temp2');
let temp3 = document.getElementById('temp3');
let city = document.getElementById('city');
let status1 = document.querySelector('#card1 .status');
let status2 = document.querySelector('#card2 .status');
let status3 = document.querySelector('#card3 .status');
let statusImg1 = document.querySelector('#card1 .statusImg');
let statusImg2 = document.querySelector('#card2 .statusImg');
let statusImg3 = document.querySelector('#card3 .statusImg');
let humidity = document.getElementById('humidity');
let speed = document.getElementById('speed');
let direction = document.getElementById('direction');
let firstDay = document.getElementById('firstDay');
let firstDate = document.getElementById('firstDate');
let secondDay = document.getElementById('secondDay');
let thirdDay = document.getElementById('thirdDay');
let emailInput = document.getElementById('emailInput');
let btnSub = document.getElementById('btnSub');


// subscribtion emails list
let emailsList = [];

// localstorage for emailslist
if (localStorage.getItem('emailsListStorage') != null){
  emailsList = JSON.parse(localStorage.getItem('emailsListStorage'));
}

// Set Days
const d = new Date();
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
firstDay.innerHTML = weekDays[d.getDay()];
secondDay.innerHTML = weekDays[d.getDay() + 1];
thirdDay.innerHTML = weekDays[d.getDay() + 2];
firstDate.innerHTML = `${d.getUTCDate()}${months[d.getMonth()]}`



// search city function
async function getWeather(i){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6e29a3aaf1f04f7d896111244220606 &q=${i}&days=3&aqi=no&alerts=no`);
    let result = await response.json();

    // first Day
    city.innerHTML = result.location.name;
    temp1.innerHTML = result.current.temp_c;
    status1.innerHTML = result.current.condition.text;
    statusImg1.src = `https:${result.current.condition.icon}`;
    humidity.innerHTML = result.current.humidity;
    speed.innerHTML = result.current.wind_kph;
    direction.innerHTML = result.current.wind_dir;

    // second Day
    temp2.innerHTML = result.forecast.forecastday['1'].day.maxtemp_c;
    status2.innerHTML = result.forecast.forecastday['1'].day.condition.text;
    statusImg2.src = `https:${result.forecast.forecastday['1'].day.condition.icon}`;

    // third Day
    temp3.innerHTML = result.forecast.forecastday['2'].day.maxtemp_c;
    status3.innerHTML = result.forecast.forecastday['2'].day.condition.text;
    statusImg3.src = `https:${result.forecast.forecastday['2'].day.condition.icon}`;

    // console.log(city);
    // console.log(statusImg3.src);
    // console.log(result.forecast.forecastday['1'].day.condition.icon)
    // console.log(result);
}

// search city call
submit.addEventListener('click', function(){getWeather(searchInput.value)});
searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    submit.click();
  }
});

// Home City
getWeather('cairo');

// subscribtion function
function subscribe(){
  emailsList.push(emailInput.value);
  localStorage.setItem('emailsListStorage', JSON.stringify(emailsList));
  console.log(JSON.parse(localStorage.getItem('emailsListStorage')));
}

// subscribtion call
btnSub.addEventListener('click', subscribe);
emailInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    btnSub.click();
  }
});




