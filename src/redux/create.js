import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { install } from 'redux-loop'

export default function createStore(history, helpers, data) {
  const reduxRouterMiddleware = routerMiddleware(history)

  let finalCreateStore
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools') // eslint-disable-line global-require
    const DevTools = require('../containers/DevTools/DevTools') // eslint-disable-line global-require

    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware)
    )(_createStore)
  }

  const reducer = require('./modules/reducer') // eslint-disable-line global-require
  const store = finalCreateStore(reducer, data)

  return store
}
