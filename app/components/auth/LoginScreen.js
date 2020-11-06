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
const styles = require('../../styles/styles.js')

export default function LoginScreen({navigation}) {
  const context = useContext(PairUpContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [screenWidth, setScreenWidth] = useState(0)

  async function login() {
    await context.login(email, password)
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
          style={{width: 200, height: 200}}
          source={require('./../../../resources/pairup_logo.png')}>
        </Image>
        <Text style={styles.authErrorText}>{context.state.errorMessage}</Text>
        <TextInput
          onChangeText={email => setEmail(email)}
          placeholder={'Email Address'}
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <TextInput
          onChangeText={password => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry
          style={[styles.authInput, {width: screenWidth - 20}]}
        />
        <Pressable
          style={styles.authButton}
          onPress={() => login()}>
          <Text style={styles.authButtonText}>
            {context.state.isPending || context.state.isAuthenticated ? 'Logging In...' : 'Login'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}
