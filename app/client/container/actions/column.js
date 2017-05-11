import Github from '../../service/github.js'

export const REQUEST_ITEMS  = "column/request_items"
export const RECEIVE_ITEMS  = "column/receive_items"
export const RECEIVE_ITEM   = "column/receive_item"
export const SET_NAME       = "column/set_name"
export const ADD_COLUMN     = "column/add_column"
export const DELETE_COLUMN  = "column/delete_column"

const requestItems = (url) => {
  return {
    type: REQUEST_ITEMS,
    url: url,
  }
}

const receiveItems = (url, items) => {
  return dispatch => {
    const receivedAt = new Date()

    dispatch({
      type: RECEIVE_ITEMS,
      name: url,  //need get issue title
      items: items,
      url: url,
      updateAt: receivedAt,
    })
  }
}

const receiveItem = (url, item) => {
  return {
    type: RECEIVE_ITEM,
    name: url,  //need get issue title
    item: item,
    url: url,
  }
}

export const fetchItems = (url, option = {}) => {
  return dispatch => {
    dispatch(requestItems(url))
    return (new Github("1f35bb9393933fac6fa8f04b700e4ee2c643637a")).getUrl(url, option)
      .then(({items}) => {
        items.map(item => {
          var n = new Notification('Notifier', {
            body: item.content
          });
        })
        dispatch(receiveItems(url, items))
      })
  }
}

export const setName = (url, name) => {
  return {
    type: SET_NAME,
    url: url,
    name: name,
  }
}

export const addColumn = (url, update_at) => {
  return dispatch => {
    dispatch(
      {
        type: ADD_COLUMN,
        url: url,
      }
    )
    new Github("1f35bb9393933fac6fa8f04b700e4ee2c643637a").getUrl(url)
      .then(({title}) => dispatch(setName(url, title)))
    dispatch(fetchItems(url, url))
  }
}

export const deleteColumn = (url) => {
  return {
    type: DELETE_COLUMN,
    url: url,
  }
}

// update_at : new Date
export const updateColumn = (url, update_at) => {
  return dispatch => {
    if (update_at == null) {
      dispatch(fetchItems(url))
    }
    else {
      dispatch(fetchItems(url, {since: Github.convertToGithubTime(update_at)}))
    }
  }
}
