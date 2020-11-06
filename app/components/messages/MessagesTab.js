import React, {
  useContext,
  useEffect
} from 'react'
import {
  View
} from 'react-native'
import MessagesList from './MessagesList'
import { Entypo } from '@expo/vector-icons'
const styles = require('../../styles/styles.js')

export default function MessagesTab(prop)) {
  const context = useContext(PairUpContext)

  useEffect(() => {
    async function loadThreadList() {
      await context.loadThreadList()
    }
    loadThreadList()
  }, []);

  return (
    <View style={styles.wrapper}>
      <MessagesList loadMessages={props.loadMessages} dataSource={props.threads.threads} />
    </View>
  )
}
