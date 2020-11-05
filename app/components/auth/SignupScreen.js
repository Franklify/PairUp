// Signup component
import React, {
  useComponent,
  useContext,
  useState
} from 'react'
import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from 'react-native'

import PairUpContext from '../../config/PairUpContext'
const styles = require('../../styles/styles.js')

export default function SignupScreen({navigation}) {
  const context = useContext(PairUpContext)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState(true)
  const [screenWidth, setScreenWidth] = useState(0)

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{backgroundColor: 'white', flex: 1}}
    >
      <View
        onLayout={(e) => { setScreenWidth(e.nativeEvent.layout.width) }}
        style={styles.container}
      >
        <Text style={styles.authTitle}>New Account</Text>
        <Text style={styles.authErrorText}>{context.errorMessage}</Text>
        <TextInput
          onChangeText={(newFirstName) => setFirstName(newFirstName)}
          placeholder={'First Name'}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newLastName) => setLastName(newLastName)}
          placeholder={'Last Name'}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newEmail) => setEmail(newEmail)}
          placeholder={'Email Address'}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newPhoneNumber) => setPhoneNumber(newPhoneNumber)}
          placeholder={'Phone Number'}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newPassword) => setPassword(newPassword)}
          placeholder={'Password'}
          secureTextEntry
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(newPassword2) => setPasswordMatch(password == newPassword2)}
          placeholder={'Verify Password'}
          secureTextEntry
          style={[styles.authInput, passwordMatch ? null : styles.authInputIncorrect, {width: screenWidth - 20}]}
        />
        <Button
          onPress={() => context.signup(firstName, lastName, email, phoneNumber, password)}
          title={'Sign Up'}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
