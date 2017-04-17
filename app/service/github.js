const github = require('octonode');

export default class Github {
  constructor(token) {
    this.client = github.client(token);
  }

  //callback::[Object] -> Component
  getNotification(callback) {
    // this.client.get('/notifications', {}, function (err, status, body, headers) {
    //   if　(!err) {
    //     console.log("failed");
    //     [err, status, body, headers].map((elem) => console.log(elem))
    //   }
    //   console.log(body)
    //   //user_id:         speakers service id
    //   //content_id:      contents id (another service id need check)
    //   //user_name:       service user name
    //   //content:         Speech content
    //   //reply_content:   reply about what content
    //   //reply_user:      reply about what user_id
      const _items = [
        {user_id: "@rerost", content_id: 1, user_name:"れろすと", content:"hogehogehoge",   reply_content:null, reply_user_id:null},
        {user_id: "@edaqqq", content_id: 2, user_name:"えだ",    content:"@rerost foobar", reply_content:1, reply_user_id:1}
      ]
      return callback(_items);
    // });
  }


}
