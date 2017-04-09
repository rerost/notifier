import React from 'react'
import ReactDOM from 'react-dom'
import Column from './column.jsx'

export default class Table extends React.Component {
  render() {
    const columns = [1,2,3,4,5].map((n) => { return <Column key={n}></Column> });
    return(
      <div>
        {columns}
      </div>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('table')
);
