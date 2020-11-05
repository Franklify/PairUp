import * as AuthActions from './authActions'
import * as MessagesActions from './messagesActions'

export const ActionCreators = Object.assign({}, // Maybe "...{}"
  AuthActions,
  MessagesActions
)
