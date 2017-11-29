const { parse, stringify } = JSON

class Storage {
  constructor() {
    this.storage = (typeof (window) !== 'undefined' && window.localStorage) || {}
  }

  get(key, defaultValue) {
    const value = this.storage.getItem(key)

    if (value === null) {
      return defaultValue
    }

    try {
      return parse(value)
    } catch (e) {
      return value
    }
  }

  set(key, value) {
    this.storage.setItem(key, stringify(value))
  }

  remove(key) {
    this.storage.removeItem(key)
  }

  keys() {
    return Object.keys(this.storage)
  }
}

export default new Storage()
