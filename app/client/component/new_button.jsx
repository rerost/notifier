import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'
import { ev } from '../service/event.js'

export default class NewButton extends React.Component {
  onClick(e) {
    ev.emit('new_button:click')
  }
  render() {
    return (
      <div onClick={this.onClick}>
        <p>+</p>
      </div>
    )
  }
}
