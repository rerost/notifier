import { combineReducers } from 'redux';
import { Map } from 'immutable';

import * as columnActions from '../actions/column.js'
import Column from '../models/column.js'

// State::[<URL, Column>]

const initialState = Map({
  "keys": ["https://api.github.com/notifications"],
  "https://api.github.com/notifications": new Column({
    name: "Loading...",
    items: [],
    isFetching: false
  })
})

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case columnActions.REQUEST_ITEMS:
      return state.update(
        action.url,
        (value => value.update({
          name: "Loading...",
          items: [],
          isFetching: true,
        }))
      );
    case columnActions.RECEIVE_ITEMS:
      return state.update(
        action.url,
        (value => value.update({
          items: action.items,
          isFetching: false
        }))
      )
    case columnActions.RECEIVE_ITEM:
      return state.update(
        action.url,
        (value => value.update({
          items: [action.item, ...state.get(action.url).items],
          isFetching: false
        }))
      )
    case columnActions.SET_NAME:
      return state.update(
        action.url,
        (value => value.update({
          name: action.name,
        }))
      )
    case columnActions.ADD_COLUMN:
      return state.update(
        "keys",
        (value => value.includes(action.url) ? value : [...value, action.url])
      ).set(
        action.url,
        new Column({
          name: "Loading...",
          items: [],
          isFetching: false,
        })
      )
    case columnActions.DELETE_COLUMN:
      return state.update(
        "keys",
        (value => {
          value.forEach((v, i) => {
            if(v == action.url) {
              value.splice(i, 1)
            }
          })
          return value
        })
      ).delete(
        action.url
      )
    default:
      return state
  }
}

export const reducer = combineReducers({
  columnReducer,
})
