import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'
import { routerMiddleware } from 'react-router-redux'
import { install } from 'redux-loop'

export default function createStore(history, helpers, data) {
  const reduxRouterMiddleware = routerMiddleware(history)

  let finalCreateStore
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware),
      devToolsEnhancer()
    )(_createStore)
  } else {
    finalCreateStore = compose(
      install(),
      applyMiddleware(reduxRouterMiddleware)
    )(_createStore)
  }

  const reducer = require('./modules/reducer') // eslint-disable-line global-require
  const store = finalCreateStore(reducer, data)

  // if (__DEVELOPMENT__ && module.hot) {
  //   module.hot.accept('./modules/reducer', () => {
  //     store.replaceReducer(require('./modules/reducer')) // eslint-disable-line global-require
  //   })
  // }

  return store
}
