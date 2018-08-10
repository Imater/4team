import App from './containers/App'
import User from './containers/User'

// export default routes
export default () => ({
  path: '/',
  component: App,
  childRoutes: [
    {
      path: '/users/:id',
      component: User
    }
  ]
})
