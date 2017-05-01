import React from 'react'
import ReactDOM from 'react-dom'

import Table from './table.jsx'
import NewButton from './new_button.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <Table />
        <NewButton />
      </div>
    );
  }
}
ReactDOM.render(
  <Main />,
  document.getElementById('main')
);
console.log(document.getElementById('main'))
