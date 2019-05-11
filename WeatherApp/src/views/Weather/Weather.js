import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './styles';

class Weather extends Component {
  componentWillMount() {

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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Weather;
