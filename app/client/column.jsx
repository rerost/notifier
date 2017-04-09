import React from 'react'
import ReactDOM from 'react-dom'

const style = {
  paddingRight: "20px",
  paddingLeft:  "20px"
}

export default class Column extends React.Component {
  render() {
    return(
      <div style={style}>
        <p>hoge</p>
      </div>
    );
  }
}
