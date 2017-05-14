import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import Table from '../component/table.jsx'

import configureStore from './stores/main.js'
import * as columnActions from './actions/column.js'

import { GithubOauth } from '../../lib/oauth.js'

const mapStateToProps = (state) => {
  return {
    columns: state.columnReducer,
    modal: state.modalReducer,
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
    }
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.props.columns.get("keys").map((url) => this.props.load(url))
  }
  render() {
    return(
      <div onClick={this.props.onMainClick}>
        <Table
          columns={this.props.columns}
          addColumn={this.props.addColumn}
          deleteColumn={this.props.deleteColumn}
          updateColumn={this.props.updateColumn}
          checkNotification={this.props.checkNotification}
          showModal={this.props.showModal}
        />
      </div>
    );
  }
}

const store = configureStore()

const MainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

if (localStorage.getItem("githubToken") == null) {
  window.open(GithubOauth.requestAccessUrl())
}

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById('main')
);
