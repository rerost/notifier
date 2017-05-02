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
    this.state = {
      items: [],
      url: null,
    }
    console.log(props.url)
    if(props.url){
      this.state = Object.assign(this.state, {url: props.url})
    }
  }
  componentDidMount() {
    if (this.state.url) {
      this.github.getUrl(this.state.url).then(this.callbackArray.bind(this), this.failed)
    }
    else {
      this.github.getNotification().then((items) => items.map((item) => item.then(this.callback.bind(this), this.failed)))
    }
  }
  callback(item) {
    this.setState({ items: [<ColumnItem key={this.props.name + item.content_id} item={item} />, ...this.state.items], state: this.state.url })
  }
  callbackArray(items) {
    items.map((item) => this.callback(item))
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
