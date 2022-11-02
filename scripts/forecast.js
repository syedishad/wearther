const key = 'AzzICtDfOxCyToTZihupZ7ixmbwq6wbD';

// get  city information

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

// getCity('hyderabad')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


//  get weather info
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};



// getCity('hyderabad').then(data => {
//     return getWeather(data.Key);
//   }).then(data => {
//     console.log(data);
//   }).catch(err => console.log(err));