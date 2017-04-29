const github = require('octonode');

const convert = (item) => {
  return  {
    user_id: null,
    content_id: item.id,
    user_name: item.subject.title,
    content: new Promise((resolve, reject) => {})
  }
}

export default class Github {
  constructor(token) {
    this.client = github.client(token);
  }

  getNotificationList() {
    return new Promise((resolve, reject) => {
      this.client.me().notifications({}, (a, body, b) => {
        console.log(body)
        resolve(body)
      })
    })
  }

  //[Promise]
  getNotificationItems() {
    return this.getNotificationList().then(
      (body) => {
        return body.map((notification) => this.convertToItem(notification))
      },
      () => {
        return undefined
      }
    )
  }

  convertToItem(notification) {
    return new Promise((resolve, reject) => {
      this.client.get(notification.subject.latest_comment_url, {}, (err, status, body, headers) => {
        if(err) {
          reject(err)
        }
        const result = {
          timestamp:     body.updated_at,
          user_id:       body.user.id,
          content_id:    notification.id,
          user_name:     body.user.login,
          content:       body.body,
          reply_user:    2,
          reply_content: 1,
        }
        resolve(result)
      })
    })
  }

  getNotification() {
    return this.getNotificationItems().then(
      (result) => result.map((promiseItem => promiseItem.then((i) => i, () => {})))
    )
  }
}
