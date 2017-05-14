import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules';

import Github from '../service/github.js'

import AppBar from 'material-ui/AppBar';
import { List } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//See https://github.com/callemall/material-ui/issues/4670#issuecomment-231603600
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ColumnItem from './column_item.jsx'
import ColumnSettingButton from './column_setting_button.jsx'

const remote = require('electron').remote
const { openUrl } = remote.require('./index.js')

import styles from './column.scss'

const progress_style = {
  display: "block",
  margin:  "auto"
}

class Column extends React.Component {
  update() {
    this.props.updateColumn(this.props.url, this.props.updateAt)
  }
  componentDidMount() {
    this.setInterval = setInterval(this.update.bind(this), 60 * 1000)
  }
  componentWillUpdate(nextProps) {
    if (nextProps.isMainColumn) {
      const items = nextProps.items.filter(item => !this.props.items.map(item_ => item_.key).includes(item.key))
      items.map(item => {
        var n = new Notification('Notifier', {
          body: item.content
        });
        n.onclick = () => {
          openUrl(item.html_url)
        }
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.setInterval)
  }
  render() {
    return(
      <MuiThemeProvider>
        <div styleName="base">
            <AppBar
              title={this.props.name}
              iconElementRight={this.props.isMainColumn ? null :
                <ColumnSettingButton
                  muiName='IconMenu'
                  deleteColumn={() => this.props.deleteColumn(this.props.url)}
                />
              }
            />
          <div styleName="body">
            <List >
              {this.props.items.map((item) => <ColumnItem key={item.key} item={item} columnUrl={this.props.url} isMainColumn={this.props.isMainColumn} addColumn={this.props.addColumn} checkNotification={this.props.checkNotification} showModal={this.props.showModal}/>) }
            </List>
            {(() => {
              if (this.props.items.length == 0) //FIXME use isFetching
                return (
                  <div>
                    <CircularProgress style={progress_style} size={40} thickness={5} />
                  </div>
                )
            })()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CSSModules(Column, styles)
