export const fetchWeather = () => ({
  type: 'FETCH_WEATHER'
});

export const updateWeather = payload => ({
  type: 'UPDATE_WEATHER',
  payload
});

export const stopUpdate = () => ({
  type: 'STOP_UPDATE'
});
