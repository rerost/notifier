import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import { ev } from '../service/event.js'

const style = {
}

export default class ColumnItem extends React.Component {
  onClick(e) {
    ev.emit("column_item:click", this.props.item.url)
  }
  render() {
    return(
      <div style={style} onClick={this.onClick.bind(this)}>
        <p>{this.props.item.content}</p>
      </div>
    );
  }
}
