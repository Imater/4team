import React, { Component } from 'react'
import Helmet from 'react-helmet'
import NotFound from 'components/NotFound'
import pureRender from 'pure-render-decorator'

@pureRender
export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <Helmet title='Страница не найдена' />
        <NotFound />
      </div>
    )
  }
}
