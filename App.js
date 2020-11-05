import 'react-native-gesture-handler';
import React, { useReducer } from 'react'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import * as ActionCreators from './app/actions'
import RootStackScreen from './app/config/PairUpNavigator'
import PairUpContext, { InitialState } from './app/config/PairUpContext'
import PairUpReducers from './app/reducers'
import * as authReducers from './app/reducers/authReducers'
import fb from './app/config/initializeFirebase'

const db = fb.database()
const reactNative = require('react-native');
const {
  AsyncStorage
} = reactNative;

const PairUpApp = () => {
  const [state, dispatch] = useReducer(PairUpReducers, InitialState)

  async function login(email, password) {
    try {
      dispatch(ActionCreators.ActionCreators.loginAttempt())
      const emailStorage = ["email", email]
      const passwordStorage = ["password", password]
      AsyncStorage.multiSet([emailStorage, passwordStorage]);

      const response = await fb.auth().signInWithEmailAndPassword(email, password)
      const responseUser = response.user
      const userInfo = ( await db.ref('/users/' + responseUser.uid).once('value') ).val()
      const user = {
        displayName: responseUser.displayName || userInfo.displayName,
        email: response.email || userInfo.email,
        emailVerified: responseUser.emailVerified,
        avatarIndex: userInfo.avatarIndex,
        firstName: userInfo.firstName,
        providerData: responseUser.providerData,
        refreshToken: responseUser.refreshToken,
        reflectionType: userInfo.reflectionType,
        showAbout: userInfo.showAbout,
        threads: userInfo.threads,
        uid: responseUser.uid
      }
      //console.log('fb user: ' + user)
      dispatch(ActionCreators.ActionCreators.loginSuccess(user))
      if (userInfo.reflectionType === 'paired') {
        console.log('Going PAIRED')
        CommonActions.navigate({name: 'PairedHome'})
      } else {
        console.log('Going SOLO')
        CommonActions.navigate({name: 'SoloHome'})
      }
    } catch (error) {
      console.log('could not log in: ' + error.message)
      dispatch(ActionCreators.ActionCreators.loginFailure(error.message))
    }
  }

  const registerForPushNotificationsAsync = () => {
    return async function (dispatch) {
      try {
        dispatch(ActionCreators.ActionCreators.registerPushAttempt())

        const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
          finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          console.log('push failure - user did not grant permissions')
          dispatch(ActionCreators.ActionCreators.registerPushFailure())
        }

        // Get the token that uniquely identifies this device
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('got token', token)

        const updates = {}
        const user = fb.auth().currentUser;
        let userInfo = (await db.ref('/users/' + user.uid).once('value')).val()
        const newUserInfo = Object.assign({}, userInfo, {
          pushToken: token
        })
        updates['/users/' + user.uid] = newUserInfo
        await db.ref().update(updates)
        dispatch(ActionCreators.ActionCreators.registerPushSuccess())
      } catch (err) {
        console.log('push failure', err.message)
        dispatch(ActionCreators.ActionCreators.registerPushFailure())
      }
    }
  }

  async function signup(firstName, lastName, email, phoneNumber, password) {
    try {
      dispatch(ActionCreators.ActionCreators.signupAttempt())
      const response = await fb.auth().createUserWithEmailAndPassword(email, password)
      const displayName = {displayName: firstName + ' ' + lastName}
      await response.updateProfile(displayName)

      const user = {
        displayName: response.displayName,
        email: response.email,
        emailVerified: response.emailVerified,
        providerData: response.providerData,
        refreshToken: response.refreshToken,
        uid: response.uid
      }

      await db.ref('/users/' + response.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone_number: phoneNumber,
        avatarIndex: "None",
      })
      dispatch(ActionCreators.ActionCreators.signupSuccess(user))
    } catch (error) {
      console.log(error.message)
      dispatch(ActionCreators.ActionCreators.signupFailure(error.message))
    }
  }

  async function logout() {
    console.log("logging out...")
    AsyncStorage.multiRemove(['email', 'password']);
    try {
      dispatch(ActionCreators.ActionCreators.logoutAttempt())
    } catch (error) {
      const errorMessage = error.message
      console.log('logout failure', errorMessage)
    }
  }

  function switchLoginToSignup() {
    dispatch(ActionCreators.ActionCreators.switchLoginSignup())
  }

  async function changeAvatar(avatarIndex) {
    try {
      dispatch(ActionCreators.ActionCreators.changeAvatarAttempt())

      const updates = {}
      const user = fb.auth().currentUser;
      const userInfo = (await db.ref('/users/' + user.uid).once('value')).val()
      const newUserInfo = Object.assign({}, userInfo, {
        avatarIndex: avatarIndex
      })
      updates['/users/' + user.uid] = newUserInfo
      await db.ref().update(updates)

      const successMessage = 'Avatar change successful!'
      dispatch(ActionCreators.ActionCreators.changeAvatarSuccess(successMessage, avatarIndex))
    } catch (error) {
      const errorMessage = error.message
      console.log('change avatar failure', errorMessage)
      dispatch(ActionCreators.ActionCreators.changeAvatarFailure(errorMessage))
    }
  }

  async function changePassword(password) {
    try {
      dispatch(ActionCreators.ActionCreators.changePasswordAttempt())

      const user = fb.auth().currentUser;
      await user.updatePassword(password)

      const successMessage = 'Password change successful!'
      dispatch(ActionCreators.ActionCreators.changePasswordSuccesss(successMessage))
    } catch (error) {
      const errorMessage = error.message
      console.log('change password failure', errorMessage)
      dispatch(ActionCreators.ActionCreators.changePasswordFailure(errorMessage))
    }
  }

  const value = {
    state,
    login,
    registerForPushNotificationsAsync,
    signup,
    logout,
    switchLoginToSignup,
    changeAvatar,
    changePassword
  }

  return (
    <PairUpContext.Provider value={value}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </PairUpContext.Provider>
  )
}

export default PairUpApp
