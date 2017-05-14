import { Record } from 'immutable'

export default class Column extends Record({
  name: "Loading...",
  items: [],
  updateAt: null, //Date
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
  delete_item(item_key) {
    return this.set("items", this.items.filter(item => item.key != item_key))
  }
}
