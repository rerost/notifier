import { combineReducers } from 'redux';

import * as actions from '../actions/main.js'

const initialState = {
  count: 0,
}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.MAIN_CLICK:
      console.log(state.count)
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    default:
      return state;
  }
}

export const reducer = combineReducers({
  mainReducer,
})
