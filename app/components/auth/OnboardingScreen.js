import React, {
  useEffect,
  useContext,
  useState
} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import PairUpContext from '../../config/PairUpContext'
const constants = require('../../styles/constants.js')

const SCREEN_MARGIN = 25

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: constants.teal,
  },
  image: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
    marginVertical: 32,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: SCREEN_MARGIN
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  aboutTitle: {
    alignItems: 'center',
  },
  aboutInstructionImageContainer: {
    alignItems: 'center',
  },
  aboutInstructionImage: {
    height: 80,
    width: 200,
  }
});

const slides = [
  {
    key: 'one',
    title: 'Notify',
    text: 'You\'ll receive a prompt with a thoughtful question. ' +
          'Make sure to enable notifications.',
    image: require('../../../resources/assets/onboarding/phone.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Reflect & Support',
    text: 'Answer the prompt with how you\'re doing. ' +
          'Then respond to you partner\'s answers.',
    image: require('../../../resources/assets/onboarding/stairs.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Grow',
    text: 'Find your footing in your new community. ' +
          'We\'ll track your progress as you advance!',
    image: require('../../../resources/assets/onboarding/chart.png'),
    backgroundColor: '#22bcb5',
  }
];

export default function OnboardingScreen({navigation}) {
  const context = useContext(PairUpContext)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    async function enableNotifications() {
      await context.registerForPushNotificationsAsync()
    }
    enableNotifications()
  }, [])

  //, {width: screenWidth - (SCREEN_MARGIN * 2)}]} />
  const renderItem = ({ item }) => (
    <View
      onLayout={(e) => { setScreenWidth(e.nativeEvent.layout.width) }}
      style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image}
             style={[styles.image]}/>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  )

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={context.onboarded}
      showPrevButton={true}/>
  )
}
