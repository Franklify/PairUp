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
import PairUpContext from '../../config/PairUpContext'
import Avatar from './Avatar'

const profileStyles = require('./styles.js')
const styles = require('../../styles/styles.js')
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

export default function ChangeAvatarScreen({navigation}) {
  const context = useContext(PairUpContext)
  const [avatarIndex, setAvatarIndex] = useState(context.state.avtarIndex)

  async function handleSelection(index: String) {
    setAvatarIndex(index)
    await context.changeAvatar(index)
  }

  const _renderAvatar = ({item}) => (
    <Avatar
      index={item.index}
      selected={avatarIndex}
      onPress={handleSelection}
    />
  );

  const _renderAvatarRow = ({item}) => (
    <FlatList
      data={item}
      horizontal={true}
      scrollEnabled={false}
      renderItem={_renderAvatar}
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
        renderItem={_renderAvatarRow}
      />
    </View>
  )
}
