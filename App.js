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

  // Auth
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
      dispatch(ActionCreators.ActionCreators.loginSuccess(user))
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

  // Messages
  async function loadMessages (type, threadId) {
    try {
      // load existing messages
      dispatch(ActionCreators.ActionCreators.initialLoadMessagesAttempt())

      let threadInfo = (await db.ref('/threads/' + threadId).once('value')).val()
      const msgRef = db.ref('/messages/' + threadId).limitToLast(20)
      const msgObject = await msgRef.once('value')

      let msgs = []
      if (msgObject.val() !== null) {
        msgs = Object.keys(msgObject.val()).map(function (key) {
          return Object.assign({}, msgObject.val()[key], {key: key})
        })
      }

      let users = {}
      for (let userId in threadInfo.users) {
        const name = threadInfo.users[userId]
        const avatar = await db.ref('/users/' + userId + '/avatarIndex').once('value')
        const avatarIndex = avatar.val()
        users[userId] = {'name': name, 'avatarIndex': avatarIndex}
      }

      const focusedThread = {
        id: threadId,
        oldestMsgKey: msgs.length > 0 ? msgs[0].key : null,
        messages: msgs.reverse(),
        users: users,
      }

      if (type === 'chatOnly') {
        dispatch(ActionCreators.ActionCreators.initialLoadChatOnlyMessagesSuccess(focusedThread))
      } else if (type === 'reflectionOnly') {
        dispatch(ActionCreators.ActionCreators.initialLoadReflectionOnlyMessagesSuccess(focusedThread))
      } else {
        dispatch(ActionCreators.ActionCreators.initialLoadReflectionAndChatMessagesSuccess(focusedThread))
      }

      // listen for new messages
      try {
        dispatch(ActionCreators.ActionCreators.loadNewMessagesAttempt())
        let newMsgRef = db.ref('/messages/' + threadId).limitToLast(1)
        newMsgRef.on('child_added', function (data) {
          const newMessage = [Object.assign({}, data.val(), {key: data.key})]
          if (type === 'chatOnly') {
            dispatch(ActionCreators.ActionCreators.loadNewChatOnlyMessagesSuccess(newMessage))
          } else if (type === 'reflectionOnly') {
            dispatch(ActionCreators.ActionCreators.loadNewReflectionOnlyMessagesSuccess(newMessage))
          } else {
            dispatch(ActionCreators.ActionCreators.loadNewReflectionAndChatMessagesSuccess(newMessage))
          }
        })
      } catch (err) {
        console.log('loadNewMessages error', err)
        dispatch(ActionCreators.ActionCreators.loadNewMessagesFailure())
      }
    } catch (err) {
      console.log('loadMessages error', err)
      dispatch(ActionCreators.ActionCreators.intiailLoadMessagesFailure())
    }
  }

  async function loadOldMessages (type, threadId, oldestMsgKey) {
    try {
      dispatch(ActionCreators.ActionCreators.loadOldMessagesAttempt())
      const threadRef = db.ref('/messages/' + threadId).orderByKey().endAt(oldestMsgKey).limitToLast(21)
      const msgObject = await threadRef.once('value')
      let msgs = Object.keys(msgObject.val()).map(function (key) {
        return Object.assign({}, msgObject.val()[key], {key: key})
      })
      msgs.pop()
      const oldMessages = {
        oldestMsgKey: msgs.length > 0 ? msgs[0].key : null,
        messages: msgs.reverse()
      }
      if (type === 'chatOnly') {
        dispatch(ActionCreators.ActionCreators.loadOldChatOnlyMessagesSuccess(oldMessages))
      } else if (type === 'reflectionOnly') {
        dispatch(ActionCreators.ActionCreators.loadOldReflectionOnlyMessagesSuccess(oldMessages))
      } else {
        dispatch(ActionCreators.ActionCreators.loadOldReflectionAndChatMessagesSuccess(oldMessages))
      }
    } catch (err) {
      console.log(err)
      dispatch(ActionCreators.ActionCreators.loadOldMessagesFailure())
    }
  }

  async function loadThreadList () {
    try {
      dispatch(ActionCreators.ActionCreators.loadThreadListAttempt())

      const uid = fb.auth().currentUser.uid
      let userThreadsRef = db.ref('/users/' + uid + '/threads')
      let threads = []

      userThreadsRef.on('value', async function (snapshot) {
        const userThreads = snapshot.val()
        for (let id in userThreads) {
          const threadRefString = '/threads/' + id.toString()
          const info = await db.ref(threadRefString).once('value')
          if (info.val().title) {
            let title = info.val().title
          } else {
            let names = []
            let users = {}
            const userids = Object.keys(info.val().users)
            for (var i in userids) {
              const firstName = await db.ref('/users/' + userids[i] + '/firstName').once('value')
              const lastName = await db.ref('/users/' + userids[i] + '/lastName').once('value')
              const name = firstName.val() + ' ' + lastName.val()
              const avatar = await db.ref('/users/' + userids[i] + '/avatarIndex').once('value')
              const avatarIndex = avatar.val()
              users[userids[i]] = {'name': name, 'avatarIndex': avatarIndex}
              if (userids[i] !== uid) names.push(name)
            }
            title = names.join(', ')
          }
          threads.push({
            id: id,
            users: users,
            lastMessage: info.val().last_message,
            title: title
          })
        }
        dispatch(ActionCreators.ActionCreators.loadThreadListSuccess(threads))
      })
    } catch (err) {
      console.log(err)
      dispatch(ActionCreators.ActionCreators.loadThreadListFailure())
    }
  }

  async function sendMessage (message, senderId, senderDisplayName, threadId) {
    try {
      dispatch(ActionCreators.ActionCreators.sendMessageAttempt())
      let updates = {}

      const prevMsg = await db.ref('/messages/' + threadId).limitToLast(1).once('value')

      let prevMsgKey = null
      let updatedPrevMsg = {
        senderId: null,
        timestamp: null,
      }
      if (prevMsg.val() !== null) {
        prevMsgKey = Object.keys(prevMsg.val())[0]
        updatedPrevMsg = Object.assign({}, prevMsg.val()[prevMsgKey], {
          nextSenderId: senderId,
          nextMessageTimestamp: Date.now()
        })
        updates['/messages/' + threadId + '/' + prevMsgKey] = updatedPrevMsg
      }

      const newMsgKey = db.ref('/messages').push().key
      const newMsgData = {
        message: message,
        senderId: senderId,
        senderDisplayName: senderDisplayName,
        timestamp: Date.now(),
        prevSenderId: updatedPrevMsg.senderId,
        prevMessageTimestamp: updatedPrevMsg.timestamp
      }

      updates['/messages/' + threadId + '/' + newMsgKey] = newMsgData
      updates['/threads/' + threadId + '/last_message'] = newMsgData

      await db.ref().update(updates)
      dispatch(ActionCreators.ActionCreators.sendMessageSuccess())
    } catch (err) {
      console.log('send message error', err.message)
      dispatch(ActionCreators.ActionCreators.sendMessageFailure())
    }
  }

  async function submitPromptResponse (prompt, response, senderId, threadId) {
    try {
      dispatch(ActionCreators.ActionCreators.submitPromptResponseAttempt())

      console.log('inputs', prompt, response, senderId, threadId)

      const prevMsg = await db.ref('/messages/' + threadId).limitToLast(1).once('value')
      const prevMsgKey = Object.keys(prevMsg.val())[0]
      const updatedPrevMsg = Object.assign({}, prevMsg.val()[prevMsgKey], {
        nextSenderId: 'promptResponse',
        nextMessageTimestamp: Date.now()
      })

      const promptInfo = {
        key: prompt.key,
        message: prompt.message,
      }

      let responseInfo = {
        senderId: senderId,
      }
      responseInfo['response'] = response

      const promptObj = await db.ref('/messages/' + threadId + '/' + prompt.key).once('value')
      let promptUpdate = {}
      promptUpdate[senderId] = responseInfo.response
      const updatedPrompt = Object.assign({}, promptObj.val(), {
        responses: promptObj.val().responses ? Object.assign({}, promptObj.val().responses, promptUpdate) : promptUpdate
      })

      const newMsgKey = db.ref('/messages').push().key
      const newMsgData = {
        type: 'promptResponse',
        senderId: 'promptResponse',
        promptInfo: promptInfo,
        responseInfo: responseInfo,
        timestamp: Date.now(),
        prevSenderId: updatedPrevMsg.senderId,
        prevMessageTimestamp: updatedPrevMsg.timestamp
      }

      let updates = {}
      updates['/messages/' + threadId + '/' + prevMsgKey] = updatedPrevMsg
      updates['/messages/' + threadId + '/' + newMsgKey] = newMsgData
      updates['/messages/' + threadId + '/' + prompt.key] = updatedPrompt

      await db.ref().update(updates)
    } catch (err) {
      console.log(err)
      dispatch(ActionCreators.ActionCreators.submitPromptResponseFailure())
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
    changePassword,
    loadMessages,
    loadOldMessages,
    loadThreadList,
    sendMessage,
    submitPromptResponse
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
