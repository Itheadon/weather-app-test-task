/**
 * This is the root component for the app
 * Redux initialisation, as well as location permission requests are here
 */
import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Weather } from './views/Weather';
import weatherReducer from './reducers/weather';
import { WeatherService } from './services';

const initialState = {
  fetching: false,
  lastFetched: null,
  temperature: 0,
  humidity: 0
};

const store = createStore(weatherReducer, initialState, applyMiddleware(thunk));
// Reading the previously saved weather data from AsyncStorage to prepopulate the state during the initial load
store.dispatch(WeatherService.readWeatherFromStorage())

class Test extends Component {
  constructor(props) {
    super(props);

    /**
     * iOS shows the permission dialogue whenever geolocation is (first) used
     * On Android it has to be done manually via the PermissionsAndroid API
     * On Android Platform.Version corresponds to Android API. This check is only required on Android API >= 23
     */
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      this.requestLocationPermission();
    }
  }

  /**
   * Requests fine location permission on Android devices.
   */
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'The app requires location permission for gathering weather information at your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        store.dispatch(WeatherService.fetchWeather())
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Weather />
      </Provider>
    );
  }
}

export default Test;
