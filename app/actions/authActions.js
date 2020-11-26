import * as types from './actionTypes'

export function switchLoginSignup () {
  return {
    type: types.SWITCH_LOGIN_SIGNUP
  }
}

export function switchSignupToLogin () {
  return {
    type: types.SWITCH_LOGIN_SIGNUP
  }
}

export function loginAttempt () {
  return {
    type: types.LOGIN_ATTEMPT
  }
}

export function loginSuccess (user, hasOnboarded) {
  return {
    type: types.LOGIN_SUCCESS,
    user,
    hasOnboarded
  }
}

export function loginFailure (errorMessage) {
  return {
    type: types.LOGIN_FAILURE,
    errorMessage
  }
}

export function signupAttempt () {
  return {
    type: types.SIGNUP_ATTEMPT
  }
}

export function signupSuccess (user) {
  return {
    type: types.SIGNUP_SUCCESS,
    user,
    hasOnboarded: false
  }
}

export function signupFailure (errorMessage) {
  return {
    type: types.SIGNUP_FAILURE,
    errorMessage
  }
}

export function logoutAttempt () {
  return {
    type: types.LOGOUT_ATTEMPT,
  }
}

export function registerPushAttempt () {
  return {
    type: types.REGISTER_PUSH_ATTEMPT
  }
}

export function registerPushSuccess () {
  return {
    type: types.REGISTER_PUSH_SUCCESS
  }
}

export function registerPushFailure () {
  return {
    type: types.REGISTER_PUSH_FAILURE
  }
}

export function onboarded () {
  return {
    type: types.ONBOARDED
  }
}

export function changeAvatarAttempt () {
  return {
    type: types.CHANGE_AVATAR_ATTEMPT
  }
}

export function changeAvatarSuccess(successMessage, avatarIndex) {
  return {
    type: types.CHANGE_AVATAR_SUCCESS,
    successMessage,
    avatarIndex
  }
}

export function changeAvatarFailure(failureMessage) {
  return {
    type: types.CHANGE_AVATAR_FAILURE,
    failureMessage
  }
}

export function changePasswordAttempt () {
  return {
    type: types.CHANGE_PASSWORD_ATTEMPT
  }
}

export function changePasswordSuccess(successMessage) {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS,
    successMessage
  }
}

export function changePasswordFailure(errorMessage) {
  return {
    type: types.CHANGE_PASSWORD_FAILURE,
    errorMessage
  }
}
