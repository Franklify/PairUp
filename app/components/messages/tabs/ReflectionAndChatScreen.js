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

export default function ReflectionAndChatScreen({navigation}) {
  const context = useContext(PairUpContext)
  const reflectionAndChatType = 'reflectionAndChat'
  const reflectionAndChatThread = context.state.reflectionAndChatThread

  useEffect(() => {
    const threads = context.state.user.threads
    async function loadMessages() {
      await context.loadMessages(reflectionAndChatType, threads.reflectionAndChat)
    }
    if (threads && threads.reflectionAndChat) {
      loadMessages()
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      {reflectionAndChatThread && reflectionAndChatThread.isReady
        ? <MessageThread
            user={context.state.user}
            focusedThread={reflectionAndChatThread}
            type={reflectionAndChatType}
          />
        : <LoadingScreen />
      }
    </View>
  )
}
