import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import styles from './App.styl'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }
}

export default App
