import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'

const style = {
  display: "flex",
}

export default class Table extends React.Component {
  render() {
    const columns = [1,2,3,4,5].map((n) => { return <Column key={n} name={n}></Column> });
    return(
      <div style={style}>
        {columns}
      </div>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('table')
);
