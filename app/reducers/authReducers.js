import * as types from '../actions/actionTypes'
import { InitialState } from '../config/PairUpContext'

export function authState (state, action) {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
    case types.SIGNUP_ATTEMPT:
      return {...state,
        isAuthenticated: false,
        isPending: true
      }
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
    case 'Login':
      return {...state,
        isAuthenticated: true,
        isPending: false
      }
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return {...state,
        errorMessage: action.errorMessage,
        isAuthenticated: false,
        isPending: false
      }
    case types.LOGOUT_ATTEMPT:
      return {...state,
        isAuthenticated: false,
        isPending: false,
      }
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
        changeAvatarFailureMessage: ''
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
    default:
      return state
  }
}

export function user (state, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {...state,
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
    default:
      return state
  }
}
