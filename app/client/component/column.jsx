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
        <p styleName="name">{this.props.name}</p>
        {this.props.items.map((item) => <ColumnItem key={this.props.url + item.id} item={item}/>) }
      </div>
    );
  }
}

export default new CSSModules(Column, styles)
