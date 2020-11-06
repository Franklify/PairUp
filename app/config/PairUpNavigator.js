import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import fb from './initializeFirebase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons'
import PairUpContext from '../config/PairUpContext'

// import MessagesTabContainer from '../components/messages/MessagesTabContainer'
// import MessageThreadContainer from '../components/messages/MessageThreadContainer'
import AboutScreen from '../components/about/AboutScreen'
import ChangeAvatarScreen from '../components/profile/ChangeAvatarScreen'
import ChangePasswordScreen from '../components/profile/ChangePasswordScreen'
import ChatScreen from '../components/messages/tabs/ChatScreen'
import LoginScreen from '../components/auth/LoginScreen'
import ProfileScreen from '../components/profile/ProfileScreen'
import ReflectionScreen from '../components/messages/tabs/ReflectionScreen'
import ReflectionAndChatScreen from '../components/messages/tabs/ReflectionAndChatScreen'
import SignupScreen from '../components/auth/SignupScreen'
import SplashScreen from '../components/auth/SplashScreen'

const constants = require('../styles/constants.js')
const reactNative = require('react-native');
const {
  AsyncStorage
} = reactNative;

const AuthStack = createStackNavigator();
function AuthStackScreen () {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  )
}

function getIconName(route) {
  switch (route.name) {
    case 'AboutTab':
      return 'home'
    case 'ChatTab':
      return 'message1'
    case 'ReflectTab':
      return 'form'
    case 'ReflectAndChatTab':
      return 'message1'
    case 'ProfileTab':
      return 'user'
  }
}

const MainTabsPaired = createBottomTabNavigator();
function MainTabsPairedScreen () {
  return (
    <MainTabsPaired.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = getIconName(route);
          return <AntDesign name={iconName} size={26} color={color} />;
        },
      })}
      initialRouteName="AboutTab"
      tabBarOptions={{
        activeTintColor: constants.teal,
        inactiveTintColor: 'gray',
      }}
    >
      <MainTabsPaired.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarLabel: 'Welcome',
        }}
       />
      <MainTabsPaired.Screen
        name="ReflectAndChatTab"
        component={ReflectionAndChatScreen}
        options={{
          tabBarLabel: 'Reflect & Chat',
        }}
      />
      <MainTabsPaired.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </MainTabsPaired.Navigator>
  )
}

const MainTabsSolo = createBottomTabNavigator();
function MainTabsSoloScreen () {
  return (
    <MainTabsSolo.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = getIconName(route);
          return <AntDesign name={iconName} size={26} color={color} />;
        },
      })}
      initialRouteName="AboutTab"
      tabBarOptions={{
        activeTintColor: constants.teal,
        inactiveTintColor: 'gray',
      }}
    >
      <MainTabsSolo.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarLabel: 'Welcome',
        }}
      />
      <MainTabsSolo.Screen
        name="ReflectTab"
        component={ReflectionScreen}
        options={{
          tabBarLabel: 'Reflect',
        }}
      />
      <MainTabsSolo.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <MainTabsSolo.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </MainTabsSolo.Navigator>
  )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  const context = useContext(PairUpContext)
  const isPaired = context.state.user && context.state.user.reflectionType === 'paired'

  return (
    <HomeStack.Navigator
      initialRouteName={isPaired ? "PairedTabs" : "SoloTabs"}
      screenOptions={{
        headerShown: false
      }}
    >
      {isPaired ?
        (<HomeStack.Screen
          name="PairedTabs"
          component={MainTabsPairedScreen}
          options={{headerShown: false}}
        />) :
        (<HomeStack.Screen
          name="SoloTabs"
          component={MainTabsSoloScreen}
          options={{headerShown: false}}
        />)
      }
      <HomeStack.Screen
        name="ChangeAvatar"
        component={ChangeAvatarScreen}
        options={{
          headerShown: true,
          headerTitle: "Change Avatar",
          headerBackTitle: null
        }}
      />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          headerTitle: null,
          headerBackTitle: null
        }}
      />
    </HomeStack.Navigator>
  )
}

const RootStack = createStackNavigator();
function RootStackScreen() {
  const context = useContext(PairUpContext)

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    AsyncStorage.multiGet(['email', 'password']).then(async (data) => {
      const email = data[0][1]
      if (email) {
        setLoading(true)
        const password = data[1][1]
        await context.login(email, password)
      }
      if (loading) setLoading(false);
    })
  }, [])

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {loading ? (
        // We haven't finished checking for the token yet
        <RootStack.Screen name="Splash" component={SplashScreen} />
      ) : context.state.isAuthenticated ? (
        // User is signed in
        <RootStack.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            headerShown: false
          }}
        />
      ) : (
        // No token found, user isn't signed in
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
            // When logging out, a pop animation feels intuitive
            animationTypeForReplace: 'pop',
          }}
        />
      )}
    </RootStack.Navigator>
  )
}

export default RootStackScreen
