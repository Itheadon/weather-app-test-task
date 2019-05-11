/**
 * AsyncStorage used to be a part of React Native, but the current RN documentation
 * suggests this package is used instead
 */
import AsyncStorage from '@react-native-community/async-storage';
import { fetchWeather, updateWeather } from '../actions/weather';

/**
 * Main business logic for fetching and saving/recalling weather info
 * is gathered in this class
 *
 * This "service" approach is something that has been used in my previous project,
 * so I decided to take on a familiar path
 *
 * All of the functions are written in such way to be used with redux-thunk
 */
class WeatherService {
  constructor() {
    // OpenWeatherMap API
    this.api = 'api.openweathermap.org/data/2.5/weather';
  }

  /**
   * Read previously saved weather from AsyncStorage.
   *
   * Makes an asynchronous call for AsyncStorage to get previously saved info.
   * If it exists, checks if new information has been received from the API by the time the call
   * is finished. If not, updated the redux state with previously saved data.
   */
  readWeatherFromStorage = async (dispatch, getState) => {
    try {
      const payload = await AsyncStorage.getItem('@weather');
      const state = getState();
      if (payload && !state.temperature && !state.humidity) {
        dispatch(updateWeather(payload));
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   * Fetch weather info from the OpenWeatherMap API.
   *
   * Uses the RN built-in geolocation API to get the current coordinates,
   * then fires off a request using fetch API to OpenWeatherMap to get the
   * weather info. Updates the redux state accordingly. Saves the updated info
   * into AsyncStorage.
   */
  fetchWeather = async dispatch => {
    dispatch(fetchWeather());
    try {
      navigator.geolocation.getCurrentPosition(
        pos => {
          // uri and options are for fetch()
          const uri = `${this.api}?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
          const options = {
            method: 'GET'
          };

          // Fetching the weather data from the api
          const response = await fetch(uri, options)
          // If there's an error, throw it to be caught by the handler below
          if(!response.ok) {
            throw(response.statusText)
          }

          // parsing the data json
          const weatherData = await response.json()
          const payload = {
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            lastFetched: new Date()
          }

          // dispatching the redux action to update the state
          dispatch(updateWeather(payload))
        },
        err => console.warn(err)
      );
    } catch (err) {
      console.warn(err);
    }
  };
}

const service = new WeatherService();
export default service;
