const { parse, stringify } = JSON

class Storage {
  constructor() {
    this.storage = (typeof window !== 'undefined' && window.localStorage) || {}
  }

  get(key, defaultValue) {
    if (typeof this.storage.getItem !== 'function') {
      return 0
    }

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
    if (!this.storage.setItem) {
      return
    }

    this.storage.setItem(key, stringify(value))
  }

  remove(key) {
    if (!this.storage.removeItem) {
      return
    }

    this.storage.removeItem(key)
  }

  keys() {
    return Object.keys(this.storage)
  }
}

export default new Storage()
