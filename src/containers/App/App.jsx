import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import styles from './App.styl'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
export default class App extends Component {
  static propTypes = {
    children: pt.any
  }

  render() {
    const { children } = this.props

    return (
      <div className={styles.app}>
        {children}
      </div>
    )
  }
}
