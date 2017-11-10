import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
class PageTree extends Component {
  propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div>
        {this.props.children}
        panels will be here
      </div>
    )
  }
}

export default PageTree
