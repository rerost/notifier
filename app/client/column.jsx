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
  constructor(props) {
    super(props)
    this.github = new Github("cd853010e6f5c47f79e7a00d43cb2268c491a56b")
    this.github.getNotification().then(this.githubCallback.bind(this), this.failed)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    this.github.getNotification().then(this.githubCallback.bind(this), this.failed)
  }
  githubCallback(body) {
    this.setState({ items: body.map((item) => <ColumnItem key={item.content_id} item={item} />) })
  }
  //test function
  failed(err) {
    console.log(err)
  }
  render() {
    return(
      <div style={style}>
        <p style={title_style}>{this.props.name}</p>
        {this.state.items}
      </div>
    );
  }
}
