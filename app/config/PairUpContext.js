import React, { Component } from 'react'

const PairUpContext = React.createContext();
const InitialState = {
  isAuthenticated: false,
  isPending: false,
  hasOnboarded: false,
  behavior: 'padding',
  user: null,
}

export { PairUpContext as default, InitialState };
