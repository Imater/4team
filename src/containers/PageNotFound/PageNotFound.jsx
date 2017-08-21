import React from 'react'

import Helmet from 'react-helmet'

import NotFound from 'components/NotFound'

export default function PageNotFound() {
  return (
    <div>
      <Helmet title='Страница не найдена' />
      <NotFound />
    </div>
  )
}
