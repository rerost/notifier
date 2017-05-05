import { combineReducers } from 'redux';

import * as mainActions from '../actions/main.js'
import * as columnActions from '../actions/column.js'

const mainReducer = (state = {count: 0}, action) => {
  switch (action.type) {
    case mainActions.MAIN_CLICK:
      console.log(state.count)
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    default:
      return state;
  }
}

const columnReducer = (state = {"https://api.github.com/notifications": {name: "Loading...", items: [], isFetching: false}}, action) => {
  switch (action.type) {
    case columnActions.REQUEST_ITEMS:
      return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
          name: "Loading...",
          items: [],
          isFetching: true,
        })
      });
    case columnActions.RECEIVE_ITEMS:
      return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
          items: action.items,
          isFetching: false
        })
      });
    case columnActions.RECEIVE_ITEM:
      return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
          items: [action.item, ...state[action.url].items],
          isFetching: false
        })
      })
    case columnActions.SET_NAME:
      return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
          name: action.name,
        })
      })
    case columnActions.ADD_COLUMN:
      return Object.assign({}, state, {
        [action.url]: Object.assign({}, state[action.url], {
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
  mainReducer,
  columnReducer,
})
