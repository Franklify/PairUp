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
const styles = require('../../../styles/styles.js')

export default function ChatScreen({navigation}) {
  const context = useContext(PairUpContext)
  const chatOnlyType = 'chatOnly'
  const chatOnlyThread = context.state.chatOnlyThread

  useEffect(() => {
    const threads = context.state.user.threads
    async function loadMessages() {
      await context.loadMessages(chatOnlyType, threads.chatOnly)
    }
    if (threads && threads.chatAndChat) {
      loadMessages()
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      {chatOnlyThread && chatOnlyThread.isReady
        ? <MessageThread
            user={context.state.user}
            focusedThread={chatOnlyThread}
            type={chatOnlyType}
          />
        : <LoadingScreen />
      }
    </View>
  )
}
