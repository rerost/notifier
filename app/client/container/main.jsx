import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import Table from '../component/table.jsx'
import NewButton from '../component/new_button.jsx'

import configureStore from './stores/main.js'
import * as actions from './actions/main.js'

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMainClick: () => {
      dispatch(actions.mainClick())
    }
  }
}

class Main extends React.Component {
  render() {
    return(
      <div onClick={this.props.onMainClick}>
        <Table />
        <NewButton />
        <p>{this.props.count}</p>
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
