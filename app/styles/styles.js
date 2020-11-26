const React = require('react-native')
const { StyleSheet } = React
const constants = require('./constants.js')

const styles = StyleSheet.create({
  // General Styles
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
  redContainer: {
    alignItems: 'center',
    backgroundColor: constants.rightpointRed,
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
  darkenedBackgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    padding: 0
  },
  borderCurve: {
    borderRadius: 5,
    alignItems: 'center',
  },

  // Flexbox
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexColumnCenter: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  flexColumnEnd: {
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  flexRowEnd: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },

  // Text styles
  f_40: {
    fontSize: 40,
  },
  f_30: {
    fontSize: 30,
  },
  f_20: {
    fontSize: 20,
  },
  f_15: {
    fontSize: 15,
  },
  smallHelpCenter: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center'
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    margin: 10
  },


  // Colors
  backgroundPastelBlue: {
    backgroundColor: constants.pastelBlue
  },
  backgroundOrange: {
    backgroundColor: constants.orange
  },
  backgroundTeal: {
    backgroundColor: constants.teal
  },
  backgroundRightpointRed: {
    backgroundColor: constants.rightpointRed
  },
  colorPastelBlue: {
    color: constants.pastelBlue
  },
  colorTeal: {
    color: constants.teal
  },
  colorWhite: {
    color: 'white'
  },
  rightpointRed: {
    color: constants.rightpointRed
  },

  // Borders
  borderGray: {
    borderColor: constants.mediumGray,
  },
  borderTopBottom: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  borderTop: {
    borderTopWidth: 1,
  },

  // Margins and Padding
  marginFive: {
    margin: 5,
  },
  margin_10: {
    margin: 10,
  },
  paddingTen: {
    padding: 10
  },
  padding_10: {
    padding: 10,
  },
  padding_20: {
    padding: 20,
  },
  padding_50: {
    padding: 50
  },

  // Login/Signup and Auth
  authButton: {
    backgroundColor: constants.deepBlue,
    padding: 15,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 10,
    marginTop: 25
  },
  authButtonText: {
    color: 'white',
    fontSize: 20,
  },
  authErrorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  },
  authInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,

    margin: 10,
    padding: 10
  },
  authInputCorrect: {
    borderColor: 'green',
    borderWidth: 2
  },
  authInputIncorrect: {
    borderColor: 'red',
    borderWidth: 2
  },
  authTitle: {
    fontSize: 40,
    textAlign: 'center'
  },
  authContainerColor: {
    backgroundColor: constants.pastelBlue,
  },
  loggingInContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71B8CD',
  },
  loggingInGif: {
    width: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loggingInText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // TabBar Styles
  tabBar: {
    backgroundColor: 'white',
    borderColor: '#b7b7b7',
    borderWidth: 0.5,
    opacity: 1
  },

  // Messaging //
  inverted: {
    transform: [
      {scaleY: -1}
    ]
  },
  banner: {
    height: 70,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'gray'
  },
  bannerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  bannerText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bannerNameText: {
    color: constants.pastelBlue
  },
  streakContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  streakText: {
    alignSelf: 'center',
    color: constants.orange,
    fontWeight: 'bold',
    fontSize: 16,
  },
  streakIcon: {
    alignSelf: 'center',
    width: 25,
    height: 25,
  },

  // Message List
  messageListContainer: {
    paddingTop: 10,
  },
  messageListRow: {
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    flexDirection: 'row',
    padding: 15
  },
  messageListRowPreview: {
    color: 'gray',
    fontSize: 14
  },
  messageListRowTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 2
  },
  messageListTextWrapper: {
    paddingLeft: 10
  },
  loadOldMessageButton: {
    alignSelf: 'center',
    borderColor: constants.mediumGray,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },

  // Message Bubble
  messageAvatar: {
    marginBottom: 2,
  },
  PairUpAvatar: {
    borderRadius: 15,
  },
  messageAvatarImage: {
    width: 30,
    height: 30,
  },
  messageBubble: {
    borderRadius: 15,
    marginTop: 2
  },
  messageDate: {
    color: 'gray',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center'
  },
  messageTimestamp: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: 'gray',
    fontSize: 10,
    margin: 5
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    marginLeft: 5
  },
  receivedMessageSender: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 50,
    marginTop: 10
  },
  receivedMessageText: {
    color: 'black',
    fontSize: 16,
    margin: 10
  },
  receivedMsgBubbleWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 40,
    marginRight: 100
  },
  receivedMsgWithAvatar: {
    marginBottom: 10,
    marginLeft: 10
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: constants.teal
  },
  sentMessageText: {
    color: 'white',
    fontSize: 16,
    margin: 10
  },
  sentMsgBubbleWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 100,
    marginRight: 10
  },

  // Message input
  messageThreadInput: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 0.5,
    fontSize: 16,
    margin: 10,
    marginRight: 0,
    padding: 10,
    paddingTop: 5,
  },
  sendButtonContainer: {
    paddingBottom: 10,
    paddingRight: 10,
  },
  sendButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: constants.deepBlue,
  },
  sendButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  // Prompts
  promptAnswerButton: {
    alignSelf: 'center',
    backgroundColor: constants.deepBlue,
    padding: 10,
    borderRadius: 5
  },
  promptAnswerButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  promptAnswerInput: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    height: 200,
    margin: 10,
    padding: 10
  },
  promptDoneButton: {
    alignSelf: 'center',
    backgroundColor: constants.promptDoneButtonColor,
    padding: 10,
    borderRadius: 5
  },
  promptDoneButtonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  promptContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    marginBottom: 15,
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: 15,
    padding: 20
  },
  promptHeading: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  promptHeadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  promptModalButton: {
    flex: 0.5
  },
  promptModalHeaderContainer: {
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingTop: 25
  },
  promptModalHeading: {
    color: 'white',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  promptTimestamp: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  promptResponseContainer: {
    borderColor: constants.mediumGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  promptResponseHeader: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  promptResponseItem: {
    backgroundColor: 'white',
    borderColor: constants.mediumGray,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10
  },
  promptResponseModal: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    overflow: 'hidden'
  },
  promptResponseSubmit: {
    fontSize: 14
  },
  promptTextContainer: {
    padding: 10
  },
  responsePressed: {
    backgroundColor: constants.mediumGray
  },
  dummy:{
    backgroundColor: 'red'
  },

  // Encouragement Pop-up
  modalColor: {
    color: constants.orange,
  },
  encouragementContainer: {
    alignItems: 'center',
    backgroundColor: constants.orange,
  },
  encouragementText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 200,
    marginBottom: 50,
    color: 'white',
  },
  encouragementGif: {
    alignItems: 'center',
    margin: 15,
  },
  encouragementButton: {
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 300,
    padding: 5,
    borderRadius: 5,
  },
  encouragementButtonText: {
    fontSize: 20,
    color: constants.orange,
  },
  notPairedMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notPairedMessage: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: constants.orange,
  },

  // Profile
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  profileEmail: {
    fontWeight: '400',
    marginBottom: 25,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: constants.pastelBlue,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  profileButtonText: {
    color: 'white'
  },
  profileAvatarContainer: {
    flex: 1,
    padding: 8,
    marginBottom: 10,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  profileAvatarSelectedContainer: {
    flex: 1,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  profileAvatar: {
    width: 100,
    height: 100,
    margin: 20,
    alignItems: 'center',
  },
  profileAvatarSelected: {
    width: 100,
    height: 5,
    backgroundColor: constants.orange
  },

})

module.exports = styles
