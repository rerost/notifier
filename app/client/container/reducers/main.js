import { combineReducers } from 'redux';
import { Map } from 'immutable';

import * as columnActions from '../actions/column.js'
import Column from '../models/column.js'

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case columnActions.RECEIVED_USER_ID:
      return Object.assign({}, state, {user_id: action.user_id})
    default:
      return state
  }
}

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
      var new_items = [
        ...state.get(action.url).get("items").filter(item => !(action.items.map(item => item.key).includes(item.key))),
        ...action.items
      ].sort((item1, item2) => {
        const timestamp1 = item1.timestamp
        const timestamp2 = item2.timestamp

        return timestamp2 - timestamp1 // [5/1,5/2] => [5/2, 5/1]
      })
      new_items = new_items.map(item => {
        item.reactions = {
          "+1":       {user_ids: []},
          "-1":       {user_ids: []},
          "laugh":    {user_ids: []},
          "hooray":   {user_ids: []},
          "confused": {user_ids: []},
          "heart":    {user_ids: []},
        }
        return item
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
    case columnActions.RECEIVED_REACTION:
      return state.update(
        action.url,
        (value => { return value.update({items: value.get("items").map((item) => {
          if (item.key == action.item_key) {
            if (!item.reactions) {
              item.reactions = []
            }
            return Object.assign({}, item, {reactions: [...item.reactions, action.reaction]})
          }
          else {
            return item
          }
        })}) } )
      )
    case columnActions.RECEIVED_REACTIONS:
      return state.update(
        action.url,
        (value => value.update({items: value.get("items").map((item) => {
          if (item.key == action.item_key) {
            const merged_reactions= item.reactions
            action.reactions.forEach((reaction) => {
              if (!merged_reactions[reaction.content].user_ids.includes(reaction.user_id)) {
                merged_reactions[reaction.content] = {
                  user_ids: [...merged_reactions[reaction.content].user_ids, reaction.user_id],
                  dissable: true,
                }
              }
            })
            return Object.assign({}, item, {reactions: merged_reactions})
          }
          else {
            return item
          }
        })}))
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
  mainReducer,
  columnReducer,
  modalReducer,
})
