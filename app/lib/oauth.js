const fetch = require('node-fetch')

const GITHUB_CLIENT_ID =  process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

class GithubOauth {
  static requestAccessUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=public_repo%20notifications`
  }
  static requestAccessTokenUrl(code) {
    return `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
  }
  static requestAccessToken(code) {
    return fetch(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
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
