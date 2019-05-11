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
        lastFetched: action.payload.date,
        temperature: action.payload.temperature,
        humidity: action.payload.humidity
      };
    default:
      return state;
  }
}
