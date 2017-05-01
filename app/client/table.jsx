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
    this.state = {
      columns: ["Github Notify"].map((n) => { return <Column key={n} name={n}></Column> }),
    }
    this.events()
  }
  events() {
    ev.on('new_button:click', (e) => {
      const title = "new column:" + this.state.columns.length
      this.setState({columns: [...this.state.columns, <Column key={title} name={title}></Column>]})
    })
  }
  render() {
    return(
      <div style={style}>
        {this.state.columns}
      </div>
    );
  }
}
