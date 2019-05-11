import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { WeatherService } from '../../services';
import styles from './styles';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(WeatherService.fetchWeather())
  }

  render() {
    const { fetching, lastFetched, temperature, humidity } = this.props;

    return !lastFetched ? (
      <SafeAreaView style={styles.emptyView}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={fetching} onRefresh={this.refresh} />}
        >
          <Text style={styles.header}>Weather at your location</Text>
          <Text style={styles.info}>Temperature: {temperature}ºC</Text>
          <Text style={styles.info}>Humidity: {humidity}%</Text>
          <Text style={styles.info}>Last fetched: {lastFetched}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  lastFetched: state.lastFetched,
  temperature: state.temperature,
  humidity: state.humidity
});

export default connect(mapStateToProps)(Weather);
