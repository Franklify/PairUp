import React, { Component } from 'react'
import {
  Image,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

var reactNative = require('react-native');
var {
  AsyncStorage
} = reactNative;

const avatarNeutral = require('../../../resources/avatars/avatar_general.png')
const avatarImages = [
  // Women straight hair
  require('../../../resources/avatars/avatar_female_straight_black.png'),
  require('../../../resources/avatars/avatar_female_straight_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_female_straight_black.png'),
  require('../../../resources/avatars/avatar_brown_female_straight_black_glasses.png'),
  require('../../../resources/avatars/avatar_female_straight_brunette.png'),
  require('../../../resources/avatars/avatar_female_straight_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_female_straight_blond.png'),
  require('../../../resources/avatars/avatar_female_straight_blond_glasses.png'),

  // Women braided hair
  require('../../../resources/avatars/avatar_white_female_braided_black.png'),
  require('../../../resources/avatars/avatar_white_female_braided_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_female_braided_black.png'),
  require('../../../resources/avatars/avatar_brown_female_braided_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_female_braided_brunette.png'),
  require('../../../resources/avatars/avatar_white_female_braided_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_female_braided_blond.png'),
  require('../../../resources/avatars/avatar_white_female_braided_blond_glasses.png'),

  // Men short hair
  require('../../../resources/avatars/avatar_white_short_black.png'),
  require('../../../resources/avatars/avatar_white_short_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_short_black.png'),
  require('../../../resources/avatars/avatar_brown_short_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_short_brunette.png'),
  require('../../../resources/avatars/avatar_white_short_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_short_blond.png'),
  require('../../../resources/avatars/avatar_white_short_blond_glasses.png'),

  // Men long hair
  require('../../../resources/avatars/avatar_white_long_black.png'),
  require('../../../resources/avatars/avatar_white_long_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_long_brunette.png'),
  require('../../../resources/avatars/avatar_white_long_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_long_blond.png'),
  require('../../../resources/avatars/avatar_white_long_blond_glasses.png')
]

class Profile extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='user-female' size={26} color={tintColor} />
    ),
    tabBarLabel: 'Profile'
  }

  logout() {
    AsyncStorage.multiRemove(['email', 'password']);
    /*return async function (dispatch) {
      try {
        dispatch(NavigationActions.navigate({routeName: 'Login'}))
      } catch (error) {
        console.log(error.message)
      }
    }*/
  }

  render() {
    console.log("Index")
    console.log(this.props.user)
    avatar = (this.props.user.avatarIndex && this.props.user.avatarIndex !== "None")
      ? avatarImages[this.props.user.avatarIndex]
      : avatarNeutral
    return (
      <View style={styles.container}>
        <Image
          style={{width: 75, height: 75}}
          source={avatar}
        />
        <Image
          style={{width: 350, height: 100}}
          source={require('../../../resources/rightpoint_logo.png')}
        />
        <Text style={profileStyles.profileText}>{this.props.user.email}</Text>
        <TouchableHighlight
          style={profileStyles.profileButton}
          onPress={() => this.props.navToChangeAvatar()}>
          <Text style={profileStyles.profileButtonText}> Change Avatar </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={profileStyles.profileButton}
          onPress={() => this.props.navToChangePassword()}>
          <Text style={profileStyles.profileButtonText}> Change Password </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={profileStyles.profileButton}
          onPress={() => this.logout()}>
          <Text style={profileStyles.profileButtonText}> Log Out </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Profile
