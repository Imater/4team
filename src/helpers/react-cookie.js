/* eslint-disable */
import cookie from 'cookie'

function init() {
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      target = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index]
        if (source !== null) {
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
      }
      return target
    }
  }

  let _rawCookie = {}
  let _res = undefined

  function _isResWritable() {
    if(!_res)
      return false
    if(_res.headersSent === true)
      return false
    return true
  }

  function load(name, doNotParse) {
    const cookies = (typeof document === 'undefined') ? _rawCookie : cookie.parse(document.cookie)
    let cookieVal = cookies && cookies[name]

    if (!doNotParse) {
      try {
        cookieVal = JSON.parse(cookieVal)
      } catch(e) {
        // Not serialized object
      }
    }

    return cookieVal
  }

  function select(regex) {
    const cookies = (typeof document === 'undefined') ? _rawCookie : cookie.parse(document.cookie)
    if(!cookies)
      return {}
    if(!regex)
      return cookies
    return Object.keys(cookies)
      .reduce((accumulator, name) => {
        if(!regex.test(name))
          return accumulator
        const newCookie = {}
        newCookie[name] = cookies[name]
        return Object.assign({}, accumulator, newCookie)
      }, {})
  }

  function save(name, val, opt) {
    _rawCookie[name] = val

    // allow you to work with cookies as objects.
    if (typeof val === 'object') {
      _rawCookie[name] = JSON.stringify(val)
    }

    // Cookies only work in the browser
    if (typeof document !== 'undefined') {
      document.cookie = cookie.serialize(name, _rawCookie[name], opt)
    }

    if (_isResWritable() && _res.cookie) {
      _res.cookie(name, val, opt)
    }
  }

  function remove(name, opt) {
    delete _rawCookie[name]

    if (typeof opt === 'undefined') {
      opt = {}
    } else if (typeof opt === 'string') {
      // Will be deprecated in future versions
      opt = { path: opt }
    } else {
      // Prevent mutation of opt below
      opt = Object.assign({}, opt)
    }

    if (typeof document !== 'undefined') {
      opt.expires = new Date(1970, 1, 1, 0, 0, 1)
      document.cookie = cookie.serialize(name, '', opt)
    }

    if (_isResWritable() && _res.clearCookie) {
      _res.clearCookie(name, opt)
    }
  }

  function setRawCookie(rawCookie) {
    if (rawCookie) {
      _rawCookie = cookie.parse(rawCookie)
    } else {
      _rawCookie = {}
    }
  }

  function plugToRequest(req, res) {
    if (req.cookie) {
      _rawCookie = req.cookie
    } else if (req.cookies) {
      _rawCookie = req.cookies
    } else if (req.headers && req.headers.cookie) {
      setRawCookie(req.headers.cookie)
    } else {
      _rawCookie = {}
    }

    _res = res
    return function unplug() {
      _res = null
      _rawCookie = {}
    }
  }

  const reactCookie = {
    load,
    select,
    save,
    remove,
    setRawCookie,
    plugToRequest,
    initTime: Date.now()
  }

  if (typeof window !== 'undefined') {
    window['reactCookie'] = reactCookie
  }
  return reactCookie
}

export default init
