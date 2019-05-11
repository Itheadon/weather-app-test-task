import React, { Component } from 'react';
import { createStore } from 'react';
import { Provider } from 'react-redux';
import { Weather } from './Weather';
import weatherReducer from '../reducers/weather';

const initialState = {
  fetching: false,
  lastFetched: null,
  temperature: 0,
  humidity: 0
};

const store = createStore(weatherReducer, initialState);

class Test extends Component {
  render() {
    return (
      <Provider store={store}>
        <Weather />
      </Provider>
    );
  }
}

export default Test;
