/**
 * ENTRY POINT FOR THE CLIENT
 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import createStore from 'redux/create'
import { Provider } from 'react-redux'
import R from 'ramda'
import { Router, browserHistory, applyRouterMiddleware, match } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-async-connect'
import { useScroll } from 'react-router-scroll'
import cookie from 'react-cookie'
import Perf from 'react-addons-perf'
import { Provider as ProviderTunnel } from 'react-tunnel'
import Split from 'split.js'
import getRoutes from './routes'

window.Perf = Perf
window.Split = Split

const dest = document.getElementById('content')
const store = createStore(browserHistory, { cookie }, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

const filterFunction = item => !item.deferred

const component = renderProps => () => (
  <Router
    {...renderProps}
    render={applyRouterMiddleware(
      useScroll((prevRouterProps, currentRouterProps) => {
        const pathname = R.compose(
          R.replace(/\/$/, ''),
          R.pathOr('', ['location', 'pathname'])
        )

        return pathname(prevRouterProps) !== pathname(currentRouterProps)
      }),
      {
        renderRouterContext: (prevRouterProps, currentRouterProps) =>
          <ReduxAsyncConnect helpers={{ cookie }} {...currentRouterProps} filter={filterFunction} />
      },
    )}
    history={history}
    key={Date.now()}
  />
)

const renderApp = renderProps => render(
  <AppContainer warnings={false}>
    <Provider store={store} key='provider'>
      <ProviderTunnel provide={{ helpers: { cookie } }}>
        {component(renderProps)}
      </ProviderTunnel>
    </Provider>
  </AppContainer>,
  dest
)

match({ history, routes: getRoutes(store) }, (error, redirectLocation, renderProps) => renderApp(renderProps))

// const renderByRoutes = routes => match({ history, routes }, (error, redirectLocation, renderProps) => {
//   render((
//     <AppContainer>
//       <Provider store={store} key='provider'>
//         <ProviderTunnel provide={{ helpers: { cookie } }}>
//           {() => component({ ...renderProps, routes })}
//         </ProviderTunnel>
//       </Provider>
//     </AppContainer>
//   ), dest)
//
// })
// renderByRoutes(getRoutes(store))

if (module.hot) {
  module.hot.accept('./routes', () => {
    const getRoutesNext = require('./routes') // eslint-disable-line global-require
    renderApp({ routes: getRoutesNext(store) })
  })
}

if (process.env.NODE_ENV !== 'production') {
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.') // eslint-disable-line no-console
  }

  // componentDidUpdate(prevProps) {
  //   console.log(`render_${this.props.id}`);
  //   R.forEachObjIndexed((prop, name) => {
  //     if (prop !== prevProps[name]) {
  //       console.log(name, prop, prevProps[name]);
  //     }
  //   }, this.props);
  //   console.log(`renderEnd_${this.props.id}`);
  // }
}
