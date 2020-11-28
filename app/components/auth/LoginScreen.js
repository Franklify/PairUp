// Login component
import React, {
  useContext,
  useState
} from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native'

import PairUpContext from '../../config/PairUpContext'
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')

export default function LoginScreen({navigation}) {
  const context = useContext(PairUpContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)

  async function login() {
    await context.login(email, password)
  }

  function isIncomplete() {
    return (email === '' || password === '')
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
        <Image
          style={styles.authLogo}
          source={require('./../../../resources/assets/pairup_logo.png')}>
        </Image>
        {context.state.errorMessage &&
          <View style={styles.authErrorTextBanner}>
            <Text style={styles.authErrorText}>{context.state.errorMessage}</Text>
          </View>
        }
        <TextInput
          onChangeText={email => setEmail(email)}
          placeholder={'Email'}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={password => setPassword(password)}
          placeholder={'Password'}
          autoCompleteType={'password'}
          textContentType={'password'}
          secureTextEntry
          placeholderTextColor={constants.darkGrey}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <Pressable
          disabled={isIncomplete()}
          style={styles.authButton}
          onPress={() => login()}>
          <Text style={styles.authButtonText}>
            {context.state.isPending || context.state.isAuthenticated ? 'Logging In...' : 'Login'}
          </Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.authButtonSubtext}>{'New here? '}</Text>
          <Text
            onPress={() => navigation.navigate('Signup')}
            style={[styles.authButtonSubtext, {fontWeight: 'bold'}]}>
            {'Sign up.'}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
