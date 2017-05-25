import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'

const style = {
  overflowX: "scroll",
  whiteSpace: "nowrap",
}
export default class Table extends React.Component {
  render() {
    const columns = this.props.columns.get("keys").map((url) => {
      return <Column
        key={url}
        url={url}
        main={this.props.main}
        name={this.props.columns.get(url).get("name")}
        items={this.props.columns.get(url).get("items")}
        isMainColumn={this.props.columns.get(url).get("isMainColumn")}
        isFetching={this.props.columns.get(url).get("isFetching")}
        updateAt={this.props.columns.get(url).get("updateAt")}
        addColumn={this.props.addColumn}
        deleteColumn={this.props.deleteColumn}
        updateColumn={this.props.updateColumn}
        checkNotification={this.props.checkNotification}
        showModal={this.props.showModal}
        sendReaction={this.props.sendReaction}
        getReactions={this.props.getReactions}
      />
    })
    return(
      <div style={style}>
        {columns}
      </div>
    );
  }
}
