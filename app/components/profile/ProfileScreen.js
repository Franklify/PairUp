import React, {
  useContext,
  useEffect,
} from 'react'
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native'
import PairUpContext from '../../config/PairUpContext'
const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

const reactNative = require('react-native');
const {
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

export default function ProfileScreen({navigation}) {
  const context = useContext(PairUpContext)

  function getAvatar() {
    const avatarIndex = context.state.avatarIndex
    return (avatarIndex && avatarIndex !== "None")
        ? avatarImages[avatarIndex] : avatarNeutral
  }

  return (
    <View style={styles.container}>
      <Image
        style={{width: 75, height: 75}}
        source={getAvatar()}
      />
      {context.state.displayName &&
          <Text style={styles.profileText}>{context.state.displayName}</Text>
        }
      <Text style={[styles.profileText, styles.profileEmail]}>{context.state.email}</Text>
      <Pressable
        style={styles.profileButton}
        onPress={() => navigation.navigate('ChangeAvatar')}>
        <Text style={profileStyles.profileButtonText}> Change Avatar </Text>
      </Pressable>
      <Pressable
        style={styles.profileButton}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={profileStyles.profileButtonText}> Change Password </Text>
      </Pressable>
      <Pressable
        style={styles.profileButton}
        onPress={() => context.logout()}>
        <Text style={profileStyles.profileButtonText}> Log Out </Text>
      </Pressable>
    </View>
  )
}
