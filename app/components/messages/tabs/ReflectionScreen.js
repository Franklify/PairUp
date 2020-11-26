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

export default function ReflectionScreen({navigation}) {
  const context = useContext(PairUpContext)
  const reflectionOnlyType = 'reflectionOnly'
  const reflectionOnlyThread = context.state.reflectionOnlyThread

  useEffect(() => {
    const user = context.state.user
    async function loadMessages(reflectionOnly) {
      await context.loadMessages(reflectionOnlyType, reflectionOnly)
    }
    if (user && user.threads && user.threads.reflectionOnly) {
      loadMessages(user.threads.reflectionOnly)
    }
  }, []);

  function getPairUser() {
    const users = reflectionOnlyThread.users
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
      {reflectionOnlyThread && reflectionOnlyThread.isReady
        ? <MessageThread
            user={context.state.user}
            pairUser={getPairUser()}
            focusedThread={reflectionOnlyThread}
            type={reflectionOnlyType}
          />
        : <LoadingScreen />
      }
    </View>
  )
}
