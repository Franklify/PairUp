import React, {
  useEffect,
  useState
} from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import * as constants from '../../../styles/constants.js'
const styles = require('../../../styles/styles.js')

const avatarNeutral = require('../../../../resources/avatars/avatar_general.png')
const avatarImages = [
  // Women straight hair
  require('../../../../resources/avatars/avatar_female_straight_black.png'),
  require('../../../../resources/avatars/avatar_female_straight_black_glasses.png'),
  require('../../../../resources/avatars/avatar_brown_female_straight_black.png'),
  require('../../../../resources/avatars/avatar_brown_female_straight_black_glasses.png'),
  require('../../../../resources/avatars/avatar_female_straight_brunette.png'),
  require('../../../../resources/avatars/avatar_female_straight_brunette_glasses.png'),
  require('../../../../resources/avatars/avatar_female_straight_blond.png'),
  require('../../../../resources/avatars/avatar_female_straight_blond_glasses.png'),

  // Women braided hair
  require('../../../../resources/avatars/avatar_white_female_braided_black.png'),
  require('../../../../resources/avatars/avatar_white_female_braided_black_glasses.png'),
  require('../../../../resources/avatars/avatar_brown_female_braided_black.png'),
  require('../../../../resources/avatars/avatar_brown_female_braided_black_glasses.png'),
  require('../../../../resources/avatars/avatar_white_female_braided_brunette.png'),
  require('../../../../resources/avatars/avatar_white_female_braided_brunette_glasses.png'),
  require('../../../../resources/avatars/avatar_white_female_braided_blond.png'),
  require('../../../../resources/avatars/avatar_white_female_braided_blond_glasses.png'),

  // Men short hair
  require('../../../../resources/avatars/avatar_white_short_black.png'),
  require('../../../../resources/avatars/avatar_white_short_black_glasses.png'),
  require('../../../../resources/avatars/avatar_brown_short_black.png'),
  require('../../../../resources/avatars/avatar_brown_short_black_glasses.png'),
  require('../../../../resources/avatars/avatar_white_short_brunette.png'),
  require('../../../../resources/avatars/avatar_white_short_brunette_glasses.png'),
  require('../../../../resources/avatars/avatar_white_short_blond.png'),
  require('../../../../resources/avatars/avatar_white_short_blond_glasses.png'),

  // Men long hair
  require('../../../../resources/avatars/avatar_white_long_black.png'),
  require('../../../../resources/avatars/avatar_white_long_black_glasses.png'),
  require('../../../../resources/avatars/avatar_white_long_brunette.png'),
  require('../../../../resources/avatars/avatar_white_long_brunette_glasses.png'),
  require('../../../../resources/avatars/avatar_white_long_blond.png'),
  require('../../../../resources/avatars/avatar_white_long_blond_glasses.png')
]

export default function MessageBubble(props) {
  const [bubblePressed, setBubblePressed] = useState(false)

  const sender = props.users[props.message.senderId]
  // state variables
  const isOwnMessage = props.message.senderId === props.senderId
  const isSameSenderAsNext = props.message.senderId === props.message.nextSenderId
  const isSameSenderAsPrev = props.message.senderId === props.message.prevSenderId

  // variables calculated from state
  const bubbleStyle = isOwnMessage ? styles.sentMessage : styles.receivedMessage
  const bubbleTextStyle = isOwnMessage ? styles.sentMessageText : styles.receivedMessageText
  let timestamp = parseTimestamp()

  // components
  let date = renderDate()
  let isSameDayAsNext = !notSameDayAsNext()
  const avatarImage = (sender.avatarIndex && sender.avatarIndex !== "None")
      ? avatarImages[parseInt(sender.avatarIndex)]
      : avatarNeutral
  const avatar = !isOwnMessage && (!isSameSenderAsNext || (isSameSenderAsNext && !isSameDayAsNext))
    ? (<Image style={[styles.messageAvatar, styles.messageAvatarImage]} source={avatarImage}/>)
    // ? null
    : null

  const senderName = !isOwnMessage && (!isSameSenderAsPrev || date !== null)
   ? (<Text style={styles.receivedMessageSender}>{sender.name}</Text>)
   : null

  const wrapperStyle = !isOwnMessage ? !isSameSenderAsNext || avatar !== null ? [styles.receivedMsgBubbleWrapper, styles.receivedMsgWithAvatar] : [styles.receivedMsgBubbleWrapper] : styles.sentMsgBubbleWrapper


  useEffect(() => {
    timestamp = () => parseTimestamp()
    date = () => renderDate()
    isSameDayAsNext = () => sameDayAsNext()
  }, [props.message]);

  function parseTimestamp() {
    let time = new Date(props.message.timestamp)
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  function renderDate() {
    let currDate = new Date(props.message.timestamp)
    const prevDate = new Date(props.message.prevMessageTimestamp)
    return props.message.timestamp - props.message.prevMessageTimestamp > 86400000 || currDate.getDay() !== prevDate.getDay()
      ? <Text style={styles.messageDate}>{currDate.toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}).toUpperCase()}</Text>
      : null
  }

  function renderTimestampLeft() {
    return isOwnMessage
      ? (<View>
        <Text style={styles.messageTimestamp}>{parseTimestamp()}</Text>
      </View>)
      : null
  }

  function renderTimestampRight() {
    return !isOwnMessage
      ? <View><Text style={styles.messageTimestamp}>{parseTimestamp()}</Text></View>
      : null
  }

  function notSameDayAsNext() {
    const currDate = new Date(props.message.timestamp)
    const nextDate = new Date(props.message.nextMessageTimestamp)
    return nextDate !== null && (props.message.nextMessageTimestamp - props.message.timestamp > 86400000 || currDate.getDay() !== nextDate.getDay())
  }

  function toggleBubblePress() {
    setBubblePressed(!bubblePressed)
  }

  return (
    <View>
      {date}
      {senderName}
      <View style={wrapperStyle}>
        <View>
          <View style={styles.flexRowEnd}>
            {avatar}
            <TouchableHighlight
              onPress={() => toggleBubblePress()}
              underlayColor={'rgba(0,0,0,0)'}
            >
              <View style={[styles.messageBubble, bubbleStyle]}>
                <Text style={bubbleTextStyle}>{props.message.message}</Text>
              </View>
            </TouchableHighlight>
          </View>
          {bubblePressed ? <Text style={styles.messageTimestamp}>{timestamp}</Text> : null}
        </View>
      </View>
    </View>
  )
}
