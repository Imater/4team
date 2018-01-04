import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Split from 'components/Split'
import Iframe from 'components/Iframe'
import styles from './App.styl'

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Split
          left={<div>Left</div>}
          right={<Iframe url='http://jira.relef.ru/browse/CSSSR-718' />}
        />
      </div>
    )
  }
}
