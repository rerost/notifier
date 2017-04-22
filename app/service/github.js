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
      this.client.get('/notifications', {}, function (err, status, body, headers) {
        if　(err) {
          reject(err)
        }
        //console.log(body)
        //user_id:         speakers service id
        //content_id:      contents id (another service id need check)
        //user_name:       service user name
        //content:         Speech content
        //reply_content:   reply about what content
        //reply_user:      reply about what user_id
        resolve(body)
        //resolve(_items.map((item) => convert(item)))
        //return callback(_items);
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
          user_id:       1,
          content_id:    2,
          user_name:     "rerost",
          content:       "hogehoge",
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
