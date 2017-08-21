import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import App from './containers/App'
import PageHome from './containers/PageHome'

// const routes = () => ({
//   path: '/',
//   component: App,
//   indexRoute: {
//     getComponent: (loc, cb) => require.ensure([], require =>
//       cb(null, require('./containers/PageHome')), 'PageHome')
//   },
//   getChildRoutes: (locationApp, cbApp) => cbApp(null, [
//     {
//       path: 'repair',
//       getComponent: (loc, cb) => require.ensure([], require =>
//         cb(null, require('./containers/Repair')), 'PageRepair')
//     }, {
//       path: '*',
//       status: 404,
//       getComponent: (loc, cb) => require.ensure([], require =>
//         cb(null, require('./containers/PageNotFound')), 'PageNotFound')
//     }
//   ])
// })

// export default routes
export default (
  <Switch>
    <Route exact path='/' component={PageHome} />
  </Switch>
)
