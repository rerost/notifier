import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import { ev } from '../service/event.js'

const style = {
}

class ColumnItem extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }
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

ColumnItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.object.isRequired,
}

export default ColumnItem
