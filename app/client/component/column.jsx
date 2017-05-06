import React from 'react'
import ReactDOM from 'react-dom'
import ColumnItem from './column_item.jsx'
import Github from '../service/github.js'
import CSSModules from 'react-css-modules';

import styles from './column.scss'

class Column extends React.Component {
  render() {
    return(
      <div styleName="base">
        <div styleName="head">
          <div styleName="name">
            {this.props.name}
          </div>
          <div styleName="close-button">
            x
          </div>
        </div>
        {this.props.items.map((item) => <ColumnItem key={this.props.url + item.id} item={item} addColumn={this.props.addColumn}/>) }
      </div>
    );
  }
}

export default CSSModules(Column, styles)
