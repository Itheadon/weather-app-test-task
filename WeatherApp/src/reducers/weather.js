export default function weatherReducer(state, action) {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return {
        ...state,
        fetching: true
      };
    case 'UPDATE_WEATHER':
      return {
        fetching: false,
        lastFetched: action.payload.lastFetched || new Date(),
        temperature: action.payload.temperature,
        humidity: action.payload.humidity
      };
    case 'STOP_UPDATE':
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
}
