import { combineReducers } from 'redux';
import { Map } from 'immutable';

import * as columnActions from '../actions/column.js'

const initialState = {
  "https://api.github.com/notifications": Map({
    name: "Loading...",
    items: [],
    isFetching: false
  })
}

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case columnActions.REQUEST_ITEMS:
      return Object.assign({}, state, {
        [action.url]: state[action.url].merge(Map({
          name: "Loading...",
          items: [],
          isFetching: true,
        }))
      });
    case columnActions.RECEIVE_ITEMS:
      return Object.assign({}, state, {
        [action.url]: state[action.url].merge(Map({
          items: action.items,
          isFetching: false
        }))
      });
    case columnActions.RECEIVE_ITEM:
      return Object.assign({}, state, {
        [action.url]: state[action.url].merge(Map({
          items: [action.item, ...state[action.url].items],
          isFetching: false
        }))
      })
    case columnActions.SET_NAME:
      return Object.assign({}, state, {
        [action.url]: state[action.url].merge(Map({
          name: action.name,
        }))
      })
    case columnActions.ADD_COLUMN:
      return Object.assign({}, state, {
        [action.url]: Map({
          name: "Loading...",
          items: [],
          isFetching: false,
        })
      })
    default:
      return state
  }
}

export const reducer = combineReducers({
  columnReducer,
})
