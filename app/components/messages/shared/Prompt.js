import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import PairUpContext from '../../../config/PairUpContext'
const PairUpIcon = require('../../../../resources/pairup_icon.png')
const constants = require('../../../styles/constants.js')
const styles = require('../../../styles/styles.js')

export default function Prompt(props) {
  const context = useContext(PairUpContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [pressedBubbles, setPressedBubbles] = useState({})
  const [pressedResponses, setPressedResponses] = useState({})
  const [promptAnswerText, setPromptAnswerText] = useState('')

  const promptResponses = getPromptResponses()
  let answered = false

  useEffect(() => {
    if (props.data.responseOptions) {
      const entries = Object.entries(props.data.responseOptions)
      let bubbles = {}
      let responses = {}
      entries.forEach(function (entry) {
        bubbles[entry[0]] = false
        responses[entry[1]] = false
      })

      setPressedBubbles(bubbles)
      setPressedResponses(responses)
    }

    if (props.data.responses) {
      answered = (props.senderId in props.data.responses)
    }
  }, []);

  function changeModalVisibility(visible) {
    setModalVisible(visible)
  }

  function getResponsesOrTextInput() {
    if (promptResponses !== null) {
      return (
        <View style={styles.flexColumnCenter}>
          {getTouchablePromptResponses()}
        </View>
      )
    }
    return (
      <View style={styles.flexRowCenter}>
        <TextInput
          multiline
          onChangeText={(answerText) => setPromptAnswerText(answerText)}
          placeholder={'Write your response here'}
          style={styles.promptAnswerInput}
          value={promptAnswerText}
        />
      </View>
    )
  }

  function getPromptResponses() {
    if (props.data.responseOptions) {
      let entries = Object.entries(props.data.responseOptions)
      return entries.map(item =>
        (<View key={item[0]} style={styles.promptResponseItem}>
          <Text>{item[1]}</Text>
        </View>)
      )
    }
    return null
  }

  function getTouchablePromptResponses() {
    if (props.data.responseOptions) {
      return Object.entries(props.data.responseOptions).map(item =>
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

  async function submitPromptResponse() {
    const response = (props.data.responseOptions) ? pressedBubbles : promptAnswerText
    await context.submitPromptResponse(props.data, response, props.senderId, props.threadId)
    setPromptAnswerText('')
    setPressedResponses({})
    setPressedBubbles({})
    changeModalVisibility(false)
  }

  function toggleBubblePress(key, response) {
    let bubbles = pressedBubbles
    bubbles[key] = !pressedBubbles[key]

    let responses = pressedResponses
    responses[response] = !pressedResponses[response]

    setPressedBubbles(bubbles)
    setPressedResponses(responses)
  }

  function renderUnanswered() {
    return (
      <TouchableHighlight
        onPress={() => props.updateFocusedPrompt(props.data)}
        underlayColor={'rgba(255,255,255,0)'}
      >
        <View>
          {promptResponses}
          <View style={styles.promptAnswerButton}>
            <Text style={styles.promptAnswerButtonText}>Answer</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  function renderAnswered() {
    return (
      <View>
      {promptResponses}
      <View style={styles.promptDoneButton}>
        <Text style={styles.promptDoneButtonText}>Done!</Text>
      </View>
    </View>
    )
  }

  function renderPromptDate() {
    const timestamp = (new Date(props.data.timestamp)).toString()
    const day = timestamp.slice(0,3)
    const date = timestamp.slice(4,10)
    const yearTime = timestamp.slice(11,21)
    return(day + ", " + date + ", " + yearTime)
  }

  return (
    <View>
      <Modal
        animationType={'fade'}
        transparent
        visible={modalVisible}
      >
        <KeyboardAvoidingView behavior={context.state.behavior} style={[styles.darkenedBackgroundOverlay, {borderColor: 'black'}]}>
          <View style={styles.promptResponseModal}>
            <View style={styles.promptModalHeaderContainer}>
              <Text style={styles.promptModalHeading}>PairUp Prompt</Text>
            </View>
            <View style={styles.promptTextContainer}>
              <Text>{props.data.message}</Text>
            </View>
            {getResponsesOrTextInput()}
            <View style={styles.flexRowCenter}>
              <Button
                onPress={() => changeModalVisibility(false)}
                style={styles.promptModalButton}
                title={'Cancel'}
              />
              <Button
                onPress={() => submitPromptResponse()}
                style={styles.promptModalButton}
                title={'Submit'}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View style={[styles.promptContainer, styles.backgroundOrange]}>
        <View style={styles.promptHeadingContainer}>
          <Image style={[styles.messageAvatar, styles.messageAvatarImage, styles.PairUpAvatar]} source={PairUpIcon}/>
          <Text style={styles.promptHeading}>PairUp Prompt</Text>
        </View>
        <Text style={styles.promptTimestamp}>{renderPromptDate()}</Text>
        <View style={styles.promptTextContainer}>
          <Text style={{color: 'white'}}>{props.data.message}</Text>
        </View>
        {answered ? renderAnswered() : renderUnanswered()}
      </View>
    </View>
  )
}

// onPress={() => this.props.updateFocusedPrompt(this.props.data.message)}
