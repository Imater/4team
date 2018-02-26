import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { fetch as fetchUserData } from 'redux/modules/userData'

import Auth from 'containers/Auth'
import Split from 'components/Split'
import Iframe from 'components/Iframe'
import LeftPanel from 'components/LeftPanel'
import UserPanel from 'containers/UserPanel'
import User from 'containers/User'

import styles from './App.styl'

@asyncConnect([{
  promise: ({ store }) => {
    const token = Cookies.get('token')

    store.dispatch(fetchUserData(token))
  }
}])
@connect(
  ({
    auth: {
      isAuthorized
    }
  }) => ({
    isAuthorized
  })
)
@pureRender
export default class App extends Component {
  static propTypes = {
    isAuthorized: pt.bool
  }

  renderLeftPanel() {
    return (
      <LeftPanel>
        <UserPanel />

        <User />
      </LeftPanel>
    )
  }

  render() {
    const { isAuthorized } = this.props

    return (
      <div className={styles.app}>
        {!isAuthorized &&
          <div className={styles.auth}>
            <Auth />
          </div>}

        {isAuthorized &&
          <Split
            left={this.renderLeftPanel()}
            right={<Iframe url='http://jira.relef.ru/browse/CSSSR-718' />}
          />}
      </div>
    )
  }
}
