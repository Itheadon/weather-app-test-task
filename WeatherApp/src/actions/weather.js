export const fetchWeather = () => ({
  type: 'FETCH_WEATHER'
});

export const updateWeather = (temperature, humidity, date = new Date()) => ({
  type: 'UPDATE_WEATHER',
  payload: { temperature, humidity }
});
