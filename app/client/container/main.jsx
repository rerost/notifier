import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import Modal from 'react-modal'

import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    },
    hideModal: () => {
      dispatch(columnActions.hideModal())
    }
  }
}

const modalStyle = {
  overlay : {
    position          : 'fixed',
    display           : 'flex',
    alignItems        : 'center',
    justifyContent    : 'center',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.4)',
    zIndex           : 10000,
  },
  content : {
    position                   : 'absolute',
    height                     : '80%',
    top                        : 'auto',
    left                       : 'auto',
    right                      : 'auto',
    bottom                     : 'auto',
    background                 : '#fff',
    overflow                   : 'none',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '20px',
    border                     : 'none',
    background                 : "none",
  }
}

const modalOauthStyle = {
  overlay : {
    position          : 'fixed',
    display           : 'flex',
    alignItems        : 'center',
    justifyContent    : 'center',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.4)',
    zIndex           : 10000,
  },
  content : {
    position                   : 'absolute',
    width                      : '50%',
    height                     : '50%',
    top                        : 'auto',
    left                       : 'auto',
    right                      : 'auto',
    bottom                     : 'auto',
    background                 : '#fff',
    overflow                   : 'none',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '20px',
    border                     : 'none',
    background                 : "rgba(255, 255, 255, 1)",
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.props.columns.get("keys").map((url) => this.props.load(url))
  }
  render() {
    return(
      <MuiThemeProvider>
        <div>
          <Table
            columns={this.props.columns}
            addColumn={this.props.addColumn}
            deleteColumn={this.props.deleteColumn}
            updateColumn={this.props.updateColumn}
            checkNotification={this.props.checkNotification}
            showModal={this.props.showModal}
          />
          <Modal
            isOpen={this.props.modal.isOpen}
            contentLabel="Image Modal"
            onRequestClose={this.props.hideModal}
            style={modalStyle}
          >
            <img onClick={(e) => e.stopPropagation()} src={this.props.modal.src} style={{height: "100%", width: "auto"}}/>
          </Modal>
          <Modal
            isOpen={true}
            contentLabel="OAuth Modal"
            style={modalOauthStyle}
          >
            <h1>Please OAuth</h1>
            <div>
              hogehoge
            </div>
          </Modal>
        </div>
      </MuiThemeProvider>
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
