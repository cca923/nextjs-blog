import { apiRequest } from "./apiRequest";

export const fetchCityGeography = (city) =>
  apiRequest({
    url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=410cfc593b0152c0793f36334885d376`,
    method: "GET",
  });

export const fetchCityWeather = (latitude, longitude) =>
  apiRequest({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=410cfc593b0152c0793f36334885d376`,
    method: "GET",
  });

export const fetchMovies = (name) =>
  apiRequest({
    url: `https://www.omdbapi.com/?s=${name}&apikey=8efdf7b9`,
    method: "GET",
  });
