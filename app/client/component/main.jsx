import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import Table from '../component/table.jsx'

import { GithubOauth } from '../../lib/oauth.js'

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
    display                    : 'flex',
    maxHeight                  : '80%',
    maxWidth                   : '80%',
    position                   : 'absolute',
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
    backgroundColor            : 'rgba(0, 0, 0, 0.9)',
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
    display                    : 'flex',
    justifyContent             : 'center',
    alignItems                 : 'center',
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

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.props.columns.get("keys").map((url) => this.props.load(url))
  }
  componentDidMount() {
    if (localStorage.getItem("githubToken") == null) {
      this.props.showOauthModal()
    }
    window.addEventListener('storage', (e) => {
      if(e.key == "githubToken" && e.newValue != null) {
        this.props.hideOauthModal()
        this.props.columns.get("keys").map(url => this.props.load(url))
      }
    })
  }
  render() {
    return(
      <div>
        <Table
          main={this.props.main}
          columns={this.props.columns}
          addColumn={this.props.addColumn}
          deleteColumn={this.props.deleteColumn}
          updateColumn={this.props.updateColumn}
          checkNotification={this.props.checkNotification}
          showModal={this.props.showModal}
          sendReaction={this.props.sendReaction}
          getReactions={this.props.getReactions}
        />
        <Modal
          isOpen={this.props.modal.isOpen}
          contentLabel="Image Modal"
          onRequestClose={this.props.hideModal}
          style={modalStyle}
        >
          <img onClick={(e) => e.stopPropagation()} src={this.props.modal.src}/>
        </Modal>
        <Modal
          isOpen={this.props.modal.isOpenOauthModal}
          contentLabel="OAuth Modal"
          onRequestClose={this.props.hideOauthModal}
          style={modalOauthStyle}
        >
          <div style={{display: "flex", flexFlow: "column nowrap", alignItems: "center",}}>
            <h1>Please OAuth</h1>
            <div>
              <IconButton iconClassName="muidocs-icon-custom-github"
                style={{width: 180, height: 180, padding: 30}}
                iconStyle={{fontSize: 120}}
                onClick={() => {
                  OAuth.initialize('FuVF5YnLXj2OcaMy0uRbh6hC4T4');
                  console.log("asd")
                  OAuth.popup('github').done(function(result) {
                    console.log(result)
                    // do some stuff with result
                  })}
                }
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
