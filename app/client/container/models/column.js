import { Record } from 'immutable'

export default class Column extends Record({
  name: "Loading...",
  items: [],
  update_at: null, //Date
  isFetching: false,
  isMainColumn: false
}) {
  update(params) {
    var cached = this
    Object.keys(params).forEach(key => {
        cached = cached.set(key, params[key])
      }
    )
    return cached
  }
}
