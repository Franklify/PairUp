import * as types from './actionTypes'

// Initial load messages
export function initialLoadMessagesAttempt () {
  return {
    type: types.INITIAL_LOAD_MESSAGES_ATTEMPT
  }
}

export function initialLoadChatOnlyMessagesSuccess (focusedThread) {
  return {
    type: types.INITIAL_LOAD_CHAT_ONLY_MESSAGES_SUCCESS,
    focusedThread
  }
}

export function initialLoadReflectionOnlyMessagesSuccess (focusedThread) {
  return {
    type: types.INITIAL_LOAD_REFLECTION_ONLY_MESSAGES_SUCCESS,
    focusedThread
  }
}

export function initialLoadReflectionAndChatMessagesSuccess (focusedThread) {
  return {
    type: types.INITIAL_LOAD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS,
    focusedThread
  }
}

export function initialLoadMessagesFailure () {
  return {
    type: types.INITIAL_LOAD_MESSAGES_FAILURE
  }
}

// Load new messages
export function loadNewMessagesAttempt () {
  return {
    type: types.LOAD_NEW_MESSAGES_ATTEMPT,
  }
}

export function loadNewChatOnlyMessagesSuccess (newMessage) {
  return {
    type: types.LOAD_NEW_CHAT_ONLY_MESSAGES_SUCCESS,
    newMessage
  }
}

export function loadNewReflectionOnlyMessagesSuccess (newMessage) {
  return {
    type: types.LOAD_NEW_REFLECTION_ONLY_MESSAGES_SUCCESS,
    newMessage
  }
}

export function loadNewReflectionAndChatMessagesSuccess (newMessage) {
  return {
    type: types.LOAD_NEW_REFLECTION_AND_CHAT_MESSAGES_SUCCESS,
    newMessage
  }
}

export function loadNewMessagesFailure () {
  return {
    type: types.LOAD_NEW_MESSAGES_FAILURE,
  }
}

// Load old messages
export function loadOldMessagesAttempt () {
  return {
    type: types.LOAD_OLD_MESSAGES_ATTEMPT,
  }
}

export function loadOldChatOnlyMessagesSuccess (oldMessages) {
  return {
    type: types.LOAD_OLD_CHAT_ONLY_MESSAGES_SUCCESS,
    oldMessages
  }
}

export function loadOldReflectionOnlyMessagesSuccess (oldMessages) {
  return {
    type: types.LOAD_OLD_REFLECTION_ONLY_MESSAGES_SUCCESS,
    oldMessages
  }
}

export function loadOldReflectionAndChatMessagesSuccess (oldMessages) {
  return {
    type: types.LOAD_OLD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS,
    oldMessages
  }
}

export function loadOldMessagesFailure () {
  return {
    type: types.LOAD_OLD_MESSAGES_FAILURE,
  }
}

// Load thread
export function loadThreadListAttempt () {
  return {
    type: types.LOAD_THREAD_LIST_ATTEMPT,
  }
}

export function loadThreadListSuccess (threads) {
  return {
    type: types.LOAD_THREAD_LIST_SUCCESS,
    threads
  }
}

export function loadThreadListFailure () {
  return {
    type: types.LOAD_THREAD_LIST_FAILURE,
  }
}

// Send message
export function sendMessageAttempt () {
  return {
    type: types.SEND_MESSAGE_ATTEMPT,
  }
}

export function sendMessageSuccess () {
  return {
    type: types.SEND_MESSAGE_SUCCESS,
  }
}

export function sendMessageFailure () {
  return {
    type: types.SEND_MESSAGE_FAILURE,
  }
}

// Submit prompt response
export function submitPromptResponseAttempt () {
  return {
    type: types.SUBMIT_PROMPT_RESPONSE_ATTEMPT,
  }
}

export function submitPromptResponseFailure () {
  return {
    type: types.SUBMIT_PROMPT_RESPONSE_FAILURE,
  }
}
