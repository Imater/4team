import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import AdaptiveHeader from 'components/molecules/AdaptiveHeader/AdaptiveHeader'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
class PageTree extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div>
        <AdaptiveHeader />
        panels will be here
        {this.props.children}
      </div>
    )
  }
}

export default PageTree
