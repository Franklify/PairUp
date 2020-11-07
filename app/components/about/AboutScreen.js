import React, {
  useContext,
  useEffect
} from 'react'
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native'
import PairUpContext from '../../config/PairUpContext'
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')
const aboutStyles = require('./styles.js')

export default function AboutScreen({navigation}) {
  const context = useContext(PairUpContext)

  useEffect(() => {
    context.registerForPushNotificationsAsync()
  }, []);

  // function renderStep3Text() {
  //   if (context.state.user.reflectionType === 'paired') {
  //     return <Text style={[styles.colorWhite]}>Chat with your partner about your reflections and give support!</Text>
  //   } else {
  //     return <Text style={[styles.colorWhite]}>Chat with your partner in the chat window tab!</Text>
  //   }
  // }

  function renderInstructionStep(stepNumber, icon, title, description) {
    const imagePath = stepNumber == 1 ?
      require('../../../resources/Screenshots/step1.png') :
        stepNumber == 2 ?
          require('../../../resources/Screenshots/step2.png') :
          require('../../../resources/Screenshots/step3.png')
    return (
      <View style={styles.padding_10}>
        <View style={styles.flexRowCenter}>
          <SimpleLineIcons name={icon} size={25} color='white' />
          <Text style={[styles.f_20, styles.padding_10, styles.colorWhite]}>
          Step {stepNumber}: {title}
          </Text>
        </View>
        <Text style={[styles.f_15, styles.colorWhite, {paddingBottom: 10}]}>
          {description}
        </Text>
        <View style={aboutStyles.aboutInstructionImageContainer}>
          <Image
            style={[styles.borderCurve, aboutStyles.aboutInstructionImage]}
            source={imagePath}
          />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={[styles.wrapper, styles.backgroundPastelBlue, {paddingTop: '15%'}]}>
      <View style={aboutStyles.aboutTitle}>
        <Text style={[styles.f_30, styles.colorWhite, {paddingBottom: 20}]}>Welcome to PairUp!</Text>
        <Text style={[styles.f_10, styles.colorWhite]}>An app to support mentor</Text>
        <Text style={[styles.f_10, styles.colorWhite]}>& mentee relationships</Text>
      </View>
      <View style={[styles.padding_10, {paddingBottom: 50}]}>

        {renderInstructionStep(
          1,
          'bell',
          'Notify',
          "You'll receive a notification for new prompts.",
        )}
        {renderInstructionStep(
          2,
          'note',
          'Answer',
          'Reflect on the question and answer.',
        )}
        {renderInstructionStep(
          3,
          'bubbles',
          'Support',
          "Respond to you partner's answers!",
        )}
      </View>
    </ScrollView>
  )
}
