import React, { Component } from 'react'
import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')
const welcomeStyles = require('./styles.js')

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dismissWelcomeCheckbox: false,
    }
  }

  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='home' size={26} color={tintColor} />
    ),
    tabBarLabel: 'Welcome'
  }

  componentDidMount() {
    this.props.registerForPushNotificationsAsync()
  }

  _renderStep3Text = () => {
    if (this.props.user.reflectionType === 'paired') {
      return <Text style={[styles.colorWhite]}>Chat with your partner about your reflections and give support!</Text>
    } else {
      return <Text style={[styles.colorWhite]}>Chat with your partner in the chat window tab!</Text>
    }
  }

  _toggleCheckbox () {
    this.setState({dismissWelcomeCheckbox: !this.state.dismissWelcomeCheckbox})
  }

  _goToHome () {
    NavigationActions.navigate({routeName: 'Home'})
  }

  _renderInstructionStep (stepNumber, icon, title, description) {
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
        <View style={welcomeStyles.instructionImageContainer}>
          <Image
            style={[styles.borderCurve, welcomeStyles.instructionImage]}
            source={imagePath}
          />
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={[styles.wrapper, styles.backgroundPastelBlue, {paddingTop: '15%'}]}>
        <View style={welcomeStyles.welcomeTitle}>
          <Text style={[styles.f_30, styles.colorWhite, {paddingBottom: 20}]}>Welcome to PairUp!</Text>
          <Text style={[styles.f_10, styles.colorWhite]}>An app to support mentor</Text>
          <Text style={[styles.f_10, styles.colorWhite]}>& mentee relationships</Text>
        </View>
        <View style={[styles.padding_10, {paddingBottom: 50}]}>

          {this._renderInstructionStep(
            1,
            'bell',
            'Notify',
            "You'll receive a notification for new prompts.",
          )}
          {this._renderInstructionStep(
            2,
            'note',
            'Answer',
            'Reflect on the question and answer.',
          )}
          {this._renderInstructionStep(
            3,
            'bubbles',
            'Support',
            "Respond to you partner's answers!",
          )}
        </View>
      </ScrollView>
    )
  }
}

export default Welcome
