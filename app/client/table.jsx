import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'

const style = {
  display: "flex",
}

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: ["Github Notify"].map((n) => { return <Column key={n} name={n}></Column> }),
    }
  }
  render() {
    return(
      <div style={style}>
        {this.state.columns}
      </div>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('table')
);
