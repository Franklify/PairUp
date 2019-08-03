const React = require('react-native')
const { StyleSheet } = React
const constants = require('../../styles/constants.js')

const styles = StyleSheet.create({
  profileInput: {
    width: 300,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 15,
    marginBottom: 25,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: constants.rightpointRed,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  profileButtonInverted: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  profileButtonText: {
    color: 'white'
  },
  profileButtonTextInverted: {
    color: constants.rightpointRed,
  },
  profileAvatarContainer: {
    flex: 1,
    padding: 8,
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
