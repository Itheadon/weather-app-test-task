/**
 * The Weather App Test Task
 * Further comments are in the codes in ./src
 * 
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Main from './src/index';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Main />;
  }
}
