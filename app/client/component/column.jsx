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
          {(() => {
            if(!this.props.isMainColumn) {
              return (
                <div styleName="close-button" onClick={() => this.props.isMainColumn ? {} :this.props.deleteColumn(this.props.url)}>
                  x
                </div>
              )
            }
          })()}
        </div>
        <div styleName="body">
          {this.props.items.map((item) => <ColumnItem key={this.props.url + item.id} item={item} addColumn={this.props.addColumn}/>) }
        </div>
      </div>
    );
  }
}

export default CSSModules(Column, styles)
