import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import fb from './initializeFirebase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import { SimpleLineIcons } from '@expo/vector-icons'
import PairUpContext from '../config/PairUpContext'

// import MessagesTabContainer from '../components/messages/MessagesTabContainer'
// import MessageThreadContainer from '../components/messages/MessageThreadContainer'
import AboutScreen from '../components/about/AboutScreen'
import ChangeAvatarScreen from '../components/profile/ChangeAvatarScreen'
import ChangePasswordScreen from '../components/profile/ChangePasswordScreen'
import LoginScreen from '../components/auth/LoginScreen'
import ProfileScreen from '../components/profile/ProfileScreen'
import SignupScreen from '../components/auth/SignupScreen'
import SplashScreen from '../components/auth/SplashScreen'

const constants = require('../styles/constants.js')
const reactNative = require('react-native');
const {
  AsyncStorage
} = reactNative;
//
// import ChatTabContainer from '../components/messages/ChatTabContainer'
// import ReflectionTabContainer from '../components/messages/ReflectionTabContainer'
// import ReflectionAndChatTabContainer from '../components/messages/ReflectionAndChatTabContainer'

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
  );
}

const PairedTabs = createBottomTabNavigator();
function MainScreenPaired () {
  return (
    <PairedTabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'AboutTab') {
              iconName = 'info'
              // iconName = focused
              //   ? 'ios-information-circle'
              //   : 'ios-information-circle-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = 'user-female'
              //iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <SimpleLineIcons name={iconName} size={26} color={color} />;
          },
        })}
        initialRouteName="AboutTab"
        tabBarOptions={{
          activeTintColor: constants.teal,
          inactiveTintColor: 'gray',
        }}
      >
      <PairedTabs.Screen
          name="AboutTab"
          component={AboutScreen}
          options={{
          tabBarLabel: 'Welcome',
        }}
       />
      <PairedTabs.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{
          tabBarLabel: 'Profile',
        }}
       />
    </PairedTabs.Navigator>
  );
}


const SoloTabs = createBottomTabNavigator();
function MainScreenSolo () {
  return (
    <SoloTabs.Navigator
        initialRouteName="AboutTab"
        tabBarOptions={{
          activeTintColor: constants.teal,
          inactiveTintColor: 'gray',
        }}
      >
      <SoloTabs.Screen name="AboutTab" component={AboutScreen} />
      <SoloTabs.Screen name="ProfileTab" component={ProfileScreen} />
      //<SoloTabs.Screen name="ReflectionTab" component={ReflectiontTabContainer} />
      //<SoloTabs.Screen name="ChatTab" component={ChatTabContainer} />
    </SoloTabs.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="PairedTabs"
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen
        name="PairedTabs"
        component={MainScreenPaired}
        options={{headerShown: false}}
      />
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
  );
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
  }, []);

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
            animationTypeForReplace: true ? 'pop' : 'push', //state.isSignout
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export default RootStackScreen
