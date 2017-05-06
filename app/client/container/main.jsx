import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import Table from '../component/table.jsx'

import configureStore from './stores/main.js'
import * as columnActions from './actions/column.js'

const mapStateToProps = (state) => {
  return {
    columns: state.columnReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: (url) => {
      dispatch(columnActions.fetchItems(url))
    },
    addColumn: (url) => {
      dispatch(columnActions.addColumn(url))
    }
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.props.columns.get("keys").map((url) => this.props.load(url))
  }
  render() {
    return(
      <div onClick={this.props.onMainClick}>
        <Table columns={this.props.columns} addColumn={this.props.addColumn}/>
      </div>
    );
  }
}

const store = configureStore()

const MainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById('main')
);
