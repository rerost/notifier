import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'

const style = {
  display: "flex",
}

export default class Table extends React.Component {
  render() {
    const columns = this.props.columns.get("keys").map((url) => {
      return <Column
        key={url}
        url={url}
        name={this.props.columns.get(url).get("name")}
        items={this.props.columns.get(url).get("items")}
        addColumn={this.props.addColumn}
        deleteColumn={this.props.deleteColumn}
      />
    })
    return(
      <div style={style}>
        {columns}
      </div>
    );
  }
}
