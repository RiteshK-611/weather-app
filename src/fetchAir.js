import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/air_pollution'
const API_KEY = 'c9b84ef1e6cd308dfc0f89c6d3969a88'

const fetchAir = async (lat, lon) => {
  const { data } =  await axios.get(URL, {
    params: {
      lat: lat,
      lon: lon,
      appid: API_KEY
    }
  })

  return data
}

export default fetchAir