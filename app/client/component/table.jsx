import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'
import { ev } from '../service/event.js'

const style = {
  display: "flex",
}

export default class Table extends React.Component {
  render() {
    const columns = Object.keys(this.props.columns).map((url) => {
      return <Column
        key={url}
        url={url}
        name={this.props.columns[url].name}
        items={this.props.columns[url].items}
        addColumn={this.props.addColumn}
      />
    })
    return(
      <div style={style}>
        {columns}
      </div>
    );
  }
}
