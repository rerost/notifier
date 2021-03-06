import Github from '../../service/github.js'

export const REQUEST_ITEMS      = "column/request_items"
export const RECEIVE_ITEMS      = "column/receive_items"
export const SET_NAME           = "column/set_name"
export const ADD_COLUMN         = "column/add_column"
export const DELETE_COLUMN      = "column/delete_column"
export const DELETE_ITEM        = "column/check_notification"
export const SHOW_MODAL         = "markdown/show_modal"
export const HIDE_MODAL         = "main/hide_modal"
export const SHOW_OAUTH_MODAL   = "main/show_oauth_modal"
export const HIDE_OAUTH_MODAL   = "main/hide_oauth_modal"
export const RECEIVED_REACTION  = "column_item/received_reaction"
export const RECEIVED_REACTIONS = "column_item/received_reactions"
export const RECEIVED_USER_ID   = "main/receive_user_id"

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
      items: items,
      url: url,
      updateAt: receivedAt,
    })
  }
}

export const fetchItems = (url, option = {}) => {
  return dispatch => {
    dispatch(requestItems(url))
    const token = localStorage.getItem("githubToken")
    if (token) {
      return (new Github(token)).getUrl(url, option)
        .then(({items}) => dispatch(receiveItems(url, items)))
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

export const addColumn = (url, update_at) => {
  return dispatch => {
    dispatch(
      {
        type: ADD_COLUMN,
        url: url,
      }
    )
    const token = localStorage.getItem("githubToken")
    if (token) {
      (new Github(token)).getUrl(url)
        .then(({title}) => dispatch(setName(url, title)))
    }
    dispatch(fetchItems(url))
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

export const checkNotification = (url, item_key, item_thread_url) => {
  return dispatch => {
    const token = localStorage.getItem("githubToken")
    if (token) {
      (new Github(token)).checkNotification(item_thread_url)
    }
    dispatch({
      type: DELETE_ITEM,
      url: url,
      item_key: item_key
    })
  }
}

//comment_url = /repos/:owner/:repo/issues/:number/reactions
//reaction <- {"+1", "-1", "laugh", "confused", "heart", "hooray"}
export const sendReaction = (url, key, comment_url, reaction) => {
  return dispatch => {
    const token = localStorage.getItem("githubToken")
    if (token) {
      (new Github(token))
      .sendReaction(comment_url, reaction)
      .then((json) => {dispatch(receivedReactions(url, key, [{content: json.content, user_id: json.user_id}]))}, () => {})
    }
  }
}

export const getReactions = (url, key, comment_url) => {
  return dispatch => {
    const token = localStorage.getItem("githubToken")
    if (token) {
      const client = (new Github(token))
      client.getMe().then(res => res.json()).then(user => dispatch(receiveUserId(user.id)));
      client.getReactions(comment_url).then((reactions) => {dispatch(receivedReactions(url, key, reactions))}, () => {});
    }
  }
}

const receivedReaction = (url, item_key, reaction) => {
  return {
    type: RECEIVED_REACTION,
    url,
    item_key,
    reaction,
  }
}

const receivedReactions = (url, item_key, reactions) => {
  return {
    type: RECEIVED_REACTIONS,
    url,
    item_key,
    reactions,
  }
}

export const receiveUserId = (user_id) => {
  return {
    type: RECEIVED_USER_ID,
    user_id,
  }
}

export const showModal = (src) => {
  return {
    type: SHOW_MODAL,
    src: src,
  }
}

export const hideModal = (src) => {
  return {
    type: HIDE_MODAL,
    src: src,
  }
}

export const showOauthModal = () => {
  return {
    type: SHOW_OAUTH_MODAL,
  }
}

export const hideOauthModal = () => {
  return {
    type: HIDE_OAUTH_MODAL,
  }
}
