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
          id:            body.id,
          user_id:       body.user.id,
          content_id:    notification.id,
          user_name:     body.user.login,
          content:       body.body,
          reply_user:    2,
          reply_content: 1,
          url:           body.issue_url + "/comments",
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

  getUrlType(url) {
    const truncted_url = url.replace(/^https:\/\/api.github.com\//, "")
    const regex_and_return = [
      {
        regex: /^notifications/,
        type:  "notifications",
      },
      {
        regex: /issues\/\d*$/,
        type:  "issue",
      },
      {
        regex: /issues\/\d*\/comments$/,
        type:  "comments"
      },
    ]

    let matched_type = ""

    regex_and_return.forEach((elem) => {
      if (elem.regex.test(truncted_url)) {
        matched_type = elem.type
      }
    })

    return matched_type
  }

  getUrl(url) {
    const getUrl = new Promise((resolve, reject) => {
      this.client.get(url, {}, (err, status, body, headers) => {
        resolve(body)
      })
    })
    const url_type = this.getUrlType(url)
    switch (url_type) {
      case "notifications":
        return new Promise((resolve, reject) => {
          getUrl.then((body) => {
            Promise.all(body.map((notification) => {
              return new Promise((res, rej) => {
                this.client.get(notification.subject.latest_comment_url, {}, (err, status, body, headers) => {
                  const item = {
                    timestamp:     body.updated_at,
                    id:            body.id,
                    user_id:       body.user.id,
                    content_id:    notification.id,
                    user_name:     body.user.login,
                    content:       body.body,
                    reply_user:    2,
                    reply_content: 1,
                    url:           body.issue_url + "/comments",
                  }
                  res(item)
                })
              })
            })).then(resolve)
          })
        })
      case "comments":
        return new Promise((resolve, reject) => {
          getUrl.then((body) => {
            const items = body.map((item) => {
              return {
                timestamp:     item.updated_at,
                id:            item.id,
                user_id:       item.user.id,
                content_id:    item.id,
                user_name:     item.user.url,
                content:       item.body,
                reply_user:    2,
                reply_content: 1,
                url:           url,
              }
            })
            resolve(items)
          })
        })
      case "issue":
        return new Promise((resolve, reject) => {
          getUrl.then((body) => {
            resolve(body.title)
          })
        })
    }
  }
}
