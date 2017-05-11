import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules';

import Github from '../service/github.js'

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//See https://github.com/callemall/material-ui/issues/4670#issuecomment-231603600
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import ColumnItem from './column_item.jsx'
import ColumnSettingButton from './column_setting_button.jsx'

import styles from './column.scss'

class Column extends React.Component {
  update() {
    this.props.updateColumn(this.props.url, this.props.updateAt)
  }
  componentDidMount() {
    this.setInterval = setInterval(this.update.bind(this), 60 * 1000)
  }
  componentWillUnmount() {
    clearInterval(this.setInterval)
  }
  render() {
    return(
      <div styleName="base">
        <MuiThemeProvider>
          <AppBar
            title={this.props.name}
            iconElementRight={this.props.isMainColumn ? null :
              <ColumnSettingButton
                muiName='IconMenu'
                deleteColumn={() => this.props.deleteColumn(this.props.url)}
              />
            }
          />
        </MuiThemeProvider>
        <div styleName="body">
          {this.props.items.map((item) => <ColumnItem key={item.key} item={item} addColumn={this.props.addColumn}/>) }
        </div>
      </div>
    );
  }
}

export default CSSModules(Column, styles)
