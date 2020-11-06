import React, {
  useContext,
  useState
} from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { changePassword } from '../../actions/authActions'
import PairUpContext from '../../config/PairUpContext'
const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

export default function ChangePasswordScreen({navigation}) {
  const context = useContext(PairUpContext)
  const [displayMessages, setDisplayMessages] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  function updatePasswordText(newPassword) {
    setPassword(newPassword)
    setDisplayMessages(false)
  }

  function verifyPassword(newPassword) {
    setDisplayMessages(false)
    setPasswordMatch(newPassword === password)
  }

  async function handleSubmit() {
    setDisplayMessages(true)
    await context.changePassword(password)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      contentContainerStyle={styles.wrapper}
      resetScrollToCoords={{x: 0, y: 0}}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <Text style={[styles.f_30, styles.colorPastelBlue]}>Change Password</Text>
        <Text style={styles.successMessage}>{displayMessages && context.state.changePasswordSuccessMessage}</Text>
        <Text style={styles.errorMessage}>{displayMessages && context.state.changePasswordFailureMessage}</Text>
        <TextInput
          onChangeText={(password1) => updatePasswordText(password1)}
          placeholder={'New Password'}
          secureTextEntry
          style={[styles.authInput, profileStyles.profileInput]}
        />
        <TextInput
          onChangeText={(password2) => verifyPassword(password2)}
          placeholder={'Verify New Password'}
          secureTextEntry
          style={[styles.authInput, passwordMatch ? null : styles.authInputIncorrect, profileStyles.profileInput]}
        />
        <TouchableHighlight
          style={styles.profileButton}
          onPress={() => handleSubmit()}>
          <Text style={styles.profileButtonText}> Change Password </Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  )
}
