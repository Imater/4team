import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { PageCatalogContainer } from './containers/PageCatalog/index'
import PageNotFound from './containers/PageNotFound'

// export default routes
export default () => (
  <Switch>
    <Route exact path='/' component={PageCatalogContainer} />
    <Route path='*' component={PageNotFound} />
  </Switch>
)
