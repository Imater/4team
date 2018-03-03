import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { fetch as fetchUserData } from 'redux/modules/userData'
import config from 'config'

import Auth from 'containers/Auth'
import Split from 'components/Split'
import Iframe from 'components/Iframe'
import LeftPanel from 'components/LeftPanel'
import UserPanel from 'containers/UserPanel'
import User from 'containers/User'
import Text from 'components/Text'

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
    },
    tasks: {
      activeTask
    }
  }) => ({
    isAuthorized,
    activeTask
  })
)
@pureRender
export default class App extends Component {
  static propTypes = {
    isAuthorized: pt.bool,
    activeTask: pt.string
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.replace('/')
    }
  }

  renderLeftPanel() {
    return (
      <LeftPanel>
        <UserPanel />

        <User />
      </LeftPanel>
    )
  }

  renderRightPanel = () => {
    const { activeTask } = this.props
    const component = activeTask ?
      <Iframe url={`${config.task.prefix}${activeTask}`} /> :
      (
        <div className={styles.taskBlank}>
          <Text size={16}>
            Задача не выбрана
          </Text>
        </div>
      )

    return component
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
            right={this.renderRightPanel()}
          />}
      </div>
    )
  }
}
