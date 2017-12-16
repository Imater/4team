import App from './containers/App'

// export default routes
export default () => ({
  path: '/',
  component: App,
  indexRoute: {
    getComponent: (loc, cb) => require.ensure([], require =>
      cb(null, require('./containers/PageCatalog')), 'PageCatalog')
  },
  getChildRoutes: (locationApp, cbApp) => cbApp(null, [
    {
      path: 'tree',
      getComponent: (loc, cb) => require.ensure([], require =>
        cb(null, require('./containers/PageTree')), 'PageTree')
    }
  ])
})

