import { AsyncStorage } from 'react-native'

class WeatherService {
  constructor() {
    this.api = 'api.openweathermap.org/data/2.5/weather'
  }

  readWeatherFromStorage = async dispatch => {
    
  }
}

const service = new WeatherService()
export default service