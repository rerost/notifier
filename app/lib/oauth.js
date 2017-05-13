const fetch = require('node-fetch')

const CLIENT_ID =  "331291a298e1d74f02ea"
const CLIENT_SECRET = "bd9e2c1fbb0d53c7bca9904faceaf238e80025c2"

class GithubOauth {
  static requestAccessUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=public_repo%20notifications`
  }
  static requestAccessTokenUrl(code) {
    return `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
  }
  static requestAccessToken(code) {
    return fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
      {
        method: 'POST',
      }
    )
  }
}

exports.GithubOauth = GithubOauth
//param :: String
exports.parseParam = (param) => {
  const params = param.split('&')
  const paramsArray = params.map(param => {
    [key, value] = param.split('=')
    const obj = {}
    obj[key] = value
    return obj
  })
  const parsedParams = paramsArray.reduce((prev, next) => Object.assign(prev, next))

  return parsedParams
}
