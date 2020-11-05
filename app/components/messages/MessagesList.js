import React, {Component} from 'react'
import {
  FlatList
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
      <FlatList
        data={this.props.dataSource}
        enableEmptySections
        renderItem={(data) => this.renderMessagesListRow(data)}
      />
    )
  }
}

module.exports = MessagesList
