import React, {
  useContext,
  useEffect
} from 'react'
import {
  Text,
  View,
} from 'react-native'
import PairUpContext from '../../../config/PairUpContext'
import MessageThread from './../shared/MessageThread'
import LoadingScreen from '../../shared/LoadingScreen'
import UnpairedScreen from '../shared/UnpairedScreen'
const styles = require('../../../styles/styles.js')

export default function ChatScreen({navigation}) {
  const context = useContext(PairUpContext)
  const chatOnlyType = 'chatOnly'
  const chatOnlyThread = context.state.chatOnlyThread

  useEffect(() => {
    const user = context.state.user
    async function loadMessages(chatOnly) {
      await context.loadMessages(chatOnlyType, chatOnly)
    }
    if (user && user.threads && user.threads.chatOnly) {
      loadMessages(user.threads.chatOnly)
    }
  }, []);

  function getPairUser() {
    const users = chatOnlyThread.users
    if (users) {
      for (userKey in users) {
        if (userKey != context.state.user.uid) {
          return users[userKey]
        }
      }
    }
    return null
  }

  return (
    <View style={styles.wrapper}>
      {chatOnlyThread && chatOnlyThread.isReady
        ? <MessageThread
            user={context.state.user}
            pairUser={getPairUser()}
            focusedThread={chatOnlyThread}
            type={chatOnlyType}
          />
        : <LoadingScreen />
      }
    </View>
  )
}
