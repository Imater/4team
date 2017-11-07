import App from './containers/App'

// export default routes
export default () => ({
  path: '/',
  component: App,
  indexRoute: {
    getComponent: (loc, cb) => require.ensure([], require =>
      cb(null, require('./containers/PageCatalog')), 'PageCatalog')
  }
})

