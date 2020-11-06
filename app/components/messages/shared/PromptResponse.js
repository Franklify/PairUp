import React, { useState } from 'react'
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import MessageBubble from './MessageBubble'
const constants = require('../../../styles/constants.js')
const styles = require('../../../styles/styles.js')

export default function PromptResponse(props) {
  // Remove?
  const [modalVisible, setModalVisible] = useState(false)
  const [pressedBubbles, setPressedBubbles] = useState({})
  const [pressedResponses, setPressedResponses] = useState({})
  //
  const [promptAnswerText, setPromptAnswerText] = useState('')

  const prompt = props.data.promptInfo.message.length > 100 ? '"' + props.data.promptInfo.message.substr(0, 100) + '..."' : '"' + props.data.promptInfo.message + '"'
  const senderName = props.users[props.data.responseInfo.senderId].name

  // Remove?
  function changeModalVisibility(visible) {
    setModalVisible(visible)
  }

  function displayResponse() {
    const message = Object.assign({}, props.data, {
      message: props.data.responseInfo.response,
      senderId: props.data.responseInfo.senderId,
      nextSenderId: props.data.nextSenderId,
      prevSenderId: props.data.prevSenderId,
      timestamp: props.data.timestamp,
      prevMessageTimestamp: props.data.prevMessageTimestamp,
      nextMessageTimestamp: props.data.nextMessageTimestamp,
    })
    return(<MessageBubble users={props.users} senderId={props.senderId} message={message}/>)
  }

  function getResponsesOrTextInput() {
    if (props.data.promptInfo.responseOptions) {
      return (
        <View style={styles.flexColumnCenter}>
          <Text>ided some responses, wont show input</Text>
          {promptResponses()}
        </View>
      )
    }
    return (
      <View style={styles.flexRowCenter}>
        <TextInput
          multiline
          onChangeText={(promptAnswerText) => setPromptAnswerText(promptAnswerText)}
          placeholder={'Write your response here'}
          style={styles.promptAnswerInput}
          value={promptAnswerText}
        />
      </View>
    )
  }

  function promptResponses() {
    if (props.data.promptInfo.responseOptions) {
      return Object.entries(props.data.promptInfo.responseOptions).map(item =>
        (<View key={item[0]} style={[styles.promptResponseItem, pressedBubbles[item[0]] === true ? styles.responsePressed : null]}>
          <TouchableHighlight
            onPress={() => toggleBubblePress(item[0], item[1])}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <Text>{item[1]}</Text>
          </TouchableHighlight>
        </View>)
      )
    }
    return null
  }

  return (
    <View>
      <View style={styles.promptResponseContainer}>
        <Text style={styles.promptResponseHeader}>
          <Text style={{fontWeight: 'bold'}}>{senderName}</Text> responded to the prompt {prompt}
        </Text>
        {displayResponse()}
      </View>
    </View>
  )
}
