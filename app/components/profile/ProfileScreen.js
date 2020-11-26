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
import { avatarNeutral, avatarImages } from '../shared/avatars.js'
import PairUpContext from '../../config/PairUpContext'
const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

export default function ProfileScreen({navigation}) {
  const context = useContext(PairUpContext)

  function getAvatar() {
    const user = context.state.user
    if (user) {
      const avatarIndex = user.avatarIndex
      return (avatarIndex && avatarIndex !== "None")
          ? avatarImages[avatarIndex] : avatarNeutral
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={{width: 75, height: 75}}
        source={getAvatar()}
      />
      {context.state.user && context.state.user.displayName &&
        <Text style={styles.profileText}>{context.state.user.displayName}</Text>
      }
      {context.state.user && context.state.user.email &&
        <Text style={[styles.profileText, styles.profileEmail]}>{context.state.user.email}</Text>
      }
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
