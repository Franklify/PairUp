import React, { Component } from 'react'
import {
  Image,
  TouchableHighlight,
  View,
} from 'react-native'

import { avatarNeutral, avatarImages } from '../shared/avatars.js'
const constants = require('../../styles/constants.js')
const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

class Avatar extends React.PureComponent {
  _onPress = () => {
    this.props.onPress(this.props.index.toString());
  };

  _renderBorder () {
    return (
      <View style={profileStyles.profileAvatarSelected}></View>
    )
  }

  render() {
    return (
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={constants.pastelBlue}
        onPress={this._onPress}>
        <View style={profileStyles.profileAvatarSelectedContainer}>
          <Image
            source={avatarImages[parseInt(this.props.index)]}
            style={profileStyles.profileAvatar}
          />
          {this.props.selected == this.props.index.toString() ? this._renderBorder() : null}
        </View>
      </TouchableHighlight>
    )
  }
}

export default Avatar
