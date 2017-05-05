import Github from '../../service/github.js'

export const REQUEST_ITEMS  = "column/request_items"
export const RECEIVE_ITEMS  = "column/receive_items"
export const RECEIVE_ITEM   = "column/receive_item"
export const SET_NAME       = "column/set_name"
export const ADD_COLUMN     = "column/add_column"

const requestItems = (url) => {
  return {
    type: REQUEST_ITEMS,
    url: url,
  }
}

const receiveItems = (url, items) => {
  return {
    type: RECEIVE_ITEMS,
    name: url,  //need get issue title
    items: items,
    url: url,
    receivedAt: Date.now(),
  }
}

const receiveItem = (url, item) => {
  return {
    type: RECEIVE_ITEM,
    name: url,  //need get issue title
    item: item,
    url: url,
    receivedAt: Date.now(),
  }
}

export const fetchItems = (url) => {
  return dispatch => {
    dispatch(requestItems(url))
    if (url === "https://api.github.com/notifications") {
      return (new Github("1f35bb9393933fac6fa8f04b700e4ee2c643637a")).getNotification()
        .then((items) => items.map((item) => item.then((i) => dispatch(receiveItem(url, i)))))
    }
    else {
      return (new Github("1f35bb9393933fac6fa8f04b700e4ee2c643637a")).getUrl(url)
        .then((items) => dispatch(receiveItems(url, items)))
    }
  }
}

export const setName = (url, name) => {
  return {
    type: SET_NAME,
    url: url,
    name: name,
  }
}

export const addColumn = (url) => {
  return dispatch => {
    dispatch(
      {
        type: ADD_COLUMN,
        url: url,
      }
    )
    dispatch(fetchItems(url))
  }
}
