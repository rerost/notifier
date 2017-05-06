import { Record } from 'immutable'

export default class Column extends Record({name: "Loading...", items: [], isFetching: false,}) {
  update(params) {
    var cached = this
    Object.keys(params).forEach(key => {
        cached = cached.set(key, params[key])
      }
    )
    return cached
  }
}
