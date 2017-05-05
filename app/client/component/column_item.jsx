import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

const style = {
}

export default class ColumnItem extends React.Component {
  render() {
    return(
      <div style={style} onClick={() => this.props.addColumn(this.props.item.url)}>
        <p>{this.props.item.content}</p>
      </div>
    );
  }
}
