import React from 'react'
import {
  Text,
  View,
} from 'react-native'
const styles = require('../../../styles/styles.js')

export default function UnpairedScreen() {
  return (
    <View style={styles.notPairedMessageContainer}>
      <Text style={styles.notPairedMessage}> Not paired with anyone.</Text>
     </View>
  )
}
