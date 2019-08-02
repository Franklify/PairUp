const React = require('react-native')
const { StyleSheet } = React
const constants = require('../../styles/constants.js')

const styles = StyleSheet.create({
  settingsInput: {
    width: 300,
  },
  settingsText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 15,
    marginBottom: 25,
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: constants.rightpointRed,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  settingsButtonInverted: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  settingsButtonText: {
    color: 'white'
  },
  settingsButtonTextInverted: {
    color: constants.rightpointRed,
  },
  settingsAvatarContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  settingsAvatarSelectedContainer: {
    flex: 1,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
  },
  settingsAvatar: {
    width: 100,
    height: 100,
    margin: 20,
    alignItems: 'center',
  },
  settingsAvatarSelected: {
    width: 100,
    height: 5,
    backgroundColor: constants.orange
  },
})

module.exports = styles
