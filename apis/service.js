import { apiRequest } from './apiRequest'
import { weatherApiDomain, movieApiDomain, passengerApiDomain } from './domain'

export const fetchCityGeography = ({ city }) => apiRequest({
  url: `${weatherApiDomain}/geo/1.0/direct?q=${city}&limit=1&appid=410cfc593b0152c0793f36334885d376`,
  method: 'GET',
})

export const fetchCityWeather = ({ latitude, longitude }) => apiRequest({
  url: `${weatherApiDomain}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=410cfc593b0152c0793f36334885d376`,
  method: 'GET',
})

export const fetchMovies = ({ name }) => apiRequest({
  url: `${movieApiDomain}/?s=${name}&apikey=8efdf7b9`,
  method: 'GET',
})

export const fetchPassenger = ({ page, size }) => apiRequest({
  url: `${passengerApiDomain}/v1/passenger?page=${page}&size=${size}`,
  method: 'GET',
})
