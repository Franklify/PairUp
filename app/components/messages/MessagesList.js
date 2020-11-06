import React, {Component} from 'react'
import {
  FlatList
} from 'react-native'
import MessagesListRow from './MessagesListRow'

export default function MessagesList(props) {
  function renderMessagesListRow(data) {
    return (
      <MessagesListRow loadMessages={props.loadMessages} threadInfo={data} />
    )
  }

  return (
    <FlatList
      data={props.dataSource}
      enableEmptySections
      renderItem={(data) => renderMessagesListRow(data)}
    />
  )
}
