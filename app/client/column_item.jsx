import React from 'react'
import ReactDOM from 'react-dom'

const style = {
}

export default class ColumnItem extends React.Component {
  render() {
    return(
      <div style={style}>
        <p>{this.props.item.content}</p>
      </div>
    );
  }
}
