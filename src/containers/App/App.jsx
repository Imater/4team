import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
class App extends Component {
  propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App
