import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './stores/main.js'
import * as columnActions from './actions/column.js'
import Main from '../component/main.jsx'

const mapStateToProps = (state) => {
  return {
    columns: state.columnReducer,
    modal: state.modalReducer,
    main: state.mainReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: (url) => {
      dispatch(columnActions.fetchItems(url))
    },
    addColumn: (url, update_at) => {
      dispatch(columnActions.addColumn(url))
    },
    deleteColumn: (url) => {
      dispatch(columnActions.deleteColumn(url))
    },
    updateColumn: (url, update_at) => {
      dispatch(columnActions.updateColumn(url, update_at))
    },
    checkNotification: (url, item_key, item_thread_url) => {
      dispatch(columnActions.checkNotification(url, item_key, item_thread_url))
    },
    showModal: (src) => {
      dispatch(columnActions.showModal(src))
    },
    hideModal: () => {
      dispatch(columnActions.hideModal())
    },
    showOauthModal: () => {
      dispatch(columnActions.showOauthModal())
    },
    hideOauthModal: () => {
      dispatch(columnActions.hideOauthModal())
    },
    sendReaction: (url, key, comment_url, reaction) => {
      dispatch(columnActions.sendReaction(url, key, comment_url, reaction))
    },
    getReactions: (url, key, comment_url) => {
      dispatch(columnActions.getReactions(url, key, comment_url))
    },
  }
}

const store = configureStore()

const MainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <MainConnected />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
);
