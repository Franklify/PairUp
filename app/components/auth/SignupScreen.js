// Signup component
import React, {
  useComponent,
  useContext,
  useState
} from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native'
import * as Linking from 'expo-linking';

import PairUpContext from '../../config/PairUpContext'
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')

const TERMS_URL = 'https://docs.google.com/document/d/1E1lmsxeETrSQdUgGo8mqVDefTwU41bXzQo4g721DCgo/edit?usp=sharing'

export default function SignupScreen({navigation}) {
  const context = useContext(PairUpContext)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)
  const [acceptTermsToggle, setAcceptTermsToggle] = useState(false)

  function isIncomplete() {
    return (
      firstName === '' || lastName === '' || email === '' || password === '' || !acceptTermsToggle
    )
  }

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{backgroundColor: 'white', flex: 1}}
    >
      <View
        onLayout={(e) => { setScreenWidth(e.nativeEvent.layout.width) }}
        style={[styles.container, styles.authContainerColor]}
      >
        <Text style={[styles.authTitle, {width: screenWidth - 20}]}>Welcome</Text>
        {context.state.errorMessage &&
          <View style={styles.authErrorTextBanner}>
            <Text style={styles.authErrorText}>{context.state.errorMessage}</Text>
          </View>
        }
        <TextInput
          onChangeText={(newFirstName) => setFirstName(newFirstName)}
          placeholder={'First Name'}
          autoCapitalize={'words'}
          autoCompleteType={'name'}
          textContentType={'givenName'}
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newLastName) => setLastName(newLastName)}
          placeholder={'Last Name'}
          autoCapitalize={'words'}
          autoCompleteType={'name'}
          textContentType={'familyName'}
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newEmail) => setEmail(newEmail)}
          placeholder={'Email'}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newPassword) => setPassword(newPassword)}
          placeholder={'Password'}
          autoCompleteType={'password'}
          textContentType={'newPassword'}
          secureTextEntry
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <View style={styles.acceptTerms}>
          <Switch
            trackColor={{ false: constants.mediumGray, true: constants.deepBlue }}
            thumbColor={acceptTermsToggle ? constants.parachuteYellow : 'white'}
            ios_backgroundColor={'#3e3e3e'}
            onValueChange={(hasAccepted) => setAcceptTermsToggle(hasAccepted)}
            value={acceptTermsToggle}
          />
          <View style={styles.acceptTermsTextContainer}>
            <Text style={styles.acceptTermsText}>{'I accept the '}</Text>
            <Text style={[styles.acceptTermsText, {textDecorationLine: 'underline'}]}
                  onPress={() => Linking.openURL(TERMS_URL)}>
                  {'Terms of Use'}
            </Text>
          </View>
        </View>
        <Pressable
          disabled={isIncomplete()}
          style={[styles.authButton, {opacity: isIncomplete() ? .5 : 1}]}
          onPress={() => context.signup(firstName, lastName, email, password)}>
          <Text style={styles.authButtonText}> Sign Up </Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.authButtonSubtext}>{'Not new here? '}</Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={[styles.authButtonSubtext, {fontWeight: 'bold'}]}>
            {'Log in.'}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
