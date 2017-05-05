import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'
import { ev } from '../service/event.js'

const style = {
  display: "flex",
}

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.events()
    this.props.columns
  }
  events() {
    ev.on('new_button:click', (e) => {
      const title = "new column:" + this.state.columns.length
      this.setState({columns: [...this.state.columns, <Column key={title} name={title}></Column>]})
    })

    ev.on('column_item:click', (url) => {
      const title = "test:" + this.state.columns.length
      this.setState({columns: [...this.state.columns, <Column key={title} name={title} url={url}></Column>]})
    })
  }
  render() {
    const columns = Object.keys(this.props.columns).map((url) => {
      return <Column
        key={url}
        url={url}
        name={this.props.columns[url].name}
        items={this.props.columns[url].items}
      />
    })
    return(
      <div style={style}>
        {columns}
      </div>
    );
  }
}
