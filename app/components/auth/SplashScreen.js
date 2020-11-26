// Splash component
import React, { Component } from 'react'
import {
  Image,
  Text,
  View
} from 'react-native'
const styles = require('../../styles/styles.js')

export default function SplashScreen() {
  return (
    <View style={styles.loggingInContainer}>
      <Image
        style={styles.loggingInGif}
        source={require('./../../../resources/assets/pairup_splash.gif')}/>
    </View>
  );
}
