import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import styles from './App.styl'

@asyncConnect([{
  promise: ({ helpers: { cookie } }) => {
    return Promise.resolve()
  }
}])
@connect()
@pureRender
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    return this.props.children
  }
}

export default App
