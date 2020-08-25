import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, BackHandler } from 'redux';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppWithNavigationState from './app/navigators/AppNavigator';
import store from './app/store/store.js'
// ------------------------------------------------------------------
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App