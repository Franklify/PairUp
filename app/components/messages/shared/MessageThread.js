import React, {
  useContext,
  useState
} from 'react'
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import MessageBubble from './MessageBubble'
import MessageSuggestions from './MessageSuggestions'
import PairUpContext from '../../../config/PairUpContext'
import Prompt from './Prompt'
import PromptResponse from './PromptResponse'
import UnpairedScreen from './UnpairedScreen'
const styles = require('../../../styles/styles.js')
const constants = require('../../../styles/constants.js')

export default function MessageThread(props) {
  const context = useContext(PairUpContext)
  const [data, setData] = useState([])
  const [height, setHeight] = useState(0)
  const [focusedPrompt, setFocusedPrompt] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [promptResponseText, setPromptResponseText] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [encouragementHasShown, setEncouragementHasShown] = useState(false)

  function handlePickSuggestion(message) {
    setMessageText(message)
  }

  function updateFocusedPrompt(prompt) {
    setFocusedPrompt(prompt)
  }

  function sendMessage() {
    context.sendMessage(messageText, props.user.uid, context.state.user.displayName, props.focusedThread.id)
    if (focusedPrompt) {
      displayEncouragement()
    }
    setMessageText('')
  }

  function sendPromptResponse() {
    context.submitPromptResponse(focusedPrompt, promptResponseText, props.user.uid, props.focusedThread.id)
    displayEncouragement()
    setPromptResponseText('')
  }

  function displayEncouragement() {
    if (!encouragementHasShown) {
      setShowEncouragement(true)
    }
  }

  function hideEncouragement() {
    setEncouragementHasShown(true)
    setShowEncouragement(false)
  }

  function updateInputHeight(inputHeight) {
    const maxInputHeight = inputHeight > 125 ? 125 : inputHeight
    setHeight(maxInputHeight)
  }

  function renderLoadOldMessages() {
    return (
      <TouchableHighlight
        onPress={() => context.loadOldMessages(props.type, props.focusedThread.id, props.focusedThread.oldestMsgKey)}
        underlayColor={'rgba(255,255,255,0)'}
      >
        <View style={[styles.inverted, styles.loadOldMessageButton]}>
          <Text>Load previous messages</Text>
        </View>
      </TouchableHighlight>
    )
  }

  function renderMessageBubble(data) {
    if (data.item.senderId === 'prompt') {
      return (
        <View style={styles.inverted}>
          <Prompt
            data={data.item}
            senderId={props.user.uid}
            threadId={props.focusedThread.id}
            updateFocusedPrompt={updateFocusedPrompt}
          />
        </View>
      )
    } else if (data.item.senderId === 'promptResponse') {
      return (
        <View style={styles.inverted}>
          <PromptResponse
            users={props.focusedThread.users}
            senderId={props.user.uid}
            threadId={props.focusedThread.id}
            data={data.item}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.inverted}>
          <MessageBubble
            users={props.focusedThread.users}
            senderId={props.user.uid}
            message={data.item}
          />
        </View>
      )
    }
  }

  function renderNormalTextInput() {
    return (
      <View style={[styles.flexRowEnd, styles.justifyContentCenter]}>
        <TouchableHighlight
          onPress={() => toggleShowSuggestions()}
          underlayColor={'rgba(255,255,255,0)'}
        >
          <View style={{marginBottom: 15, marginLeft: 20}}>
            <FontAwesome name='quote-right' size={25} color={constants.teal}/>
          </View>
        </TouchableHighlight>
        <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.wrapper}>
          <TextInput
            multiline
            onChangeText={(messageText) => setMessageText(messageText)}
            onContentSizeChange={(e) => updateInputHeight(e.nativeEvent.contentSize.height)}
            onFocus={() => hideSuggestions()}
            placeholder={'Type a message'}
            style={[styles.messageThreadInput, { height: height + 15, width: screenWidth - 130 }]}
            value={messageText}
          />
        </ScrollView>
        <View style={{paddingBottom: 10, paddingRight: 10}}>
          <Button
            onPress={() => sendMessage()}
            style={{margin: 0}}
            title={'Send'}
          />
        </View>
      </View>
    )
  }

  function renderPromptTextInput() {
    return (
      <View style={[styles.flexColumnCenter, styles.alignItemsStretch]}>
        <View style={[styles.backgroundTeal, styles.paddingTen]}>
          <Text style={[styles.smallHelpCenter, { color: 'white' }]}>You are currently answering the prompt:</Text>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{focusedPrompt.message}</Text>
          <TouchableHighlight
            style={styles.promptAnswerButton}
            onPress={() => clearFocusedPrompt()}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <Text style={[styles.smallHelpCenter, {color: 'white'}]}>Done</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.flexRowEnd, styles.justifyContentCenter]}>
          <TouchableHighlight
            onPress={() => toggleShowSuggestions()}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <View style={{marginBottom: 15, marginLeft: 20}}>
              <FontAwesome name='quote-right' size={25} color={constants.teal}/>
            </View>
          </TouchableHighlight>
          <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.wrapper}>
          <TextInput
            multiline
            onChangeText={(promptResponseText) => setPromptResponseText(promptResponseText)}
            onContentSizeChange={(e) => updateInputHeight(e.nativeEvent.contentSize.height)}
            placeholder={'Type an answer'}
            style={[styles.messageThreadInput, { height: height + 15, width: screenWidth - 130}]}
            value={promptResponseText}
          />
          </ScrollView>
          <View style={{paddingBottom: 10, paddingRight: 10}}>
            <Button
              onPress={() => sendPromptResponse()}
              style={{margin: 0}}
              title={'Send'}
            />
          </View>
        </View>
      </View>
    )
  }

  function renderSuggestions() {
    return (
      <MessageSuggestions
        onPressSuggestion={handlePickSuggestion}
        screenWidth={screenWidth}
      />
    )
  }

  function renderPairName() {
    let name = "unknown"
    const users = props.focusedThread.users
    if (users) {
      for (userKey in users) {
        if (userKey != context.state.user.uid) {
          name = users[userKey].name
        }
      }
    }
    return props.type !== 'reflectionOnly'
      ? "Paired with " + name
      : 'Solo';
  }

  function renderStreak() {
    return props.focusedThread.messages.length
  }

  function renderEncouragement() {
    return (
      <Modal
        style={styles.modalColor}
         animationType="slide"
         transparent={false}
         visible={showEncouragement}
         onRequestClose={() => {
           alert('Modal has been closed.');
         }}>
         <View style={styles.encouragementContainer}>
           <Text style={styles.encouragementText}>Great Job 🎉</Text>
           <Image
             style={styles.encouragementGif}
             source={require('../../../../resources/gifs/kid.gif')}/>
           <TouchableHighlight
             style={styles.encouragementButton}
             onPress={() => {hideEncouragement()}}>
             <Text style={styles.encouragementButtonText}>Close</Text>
           </TouchableHighlight>
         </View>
       </Modal>
    )
  }

  function clearFocusedPrompt() {
    setFocusedPrompt(null)
  }

  function hideSuggestions() {
    setShowSuggestions(false)
  }

  function toggleShowSuggestions() {
    setShowSuggestions(!showSuggestions)
  }

  console.log('Ct: ' + context.state.user.uid)
  return (
    props.focusedThread.id ?
      (<KeyboardAvoidingView
        behavior={context.state.behavior}
        style={styles.wrapper}
        keyboardVerticalOffset={0}>
        { showEncouragement ? renderEncouragement() : null }
        <View
          onLayout={(e) => { setScreenWidth(e.nativeEvent.layout.width) }}
          style={[styles.wrapper, {paddingTop: 20}]}>
          <View
            style={[styles.banner, {width: screenWidth}]}>
            <View style={styles.bannerContainer}>
              <Text style={styles.bannerText}>
                {renderPairName()}
              </Text>
              <View style={styles.streakContainer}>
                <Text style={styles.streakText}>{renderStreak()}</Text>
                <Image
                  style={styles.streakIcon}
                  source={require('../../../../resources/streak.png')}/>
              </View>
            </View>
           </View>
           <FlatList
            data={props.focusedThread.messages}
            ListFooterComponent={renderLoadOldMessages}
            //ref={(component) => this._flatList = component}
            renderItem={(data) => renderMessageBubble(data)}
            style={[styles.inverted, styles.messageListContainer]}
           />
         </View>

        <View>
          { focusedPrompt ? renderPromptTextInput() : renderNormalTextInput() }
          { showSuggestions && renderSuggestions() }
        </View>
      </KeyboardAvoidingView>)
    : (<UnpairedScreen />)
  )
}
