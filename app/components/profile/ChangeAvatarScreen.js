import React, {
  useContext,
  useState
} from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { changeAvatar } from '../../actions/authActions'
import { avatarNeutral, avatarImages } from '../shared/avatars.js'
import PairUpContext from '../../config/PairUpContext'
import Avatar from './Avatar'

const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')

export default function ChangeAvatarScreen({navigation}) {
  const context = useContext(PairUpContext)
  const [avatarIndex, setAvatarIndex] = useState(context.state.user.avatarIndex)

  async function handleSelection(index: String) {
    setAvatarIndex(index)
    await context.changeAvatar(index)
  }

  const renderAvatar = ({item}) => (
    <Avatar
      index={item.index}
      selected={avatarIndex}
      onPress={handleSelection}
    />
  );

  const renderAvatarRow = ({item}) => (
    <FlatList
      data={item}
      horizontal={true}
      scrollEnabled={false}
      renderItem={renderAvatar}
    />
  );

  let avatarData = []
  for (let i=0; i < avatarImages.length / 2; i++) {
    let avatarDataRow = []
    for (let j=0; j < 2; j++) {
      let index = i * 2 + j
      avatarDataRow.push({key: index.toString(), index: index})
    }
    avatarData.push(avatarDataRow)
  }
  return (
    <View style={profileStyles.profileAvatarContainer}>
      <FlatList
        data={avatarData}
        showsVerticalScrollIndicator={false}
        renderItem={renderAvatarRow}
      />
    </View>
  )
}
