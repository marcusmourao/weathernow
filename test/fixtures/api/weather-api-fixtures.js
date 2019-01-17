const fixtures = {
  apiKey: 'c0cef6453abf7c54165726c03fe60665',
  serverHost: 'https://api.openweathermap.org/data/2.5/weather',
  cityId: 123,
};

fixtures.getWeatherByCityId = {
  finalEndPoint: `${fixtures.serverHost}?id=${fixtures.cityId}&units=metric&appid=${fixtures.apiKey}`
};

export default fixtures;
