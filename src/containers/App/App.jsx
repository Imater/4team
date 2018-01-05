import React, { Component } from 'react'
import pureRender from 'pure-render-decorator'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-async-connect'
import Split from 'components/Split'
import Iframe from 'components/Iframe'
import LeftPanel from 'components/LeftPanel'
import UserPanel from 'components/UserPanel'
import styles from './App.styl'

const users = [
  {
    name: 'Все'
  }, {
    name: 'Женя'
  }, {
    name: 'Олег'
  }, {
    name: 'Арарат'
  }, {
    name: 'Рустам'
  }, {
    name: 'Денис'
  }, {
    name: 'Андрей'
  }
]

@asyncConnect([{ promise: () => Promise.resolve() }])
@connect()
@pureRender
export default class App extends Component {
  renderLeftPanel() {
    return (
      <LeftPanel>
        <UserPanel users={users} />
      </LeftPanel>
    )
  }

  render() {
    return (
      <div className={styles.app}>
        <Split
          left={this.renderLeftPanel()}
          right={<Iframe url='http://jira.relef.ru/browse/CSSSR-718' />}
        />
      </div>
    )
  }
}
