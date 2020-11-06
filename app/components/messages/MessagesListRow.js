import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import PairUpContext from '../../config/PairUpContext'
import * as constants from '../../styles/constants.js'
const styles = require('../../styles/styles.js')

export default function MessagesListRow(props) {
  const context = useContext(PairUpContext)
  const lastMessage = props.threadInfo.lastMessage
  const [title, setTitle] = useState(props.threadInfo.title)
  const [messagePreview, setMessagePreview] = useState(lastMessage ? lastMessage.message : '')


  useEffect(() => {
    setTitle(props.threadInfo.title)
    setMessagePreview(props.threadInfo.lastMessage.message)
  }, [props.threadInfo]);

  render () {
    return (
      <TouchableHighlight
        onPress={() => context.loadMessages(props.threadInfo)}
        underlayColor={'rgba(0,0,0,0.5)'}
      >
        <View style={styles.messageListRow}>
          <MaterialInitials backgroundColor={constants.mediumGray} color={'white'} single={false} size={constants.messageListAvatarSize} text={title} />
          <View style={styles.messageListTextWrapper}>
            <Text style={styles.messageListRowTitle}>{title}</Text>
            <Text style={styles.messageListRowPreview}>{messagePreview}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
