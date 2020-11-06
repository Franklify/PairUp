import React from 'react'
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as constants from '../../../styles/constants.js'
const styles = require('../../../styles/styles.js')

export default function MessageSuggestions(props) {
  const iconSize = 20
  const iconColor = 'white'
  const suggestedMessagesRow1 = [
    {
      icon: (<FontAwesome name='road' size={iconSize} color={iconColor}/>),
      emoji: '🛣',
      message: 'I get what you’re going through.',
      type: 'emotionalSupport'
    },
    {
      icon: (<FontAwesome name='smile-o' size={iconSize} color={iconColor} />),
      emoji: '😀',
      message: 'I’m glad you’re here!',
      type: 'personalAppraisal'
    }
  ]
  const suggestedMessagesRow2 = [
    {
      icon: (<Entypo name='thumbs-up' size={iconSize} color={iconColor} />),
      emoji: '👍',
      message: 'Well done on that task!',
      type: 'workAppraisal'
    },
    {
      icon: (<Ionicons name='ios-paper' size={iconSize} color={iconColor} />),
      emoji: '📄',
      message: 'The work you’re doing is important!',
      type: 'valueAppraisal'
    }
  ]
  const suggestedMessagesRow3 = [
    {
      icon: (<Entypo name='tools' size={iconSize} color={iconColor} />),
      emoji: '🛠',
      message: 'What resources do you need?',
      type: 'instrumentalSupport'
    },
    {
      icon: (<Entypo name='chat' size={iconSize} color={iconColor} />),
      emoji: '💬',
      message: 'Can I offer any advice or ideas?',
      type: 'informationalSupport'
    }
  ]
  const suggestedMessagesRow4 = [
    {
      icon: (<FontAwesome name='coffee' size={iconSize} color={iconColor} />),
      emoji: '☕️',
      message: 'Want to meet for coffee?',
      type: 'coffee'
    },
    {
      icon: (<MaterialCommunityIcons name='human-greeting' size={iconSize} color={iconColor} />),
      emoji: '🙏',
      message: 'Thank you for your support!',
      type: 'gratitude'
    },
  ]

  function concatMessage(emoji, message) {
    let emojiSpace = emoji.concat(' ');
    return emojiSpace.concat(message);
  }

  function renderSuggestions(suggestions) {
    return suggestions.map((item) => {
      return (
        <TouchableHighlight
          key={item.type}
          onPress={() => props.onPressSuggestion(concatMessage(item.emoji, item.message))}
          underlayColor={'rgba(255,255,255,0)'}
        >
          <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, styles.flexRowCenter]}>
            <View style={{paddingLeft: 10}}>
              {item.icon}
            </View>
            <Text style={styles.sentMessageText}>{item.message}</Text>
          </View>
        </TouchableHighlight>
      )
    })
  }

  return (
    <View style={[styles.borderTop, styles.borderGray]}>
      <Text style={styles.smallHelpCenter}>Need suggestions? Use these examples: </Text>
      <ScrollView horizontal>
        <View style={styles.flexColumn}>
          <View style={styles.flexRowCenter}>{ renderSuggestions(suggestedMessagesRow1) }</View>
          <View style={styles.flexRowCenter}>{ renderSuggestions(suggestedMessagesRow2) }</View>
          <View style={styles.flexRowCenter}>{ renderSuggestions(suggestedMessagesRow3) }</View>
          <View style={styles.flexRowCenter}>{ renderSuggestions(suggestedMessagesRow4) }</View>
        </View>
      </ScrollView>
    </View>
  )
}

// <View style={[styles.flexRowCenter, {flexWrap: 'wrap'}]}>
// <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, {width: (this.props.screenWidth - 20) / 2}]}>
