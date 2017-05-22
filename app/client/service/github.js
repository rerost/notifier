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
    this.token = token
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

  // "2017-04-29T18:27:46Z"
  static convertToDate(github_time) {
    return new Date(github_time)
  }

  static convertToGithubTime(date) {
    return date.toISOString().replace(/\.\d*/,"")
  }

  //"2017-04-29T18:27:46Z" => "2017-05-05 20:05"
  static convertToReadableDate(github_time) {
    const date = new Date(github_time)
    //Integer -> Char -> Integer -> String
    const padding = (number, padding, digit) => {
      const s_number = "" + number
      return padding.repeat(digit - s_number.length) + s_number
    }
    const year   = date.getYear() + 1900
    const month  = padding(date.getMonth() + 1, "0", 2)
    const date_  = padding(date.getDate(),      "0", 2)
    const hour   = padding(date.getHours(),     "0", 2)
    const minute = padding(date.getMinutes(),   "0", 2)
    return `${year}-${month}-${date_} ${hour}:${minute}`
  }

  // /repos/:owner/:repo/issues/:number/reactions
  sendReaction(url, content) {
    const header = new Headers({
      authorization: "token " + this.token,
      Accept: "application/vnd.github.squirrel-girl-preview",
      'Content-Type': 'application/json',
    })
    const data = new FormData();
    data.append( "json", JSON.stringify({"content": content}));

    return fetch(url + `/reactions`, {headers: header, method: 'POST', body: JSON.stringify({"content": content})}).then((res) => console.log(res))
  }

  // url = "https://.."
  // options = {all: true, since: "2017-04-29T18:27:46Z", ...}
  getUrl(url, options = {}) {
    var getUrl = (url, options) => {
      return new Promise((resolve, reject) => {
        this.client.get(url, options, (err, status, body, headers) => {
          resolve(body)
        })
      })
    }

    const url_type = this.getUrlType(url)
    switch (url_type) {
      case "notifications":
        return new Promise((resolve, reject) => {
          getUrl(url, options).then((body) => {
            Promise.all(body.map((notification) => {
              return new Promise((res, rej) => {
                //コメントがなくてissueだけたった場合latest_comment_urlがそのままissueのurlになる
                if(notification.subject.latest_comment_url == null) {
                  this.client.get(notification.subject.url, {}, (err, status, body, headers) => {
                    const item = {
                      timestamp:     this.constructor.convertToDate(body.updated_at),
                      key:           body.issue_url, //only one notification one issue
                      id:            body.id,
                      user_id:       body.user.id,
                      content_id:    notification.id,
                      user_login:    body.user.login,
                      user_name:     this.constructor.convertToReadableDate(body.created_at),
                      content:       body.body,
                      reply_user:    2,
                      reply_content: 1,
                      url:           body.issue_url ? body.issue_url : body.url,
                      html_url:      body.html_url,
                      avatar_url:    body.user.avatar_url,
                      thread_url:    notification.url
                    }
                    res(item)
                  })
                }
                else {
                  this.client.get(notification.subject.latest_comment_url, {}, (err, status, body, headers) => {
                    const item = {
                      timestamp:     this.constructor.convertToDate(body.updated_at),
                      key:           body.issue_url, //only one notification one issue
                      id:            body.id,
                      user_id:       body.user.id,
                      content_id:    notification.id,
                      user_login:    body.user.login,
                      user_name:     this.constructor.convertToReadableDate(body.created_at),
                      content:       body.body,
                      reply_user:    2,
                      reply_content: 1,
                      url:           body.issue_url ? body.issue_url : body.url,
                      html_url:      body.html_url,
                      avatar_url:    body.user.avatar_url,
                      thread_url:    notification.url
                    }
                    res(item)
                  })
                }
              })
            })).then((items) => resolve({items}))
          })
        })
      case "issue":
        return new Promise((resolve, reject) => {
          getUrl(url, options).then((issue) => {
            getUrl(issue.comments_url, options).then((comments) => {
              var items = comments.map((item) => {
                return {
                  timestamp:     this.constructor.convertToDate(item.created_at), //Order by create_at because github is
                  key:           item.id,
                  id:            item.id,
                  user_id:       item.user.id,
                  content_id:    item.id,
                  user_login:    item.user.login,
                  user_name:     this.constructor.convertToReadableDate(item.created_at),
                  content:       item.body,
                  reply_user:    2,
                  reply_content: 1,
                  url:           url,
                  comment_url:   item.url,
                  avatar_url:    item.user.avatar_url,
                  html_url:      item.html_url,
                  isEdited:      false, //FIXME(@rerost)
                }
              })

              const head_item = {
                timestamp:     this.constructor.convertToDate(issue.created_at),
                key:           issue.id,
                id:            issue.id,
                user_id:       issue.user.id,
                content_id:    issue.id,
                user_login:    issue.user.login,
                user_name:     this.constructor.convertToReadableDate(issue.created_at),
                content:       issue.body,
                reply_user:    2,
                reply_content: 1,
                url:           url,
                comment_url:   url,
                html_url:      issue.html_url,
                avatar_url:    issue.user.avatar_url,
                isEdited:      false, //FIXME(@rerost)
                readable_date: this.constructor.convertToReadableDate(issue.created_at),
              }

              if(options.since == null || options.since != null && this.constructor.convertToDate(issue.update_at) > this.constructor.convertToDate(options.since)) {
                items = [head_item, ...items]
              }

              const title = issue.title
              resolve({items, title})
            })
          })
        })
    }
  }

  checkNotification(thread_url) {
    this.client.post(thread_url, {}, (err, status, body, headers) => {
      console.log({err, status, body, headers})
    })
  }
}
