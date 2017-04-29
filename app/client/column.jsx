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
    this.github = new Github("1f35bb9393933fac6fa8f04b700e4ee2c643637a")
    //this.github.getNotification(this.state.items)//.then(this.githubCallback.bind(this), this.failed)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    this.github.getNotification().then((items) => items.map((item) => item.then(this.callback.bind(this), this.failed)))
  }
  callback(item) {
    this.setState({ items: [<ColumnItem key={item.content_id} item={item} />, ...this.state.items] })
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
