import { combineReducers } from 'redux';
import { Map } from 'immutable';

import * as columnActions from '../actions/column.js'
import Column from '../models/column.js'

// State::[<URL, Column>]

const initialState = Map({
  "keys": ["https://api.github.com/notifications"],
  "https://api.github.com/notifications": new Column({
    name: "Notification",
    items: [],
    isFetching: false,
    isMainColumn: true,
  })
})

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case columnActions.REQUEST_ITEMS:
      return state.update(
        action.url,
        (value => value.update({
          isFetching: true,
        }))
      );
    case columnActions.RECEIVE_ITEMS:
      const new_items = [
        ...state.get(action.url).get("items").filter(item => !(action.items.map(item => item.key).includes(item.key))),
        ...action.items
      ].sort((item1, item2) => {
        const timestamp1 = item1.timestamp
        const timestamp2 = item2.timestamp

        return timestamp2 - timestamp1 // [5/1,5/2] => [5/2, 5/1]
      })
      return state.update(
        action.url,
        (value => value.update({
          items: new_items,
          updateAt: action.updateAt,
          isFetching: false,
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
          isMainColumn: false,
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
    case columnActions.DELETE_ITEM:
      return state.update(
        action.url,
        (value => value.delete_item(action.item_key))
      )
    default:
      return state
  }
}

const modalReducer = (state = {isOpen: false, isOpenOauthModal: false}, action) => {
  switch (action.type) {
    case columnActions.SHOW_MODAL:
      return {
        isOpen: true,
        src: action.src,
      }
    case columnActions.HIDE_MODAL:
      return {
        isOpen: false,
      }
    case columnActions.SHOW_OAUTH_MODAL:
      return {
        isOpenOauthModal: true,
      }
    case columnActions.HIDE_OAUTH_MODAL:
      return {
        isOpenOauthModal: false,
      }
    default:
      return state
  }
}

export const reducer = combineReducers({
  columnReducer,
  modalReducer,
})
