const cityForm = document.querySelector('.form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.card img');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  //  // destructure properties
  const { cityDets, weather } = data;


  // const cityDets = data.cityDets;
  // const weather = data.weather;
  const IsDayTime = weather.IsDayTime;

  // update details template
  details.innerHTML = `
  <h5 class="city-name" >${cityDets.EnglishName}</h5>
  <div class="weather-condition">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
   <div class="time">${weather.LocalObservationDateTime}</div>
  </div>
`;

  let timeSrc = null;

  if (IsDayTime) {
    timeSrc = 'img/day.svg';

  } else {
    timeSrc = 'img/night.svg';
  }
  time.setAttribute('src', timeSrc);

  /* update the night/day & icon images */
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  //another mothed
  // const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  // time.setAttribute('src', timeSrc);

};
const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets, weather };


};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  card.style.display = "block";
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // local storage
  localStorage.setItem('city', city);

});
if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
