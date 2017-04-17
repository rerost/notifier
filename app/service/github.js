const github = require('octonode');
var request = require('superagent');

export default class Github {
  constructor(token) {
    this.client = github.client(token);
  }

  getNotification(callback) {
    client.get('/notifications', {}, function (err, status, body, headers) {
      if　(!err) {
        console.log("failed");
        [err, status, body, headers].map((elem) => console.log(elem))
      }
      callback(body);
    });
  }
}
