import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'c9b84ef1e6cd308dfc0f89c6d3969a88'


const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      appid: API_KEY   
    }
  })

  return data;
}

export default fetchWeather