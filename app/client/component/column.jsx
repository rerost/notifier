import React from 'react'
import ReactDOM from 'react-dom'
import ColumnItem from './column_item.jsx'
import Github from '../service/github.js'

const style = {
  marginRight: "10px",
  marginLeft:  "10px",
  width: "300px",
}

const title_style = {
  backgroundColor: "#ddd",
  height: "50px",
  fontSize: "40px",
}

export default class Column extends React.Component {
  render() {
    console.log(this.props)
    return(
      <div style={style}>
        <p style={title_style}>{this.props.name}</p>
        {this.props.items.map((item) => <ColumnItem key={this.props.url + item.id} item={item}/>) }
      </div>
    );
  }
}
