import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import { Button } from 'react-bootstrap'
import styles from './App.styl'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Button bsStyle='primary' bsSize='large'>Default</Button>
      </div>
    )
  }
}
