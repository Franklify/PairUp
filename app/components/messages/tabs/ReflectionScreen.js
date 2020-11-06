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

export default function ReflectionScreen({navigation}) {
  const context = useContext(PairUpContext)
  const reflectionOnlyType = 'reflectionOnly'
  const reflectionOnlyThread = context.state.reflectionOnlyThread

  useEffect(() => {
    const threads = context.state.user.threads
    async function loadMessages() {
      await context.loadMessages(reflectionOnlyType, threads.reflectionOnly)
    }
    if (threads && threads.reflectionAndChat) {
      loadMessages()
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      {reflectionOnlyThread && reflectionOnlyThread.isReady
        ? <MessageThread
            user={context.state.user}
            focusedThread={reflectionOnlyThread}
            type={reflectionOnlyType}
          />
        : <LoadingScreen />
      }
    </View>
  )
}
