import React, {Component} from 'react'
import {
  Flatlist
} from 'react-native'
import MessagesListRow from './MessagesListRow'

class MessagesList extends Component {
  constructor (props) {
    super(props)
  }

  renderMessagesListRow (data) {
    return (
      <MessagesListRow loadMessages={this.props.loadMessages} thread_info={data} />
    )
  }

  render () {
    return (
      <Flatlist
        data={this.state.dataSource}
        enableEmptySections
        renderItem={(data) => this.renderMessagesListRow(data)}
      />
    )
  }
}

module.exports = MessagesList
