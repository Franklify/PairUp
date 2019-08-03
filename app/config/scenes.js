import { TabNavigator } from 'react-navigation'

import ChangeAvatarContainer from '../components/profile/ChangeAvatarContainer'
import ChangePasswordContainer from '../components/profile/ChangePasswordContainer'
import DummyLoginContainer from '../components/auth/DummyLoginContainer'
import MessagesTabContainer from '../components/messages/MessagesTabContainer'
import MessageThreadContainer from '../components/messages/MessageThreadContainer'
import LoginContainer from '../components/auth/LoginContainer'
import ProfileContainer from '../components/profile/ProfileContainer'
import SignupContainer from '../components/auth/SignupContainer'
import AboutContainer from '../components/about/AboutContainer'

import ChatTabContainer from '../components/messages/ChatTabContainer'
import ReflectionTabContainer from '../components/messages/ReflectionTabContainer'
import ReflectionAndChatTabContainer from '../components/messages/ReflectionAndChatTabContainer'

import * as constants from '../styles/constants'

const MainScreenNavigatorPaired = TabNavigator({
  ProfileTab: { screen: ProfileContainer },
  ReflectionAndChatTab: { screen: ReflectionAndChatTabContainer },
  AboutTab: { screen: AboutContainer },
}, {
  initialRouteName: 'AboutTab',
  tabBarOptions: {
    activeTintColor: constants.teal
  }
})

const MainScreenNavigatorSolo = TabNavigator({
  ProfileTab: { screen: ProfileContainer },
  ReflectionTab: { screen: ReflectionTabContainer },
  ChatTab: { screen: ChatTabContainer },
  AboutTab: { screen: AboutContainer },
}, {
  initialRouteName: 'ProfileTab',
  tabBarOptions: {
    activeTintColor: constants.teal
  }
})

export const StackRouteConfigs = {
  DummyLogin: { screen: DummyLoginContainer },
  PairedHome: { screen: MainScreenNavigatorPaired },
  SoloHome: { screen: MainScreenNavigatorSolo },
  Login: { screen: LoginContainer },
  Message: { screen: MessageThreadContainer },
  Signup: { screen: SignupContainer },
  About: { screen: AboutContainer },
  ChangeAvatar: { screen: ChangeAvatarContainer },
  ChangePassword: { screen: ChangePasswordContainer}
}

module.exports = StackRouteConfigs
