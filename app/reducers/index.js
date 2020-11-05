import * as types from '../actions/actionTypes'
import * as authReducers from './authReducers'
import * as messagesReducers from './messagesReducers'
import { InitialState } from '../config/PairUpContext'

export function PairUpReducers (state, action) {
  // AUTH REDUCERS
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
    case types.SIGNUP_ATTEMPT:
      return {...state,
        isAuthenticated: false,
        isPending: true
      }
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {...state,
        // AuthState
        isAuthenticated: true,
        isPending: false,
        // User
        displayName: action.user.displayName,
        email: action.user.email,
        emailVerified: action.user.emailVerified,
        avatarIndex: action.user.avatarIndex,
        providerData: action.user.providerData,
        refreshToken: action.user.refreshToken,
        reflectionType: action.user.reflectionType,
        showAbout: action.user.showAbout,
        threads: action.user.threads,
        uid: action.user.uid
      }
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return {...state,
        errorMessage: action.errorMessage,
        isAuthenticated: false,
        isPending: false
      }
    case types.LOGOUT_ATTEMPT:
      return InitialState
    case types.SWITCH_LOGIN_SIGNUP:
      return {...state,
        errorMessage: '',
        isAuthenticated: false,
        isPending: false
      }
    case types.CHANGE_AVATAR_ATTEMPT:
      return {...state,
        changeAvatarSuccessMessage: '',
        changeAvatarFailureMessage: ''
      }
    case types.CHANGE_AVATAR_SUCCESS:
      return {...state,
        changeAvatarSuccessMessage: action.successMessage,
        changeAvatarFailureMessage: '',
        avatarIndex: action.avatarIndex
      }
    case types.CHANGE_AVATAR_FAILURE:
      return {...state,
        changeAvatarFailureMessage: action.errorMessage,
        changeAvatarSuccessMessage: ''
      }
    case types.CHANGE_PASSWORD_ATTEMPT:
      return {...state,
        changeAvatarSuccessMessage: '',
        changeAvatarFailureMessage: ''
      }
    case types.CHANGE_PASSWORD_SUCCESS:
      return {...state,
        changePasswordSuccessMessage: action.successMessage,
        changePasswordFailureMessage: ''
      }
    case types.CHANGE_PASSWORD_FAILURE:
      return {...state,
        changePasswordFailureMessage: action.errorMessage,
        changePasswordSuccessMessage: ''
      }
    case 'Logout':
      return { ...state, isLoggedIn: false }

    // MESSAGES
    // Threads
    case types.LOAD_THREAD_LIST_SUCCESS:
      return {...state, threads: action.threads}
    // Chat Only Thread
    case types.INITIAL_LOAD_CHAT_ONLY_MESSAGES_SUCCESS:
      return {...state,
        id: action.focusedThread.id,
        isReady: true,
        title: action.focusedThread.title,
        users: action.focusedThread.users,
        messages: action.focusedThread.messages,
        oldestMsgKey: action.focusedThread.oldestMsgKey
      }
    case types.LOAD_NEW_CHAT_ONLY_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.length > 0 && state.messages[0].key !== action.newMessage[0].key ? action.newMessage.concat(state.messages) : state.messages
      }
    case types.LOAD_OLD_CHAT_ONLY_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.concat(action.oldMessages.messages),
        oldestMsgKey: action.oldMessages.oldestMsgKey
      }
    // Reflection Only Thread
    case types.INITIAL_LOAD_REFLECTION_ONLY_MESSAGES_SUCCESS:
      return {...state,
        id: action.focusedThread.id,
        isReady: true,
        title: action.focusedThread.title,
        users: action.focusedThread.users,
        messages: action.focusedThread.messages,
        oldestMsgKey: action.focusedThread.oldestMsgKey
      }
    case types.LOAD_NEW_REFLECTION_ONLY_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.length > 0 && state.messages[0].key !== action.newMessage[0].key ? action.newMessage.concat(state.messages) : state.messages
      }
    case types.LOAD_OLD_REFLECTION_ONLY_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.concat(action.oldMessages.messages),
        oldestMsgKey: action.oldMessages.oldestMsgKey
      }
    // Reflection and Chat Thread
    case types.INITIAL_LOAD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS:
      return {...state,
        id: action.focusedThread.id,
        isReady: true,
        title: action.focusedThread.title,
        users: action.focusedThread.users,
        messages: action.focusedThread.messages,
        oldestMsgKey: action.focusedThread.oldestMsgKey
      }
    case types.LOAD_NEW_REFLECTION_AND_CHAT_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.length > 0 && state.messages[0].key !== action.newMessage[0].key ? action.newMessage.concat(state.messages) : state.messages
      }
    case types.LOAD_OLD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS:
      return {...state,
        messages: state.messages.concat(action.oldMessages.messages),
        oldestMsgKey: action.oldMessages.oldestMsgKey
      }
    default:
      return state
  }
}

export default PairUpReducers
