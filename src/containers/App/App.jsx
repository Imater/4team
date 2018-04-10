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
      activeTask,
      taskTime,
      items
    }
  }) => ({
    isAuthorized,
    activeTask,
    taskTime,
    taskItems: items
  })
)
@pureRender
export default class App extends Component {
  static propTypes = {
    isAuthorized: pt.bool,
    activeTask: pt.string,
    taskTime: pt.string,
    taskItems: pt.array
  }

  static defaultProps = {
    taskItems: []
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

  renderIframe = (totalTime, url) => (
    <div className={styles.iframe}>
      <Iframe
        totalTime={totalTime}
        url={url}
        taskItems={this.props.taskItems}
      />
    </div>
  )

  renderBlank = () => (
    <div className={styles.taskBlank}>
      <Text size={16}>
        Задача не выбрана
      </Text>
    </div>
  )

  renderRightPanel = () => {
    const { activeTask, taskTime } = this.props
    const project = activeTask && activeTask.split('-')[0]
    const prefix = config.task.prefix[project]
    const url = activeTask && prefix ? `${prefix}${activeTask}` : ''
    const totalTime = taskTime ? `${activeTask} = ${taskTime}` : ''

    return url ? this.renderIframe(totalTime, url) : this.renderBlank()
  }

  render() {
    const { isAuthorized } = this.props

    return (
      <div className={styles.app}>
        {!isAuthorized ?
          <div className={styles.auth}>
            <Auth />
          </div> :
          <Split
            left={this.renderLeftPanel()}
            right={this.renderRightPanel()}
          />}
      </div>
    )
  }
}
